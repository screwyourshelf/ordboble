<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import GlowOrb from '../ui/GlowOrb.svelte'
  import WordCluster from '../word-cloud/WordCluster.svelte'
  import FloatingParticle from '../word-cloud/FloatingParticle.svelte'
  import PresentationChrome from './PresentationChrome.svelte'
  import PresentationJoinCard from './PresentationJoinCard.svelte'
  import HostControls from './HostControls.svelte'
  import Badge from '../ui/Badge.svelte'
  import { mockSession as session } from '../../mocks/session'
  import { subscribeToCloudEvents } from '../../services/realtime'
  import { getCloud } from '../../services/cloud-api'
  import { getWords } from '../../services/word-api'
  import { getTheme } from '../../design/themes'
  import type { WordEntry } from '../../types/word-cloud'
  import type { ThemeId } from '../../types/theme'
  import type { ShapeId } from '../../types/shape'
  import env from '../../config/env'

  interface Props {
    sessionId?: string
  }

  let { sessionId }: Props = $props()

  // Priority: route session id → env override → mock fallback
  const cloudId = sessionId || env.cloudId || session.id

  // Cloud metadata — updated from API when available
  let cloudTitle = $state(session.title)
  let cloudPrompt = $state(session.prompt)
  let cloudJoinCode = $state(session.joinCode)
  let cloudJoinUrl = $state(session.joinUrl)

  // UI state
  let loadingSession = $state(!!env.apiBaseUrl)
  let notFound = $state(false)
  let reconnecting = $state(false)

  // ── Theme / shape (loaded from API, with prototype fallback) ────────────────
  let cloudThemeId = $state<ThemeId>('playful')
  let cloudShapeId = $state<ShapeId>('freeform')

  const activeTheme = $derived(getTheme(cloudThemeId))

  // ── Host control state ──────────────────────────────────────────────────────
  let isFullscreen = $state(false)
  let chromeVisible = $state(true)
  let frozen = $state(false)
  let paused = $state(false)
  let wordQueue: WordEntry[] = $state([])
  let canFullscreen = $state(false)

  let liveWords: WordEntry[] = $state([])

  // Colours cycled for incoming live words
  const liveColors = ['accent', 'warm', 'success', 'primary', 'soft'] as const

  // Size ladder: first words are larger (visual hierarchy), settling to md/sm
  const sizeLadder = ['lg', 'lg', 'lg', 'md', 'md', 'md', 'md', 'md', 'sm', 'sm'] as const

  // Subtle rotations for organic feel — alternating positive/negative
  const rotations = [0, -8, 6, -4, 10, -6, 3, -10, 7, -3, 5, -7, 4, -5, 8] as const

  let colorIndex = 0

  function wordEntryFromApi(id: string, word: string): WordEntry {
    const color = liveColors[colorIndex % liveColors.length]
    const idx = colorIndex
    colorIndex++

    // Size: first 3 → lg, next 5 → md, rest → sm cycling
    const size = sizeLadder[Math.min(idx, sizeLadder.length - 1)]

    // Rotation: subtle variation, cycling through preset list
    const rotation = rotations[idx % rotations.length]

    // Depth: alternate between 1 and 2 for layering, first word always foreground
    const depth: 1 | 2 | 3 = idx === 0 ? 1 : idx % 4 === 0 ? 2 : idx % 7 === 0 ? 3 : 1

    // Entry stagger: cap at 0.12s so no word waits too long
    const delay = Math.min(idx * 0.015, 0.12)

    let x: number, y: number

    if (cloudShapeId === 'circle') {
      // Words arranged along an ellipse, growing outward in rings
      const ringSize = 8
      const ring = Math.floor(idx / ringSize)
      const posInRing = idx % ringSize
      const rx = 28 + ring * 11
      const ry = 20 + ring * 7
      const angle = (2 * Math.PI * posInRing) / ringSize - Math.PI / 2
      x = Math.max(8, Math.min(88, 50 + rx * Math.cos(angle) + (Math.random() * 5 - 2.5)))
      y = Math.max(8, Math.min(82, 50 + ry * Math.sin(angle) + (Math.random() * 5 - 2.5)))
    } else {
      // Freeform: expanded 5×4 grid so first 20 words don't cluster
      const cols = 5
      const rows = 4
      const slot = idx % (cols * rows)
      const col = slot % cols
      const row = Math.floor(slot / cols)
      // Cells span 14–86% horizontally, 10–80% vertically
      const cellW = (86 - 14) / cols
      const cellH = (80 - 10) / rows
      x = Math.max(5, Math.min(90, 14 + col * cellW + cellW / 2 + (Math.random() * cellW * 0.5 - cellW * 0.25)))
      y = Math.max(5, Math.min(85, 10 + row * cellH + cellH / 2 + (Math.random() * cellH * 0.5 - cellH * 0.25)))
    }

    return { id, word, size, variant: 'solid', color, depth, x, y, rotation, delay }
  }

  // ── Host control actions ────────────────────────────────────────────────────

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch {
      // Fullscreen denied or unsupported — ignore
    }
  }

  function onFullscreenChange() {
    isFullscreen = !!document.fullscreenElement
  }

  function togglePause() {
    if (paused) {
      paused = false
      if (wordQueue.length > 0) {
        liveWords = [...liveWords, ...wordQueue]
        wordQueue = []
      }
    } else {
      paused = true
    }
  }

  function resetCloud() {
    liveWords = []
    wordQueue = []
    colorIndex = 0
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
    if (e.metaKey || e.ctrlKey || e.altKey) return
    switch (e.key.toLowerCase()) {
      case 'f': toggleFullscreen(); break
      case 'c': chromeVisible = !chromeVisible; break
      case 'p': togglePause(); break
      case 'r': resetCloud(); break
    }
  }

  // ── Realtime ────────────────────────────────────────────────────────────────

  let unsubscribeSSE: (() => void) = () => {}

  onMount(async () => {
    canFullscreen = !!document.fullscreenEnabled
    document.addEventListener('fullscreenchange', onFullscreenChange)
    window.addEventListener('keydown', handleKeydown)

    if (!env.apiBaseUrl) {
      loadingSession = false
      return
    }

    // Load cloud metadata
    const cloudResult = await getCloud(cloudId)
    if (!cloudResult.ok) {
      if (cloudResult.notFound && sessionId) notFound = true
      loadingSession = false
      return
    }

    cloudTitle = cloudResult.data.title
    cloudPrompt = cloudResult.data.prompt ?? cloudResult.data.title
    cloudJoinCode = cloudResult.data.joinCode
    cloudJoinUrl = `${window.location.origin}/join/${cloudId}`
    cloudThemeId = (cloudResult.data.themeId as ThemeId) ?? 'playful'
    cloudShapeId = (cloudResult.data.shapeId as ShapeId) ?? 'freeform'

    // Load existing words
    const wordsResult = await getWords(cloudId)
    if (wordsResult.ok && wordsResult.data.length > 0) {
      liveWords = wordsResult.data.map((w) => wordEntryFromApi(w.id, w.word))
    }

    loadingSession = false

    // Start SSE only after confirming cloud exists
    unsubscribeSSE = subscribeToCloudEvents(cloudId, {
      onWordAdded(payload) {
        const entry = wordEntryFromApi(payload.id, payload.word)
        if (paused) {
          wordQueue = [...wordQueue, entry]
        } else {
          liveWords = [...liveWords, entry]
        }
      },
      onConnected() {
        reconnecting = false
      },
      onReconnecting() {
        reconnecting = true
      },
    })
  })

  onDestroy(() => {
    unsubscribeSSE()
    document.removeEventListener('fullscreenchange', onFullscreenChange)
    window.removeEventListener('keydown', handleKeydown)
  })
