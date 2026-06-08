<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import GlowOrb from '../ui/GlowOrb.svelte'
  import WordCluster from '../word-cloud/WordCluster.svelte'
  import FloatingParticle from '../word-cloud/FloatingParticle.svelte'
  import PresentationChrome from './PresentationChrome.svelte'
  import PresentationJoinCard from './PresentationJoinCard.svelte'
  import Badge from '../ui/Badge.svelte'
  import { mockSession as session } from '../../mocks/session'
  import { subscribeToCloudEvents } from '../../services/realtime'
  import { getCloud } from '../../services/cloud-api'
  import { getWords } from '../../services/word-api'
  import type { WordEntry } from '../../types/word-cloud'
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

  let liveWords: WordEntry[] = $state([])

  // Colours cycled for incoming live words
  const liveColors = ['accent', 'warm', 'success', 'primary', 'soft'] as const
  let colorIndex = 0

  // Spread words across a 3×3 grid with jitter to avoid clustering
  function wordEntryFromApi(id: string, word: string): WordEntry {
    const color = liveColors[colorIndex % liveColors.length]
    const slot = colorIndex % 9
    const gridX = (slot % 3) * 28 + 12 + (Math.random() * 18 - 9)
    const gridY = Math.floor(slot / 3) * 28 + 12 + (Math.random() * 18 - 9)
    colorIndex++
    return {
      id,
      word,
      size: 'md',
      variant: 'solid',
      color,
      depth: 1,
      x: Math.max(5, Math.min(88, gridX)),
      y: Math.max(5, Math.min(82, gridY)),
      delay: 0,
    }
  }

  let unsubscribeSSE: (() => void) = () => {}

  onMount(async () => {
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

    // Load existing words
    const wordsResult = await getWords(cloudId)
    if (wordsResult.ok && wordsResult.data.length > 0) {
      liveWords = wordsResult.data.map((w) => wordEntryFromApi(w.id, w.word))
    }

    loadingSession = false

    // Start SSE only after confirming cloud exists
    unsubscribeSSE = subscribeToCloudEvents(cloudId, {
      onWordAdded(payload) {
        liveWords = [...liveWords, wordEntryFromApi(payload.id, payload.word)]
      },
      onConnected() {
        reconnecting = false
      },
      onReconnecting() {
        reconnecting = true
      },
    })
  })

  onDestroy(() => unsubscribeSSE())
</script>

<!--
  Presentation Mode Screen
  Full-viewport, dark, cinematic — for projector / large screen display.
-->
<div
  class="relative min-h-screen w-full overflow-hidden"
  style="background: radial-gradient(ellipse 110% 90% at 50% 55%, rgba(124,60,255,0.18) 0%, rgba(255,79,163,0.10) 40%, #070816 75%)"
>

  <!-- ── Atmospheric glow layer ── -->
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <!-- Deep purple — top center -->
    <div class="absolute -top-32 left-1/2 -translate-x-1/2 opacity-60">
      <GlowOrb size="lg" color="primary" />
    </div>
    <!-- Accent pink — bottom left -->
    <div class="absolute bottom-[-6rem] left-[8%] opacity-50">
      <GlowOrb size="lg" color="accent" />
    </div>
    <!-- Warm orange — right -->
    <div class="absolute top-[30%] right-[-4rem] opacity-40">
      <GlowOrb size="md" color="warm" />
    </div>
    <!-- Extra depth — bottom right -->
    <div class="absolute bottom-0 right-[10%] opacity-30">
      <GlowOrb size="md" color="primary" />
    </div>
    <!-- Radial depth behind cloud center -->
    <div
      class="absolute inset-0"
      style="background: radial-gradient(ellipse 60% 55% at 50% 50%, rgba(124,60,255,0.14) 0%, transparent 65%)"
    ></div>
  </div>

  <!-- ── Top chrome ── -->
  <PresentationChrome
    title={cloudTitle}
    prompt={cloudPrompt}
    participantCount={session.participantCount}
  />

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

  <!-- ── Word cloud — center stage ── -->
  <div
    class="absolute inset-0"
    style="top: 5%; bottom: 18%;"
    aria-label="Ordsky"
  >
    <WordCluster
      words={liveWords}
      class="absolute inset-0"
    />

    <!-- Empty state: shown before any words arrive -->
    {#if liveWords.length === 0 && !loadingSession && !notFound}
      <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none" style="animation: fade-in 0.6s ease forwards;">
        <p class="text-text-soft text-xl font-semibold" style="animation: float-subtle 3s ease-in-out infinite;">Venter på de første ordene…</p>
        <p class="text-muted text-sm opacity-60">Del lenken eller QR-koden nedenfor</p>
      </div>
    {/if}

    <!-- Floating ambient particles -->
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
  </div>

  <!-- ── Bottom chrome ── -->
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

</div>
