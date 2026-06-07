<script lang="ts">
  import { onDestroy } from 'svelte'
  import GlowOrb from '../ui/GlowOrb.svelte'
  import WordCluster from '../word-cloud/WordCluster.svelte'
  import FloatingParticle from '../word-cloud/FloatingParticle.svelte'
  import PresentationChrome from './PresentationChrome.svelte'
  import PresentationJoinCard from './PresentationJoinCard.svelte'
  import { presentationComposition } from '../../word-cloud/compositions'
  import { mockSession as session } from '../../mocks/session'
  import { subscribeToCloudEvents } from '../../services/realtime'
  import type { WordEntry } from '../../types/word-cloud'
  import env from '../../config/env'

  const cloudId = env.cloudId || session.id

  // Start with static composition; append live words on top
  let liveWords: WordEntry[] = $state([...presentationComposition.words])

  // Colours cycled for incoming live words
  const liveColors = ['accent', 'warm', 'success', 'primary', 'soft'] as const
  let colorIndex = 0

  const unsubscribe = env.apiBaseUrl
    ? subscribeToCloudEvents(cloudId, {
        onWordAdded(payload) {
          const color = liveColors[colorIndex % liveColors.length]
          colorIndex++
          liveWords = [
            ...liveWords,
            {
              word: payload.word,
              size: 'md',
              variant: 'solid',
              color,
              depth: 1,
              x: 10 + Math.random() * 80,
              y: 10 + Math.random() * 80,
              delay: 0,
            },
          ]
        },
      })
    : () => { /* static prototype mode */ }

  onDestroy(unsubscribe)
</script>

<!--
  Presentation Mode Screen
  Full-viewport, dark, cinematic — for projector / large screen display.
  Frontend-only, fake static data.
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
    title={session.title}
    prompt={session.prompt}
    participantCount={session.participantCount}
  />

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
          joinCode={session.joinCode}
          joinUrl={session.joinUrl}
        />
      </div>

    </div>
  </div>

</div>