</script>

<!--
  Presentation Mode Screen
  Full-viewport, dark, cinematic — for projector / large screen display.
-->
<div
  class="relative min-h-screen w-full overflow-hidden"
  style="background: {activeTheme.previewBg}"
>

  <!-- ── Atmospheric glow layer ── -->
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <!-- Primary glow — top center, calm is subtler -->
    <div class="absolute -top-32 left-1/2 -translate-x-1/2 {cloudThemeId === 'calm' ? 'opacity-35' : 'opacity-60'}">
      <GlowOrb size="lg" color={activeTheme.glowColor} />
    </div>
    <!-- Accent — bottom left (heavily reduced for calm) -->
    <div class="absolute bottom-[-6rem] left-[8%] {cloudThemeId === 'calm' ? 'opacity-10' : 'opacity-45'}">
      <GlowOrb size="lg" color="accent" />
    </div>
    <!-- Warm orange — right (hidden for calm, reduced for dark) -->
    {#if cloudThemeId !== 'calm'}
    <div class="absolute top-[30%] right-[-4rem] {cloudThemeId === 'dark' ? 'opacity-20' : 'opacity-35'}">
      <GlowOrb size="md" color="warm" />
    </div>
    {/if}
    <!-- Extra depth — bottom right -->
    <div class="absolute bottom-0 right-[10%] {cloudThemeId === 'calm' ? 'opacity-15' : 'opacity-25'}">
      <GlowOrb size="md" color={activeTheme.glowColor} />
    </div>
    <!-- Radial depth behind cloud center -->
    <div
      class="absolute inset-0"
      style="background: {cloudThemeId === 'calm'
        ? 'radial-gradient(ellipse 55% 50% at 50% 50%, rgba(59,130,246,0.09) 0%, transparent 65%)'
        : cloudThemeId === 'dark'
          ? 'radial-gradient(ellipse 55% 50% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 65%)'
          : 'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(124,60,255,0.14) 0%, transparent 65%)'}"
    ></div>
  </div>

  <!-- ── Host controls — always visible ── -->
  <HostControls
    {isFullscreen}
    {chromeVisible}
    {frozen}
    {paused}
    queuedCount={wordQueue.length}
    {canFullscreen}
    onFullscreenToggle={toggleFullscreen}
    onChromeToggle={() => (chromeVisible = !chromeVisible)}
    onFreezeToggle={() => (frozen = !frozen)}
    onPauseToggle={togglePause}
    onReset={resetCloud}
  />

  <!-- ── Top chrome ── -->
  {#if chromeVisible}
  <PresentationChrome
    title={cloudTitle}
    prompt={cloudPrompt}
    participantCount={session.participantCount}
  />
  {/if}

  <!-- ── Loading overlay ── -->
  {#if loadingSession}
    <div class="absolute inset-0 z-50 flex items-center justify-center">
      <div class="flex flex-col items-center gap-3">
        <div class="flex gap-2" aria-label="Laster…">
          <span class="w-2.5 h-2.5 rounded-full bg-accent" style="animation: fade-in 0.7s ease infinite alternate;"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-primary" style="animation: fade-in 0.7s ease infinite alternate; animation-delay: 0.25s;"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-warm" style="animation: fade-in 0.7s ease infinite alternate; animation-delay: 0.5s;"></span>
        </div>
        <p class="text-sm text-muted">Laster økt…</p>
      </div>
    </div>
  {/if}

  <!-- ── Not-found overlay ── -->
  {#if notFound}
    <div class="absolute inset-0 z-50 flex items-center justify-center" style="animation: fade-in 0.4s ease forwards;">
      <div class="flex flex-col items-center gap-4 text-center px-8">
        <div class="text-5xl select-none" aria-hidden="true">🔍</div>
        <h1 class="text-2xl font-bold text-text">Økt ikke funnet</h1>
        <p class="text-muted text-base">Lenken er ugyldig eller økten er avsluttet.</p>
        <a href="/" class="mt-2 px-6 py-3 rounded-pill font-bold text-sm text-muted bg-white/6 border border-border hover:bg-white/10 hover:text-text transition-soft">
          ← Tilbake til forsiden
        </a>
      </div>
    </div>
  {/if}

  <!-- ── Reconnecting indicator ── -->
  {#if reconnecting}
    <div class="absolute top-24 left-1/2 -translate-x-1/2 z-50" style="animation: fade-in 0.3s ease forwards;">
      <Badge variant="neutral">Kobler til igjen…</Badge>
    </div>
  {/if}

  <!-- ── Paused indicator ── -->
  {#if paused}
    <div class="absolute top-24 left-1/2 -translate-x-1/2 z-50" style="animation: fade-in 0.3s ease forwards;">
      <Badge variant="neutral">
        ⏸ {wordQueue.length > 0 ? `${wordQueue.length} ord i kø` : 'Pauset'}
      </Badge>
    </div>
  {/if}

  <!-- ── Word cloud — center stage ── -->
  <div
    class="absolute inset-0"
    style="top: {chromeVisible ? '6%' : '2%'}; bottom: {chromeVisible ? '20%' : '2%'};"
    aria-label="Ordsky"
  >
    <WordCluster
      words={liveWords}
      {frozen}
      themeId={cloudThemeId}
      class="absolute inset-0"
    />

    <!-- Empty state: intentional waiting screen -->
    {#if liveWords.length === 0 && !loadingSession && !notFound}
      <div class="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none" style="animation: fade-in 0.8s ease forwards;">
        <!-- Pulsing halo ring -->
        <div
          class="absolute w-48 h-48 rounded-full border border-white/8 pulse-ring"
          aria-hidden="true"
        ></div>
        <div
          class="absolute w-72 h-72 rounded-full border border-white/4 pulse-ring"
          style="animation-delay: 0.6s"
          aria-hidden="true"
        ></div>
        <p
          class="relative text-2xl font-semibold text-text-soft tracking-wide"
          style="animation: {cloudThemeId === 'calm' ? 'float-gentle' : 'float-subtle'} {cloudThemeId === 'calm' ? '6s' : '4s'} ease-in-out infinite;"
        >Venter på de første ordene…</p>
        <p class="relative text-sm text-muted opacity-70 tracking-wide">Del lenken eller QR-koden nedenfor</p>
      </div>
    {/if}

    <!-- Floating ambient particles — theme-aware count and intensity -->
    {#if cloudThemeId === 'calm'}
      <!-- Calm: 4 particles, slower, softer -->
      <FloatingParticle color="primary" size="sm" x={10} y={15} delay={0}   duration={10.0} />
      <FloatingParticle color="primary" size="sm" x={88} y={12} delay={2.5} duration={12.0} />
      <FloatingParticle color="primary" size="sm" x={8}  y={78} delay={1.2} duration={11.0} />
      <FloatingParticle color="primary" size="sm" x={90} y={75} delay={3.5} duration={10.5} />
    {:else}
      <!-- Playful/default: full particle set -->
      <FloatingParticle color="accent"  size="lg" x={6}  y={14} delay={0}    duration={5.0} />
      <FloatingParticle color="primary" size="md" x={92} y={8}  delay={1.2}  duration={6.1} />
      <FloatingParticle color="warm"    size="md" x={88} y={72} delay={0.6}  duration={4.8} />
      <FloatingParticle color="success" size="sm" x={4}  y={80} delay={2.0}  duration={5.4} />
      <FloatingParticle color="accent"  size="sm" x={55} y={4}  delay={0.9}  duration={4.3} />
      <FloatingParticle color="primary" size="sm" x={18} y={92} delay={1.5}  duration={5.9} />
      <FloatingParticle color="warm"    size="lg" x={76} y={90} delay={3.0}  duration={4.6} />
      <FloatingParticle color="success" size="sm" x={3}  y={42} delay={0.3}  duration={6.5} />
      <FloatingParticle color="accent"  size="md" x={96} y={48} delay={1.8}  duration={5.2} />
      <FloatingParticle color="primary" size="sm" x={44} y={96} delay={2.4}  duration={4.1} />
    {/if}
  </div>

  <!-- ── Bottom chrome ── -->
  {#if chromeVisible}
  <div
    class="absolute bottom-0 left-0 right-0 z-50 pointer-events-none"
    style="background: linear-gradient(to top, rgba(7,8,22,0.90) 0%, transparent 100%)"
  >
    <div class="flex items-end justify-between gap-6 px-8 py-6">

      <!-- Left: wordmark + status -->
      <div class="flex flex-col gap-1 pointer-events-auto">
        <span
          class="text-xs font-bold uppercase tracking-widest text-muted"
        >Presentasjonsmodus</span>
        <span
          class="text-base font-black tracking-tight"
          style="background: var(--gradient-logo); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"
        >ordboble</span>
      </div>

      <!-- Right: join card -->
      <div class="pointer-events-auto shrink-0">
        <PresentationJoinCard
          joinCode={cloudJoinCode}
          joinUrl={cloudJoinUrl}
        />
      </div>

    </div>
  </div>
  {/if}

</div>
