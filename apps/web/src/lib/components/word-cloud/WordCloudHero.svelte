<script lang="ts">
  import GlowOrb from '../ui/GlowOrb.svelte'
  import GradientText from '../ui/GradientText.svelte'
  import Button from '../ui/Button.svelte'
  import WordCluster from './WordCluster.svelte'
  import FloatingParticle from './FloatingParticle.svelte'
  import CreateSessionCard from '../create/CreateSessionCard.svelte'
  import { heroComposition } from '../../word-cloud/compositions'

  let showCreate = $state(false)

  function openCreate() {
    showCreate = true
  }
</script>

<section class="relative min-h-svh overflow-hidden flex items-center">

  <!-- ── Atmospheric background ── -->
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <!-- Primary glow — top right -->
    <div class="absolute -top-24 right-[-5%] opacity-45">
      <GlowOrb size="lg" color="primary" />
    </div>
    <!-- Accent glow — bottom left -->
    <div class="absolute -bottom-16 left-[5%] opacity-45">
      <GlowOrb size="md" color="accent" />
    </div>
    <!-- Warm glow — mid right, behind word cloud -->
    <div class="absolute top-[25%] right-[18%] opacity-30">
      <GlowOrb size="md" color="warm" />
    </div>
    <!-- Extra depth — far bottom right -->
    <div class="absolute bottom-[10%] right-[-2%] opacity-35">
      <GlowOrb size="sm" color="accent" />
    </div>
  </div>

  <!-- ── Main content grid ── -->
  <div class="relative z-10 w-full mx-auto max-w-7xl px-5 sm:px-8 lg:px-14">
    <div class="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-8 items-center min-h-svh py-20 lg:py-28">

      <!-- ── Left: Hero copy ── -->
      <div class="flex flex-col gap-7 animate-fade-in">
        <h1
          class="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none"
        >
          <GradientText variant="playful">Ordboble</GradientText>
        </h1>

        <p class="text-2xl sm:text-3xl font-bold text-text leading-tight max-w-xs">
          Del ord.<br />
          <span class="text-text-soft font-medium">Se dem leve.</span>
        </p>

        <p class="text-base text-muted leading-relaxed max-w-sm">
          Del en lenke — se ordene strømme inn og ordskyen ta form i sanntid.
          Ingen app, ingen konto. Bare ord som lever.
        </p>

        <div class="flex flex-wrap gap-3 pt-1">
          {#if !showCreate}
            <Button variant="primary" size="lg" onclick={openCreate}>Start din ordboble</Button>
          {/if}
        </div>

        {#if showCreate}
          <div class="animate-fade-in">
            <CreateSessionCard />
          </div>
        {/if}
      </div>

      <!-- ── Right: Word cloud visual ── -->
      <div
        class="relative h-[440px] sm:h-[520px] lg:h-[620px] lg:w-full animate-fade-in lg:max-w-[700px] lg:ml-auto [mask-image:linear-gradient(to_right,transparent_0%,black_6%)]"
        style="animation-delay: 0.15s"
      >
        <!-- Radial glow backdrop behind the cloud -->
        <div
          class="absolute inset-0 rounded-[2.5rem] pointer-events-none"
          style="background: radial-gradient(ellipse 65% 60% at 54% 50%, rgba(124,60,255,0.10) 0%, transparent 70%)"
          aria-hidden="true"
        ></div>

        <!-- Central glow explosion -->
        <div
          class="absolute pointer-events-none"
          style="left: 50%; top: 48%; transform: translate(-50%, -50%); width: 320px; height: 320px;"
          aria-hidden="true"
        >
          <!-- Outer halo -->
          <div class="absolute inset-0 rounded-full" style="background: radial-gradient(ellipse 80% 80% at 50% 50%, rgba(255,79,163,0.04) 0%, rgba(141,77,255,0.03) 40%, transparent 70%); filter: blur(18px);"></div>
          <!-- Mid ring -->
          <div class="absolute inset-[15%] rounded-full" style="background: radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255,122,47,0.05) 0%, rgba(255,79,163,0.04) 35%, rgba(141,77,255,0.02) 60%, transparent 80%); filter: blur(10px);"></div>
          <!-- Hot core -->
          <div class="absolute inset-[35%] rounded-full" style="background: radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.09) 0%, rgba(255,122,47,0.08) 30%, rgba(255,79,163,0.04) 60%, transparent 85%); filter: blur(4px);"></div>
        </div>

        <!-- The word cluster -->
        <WordCluster words={heroComposition.words} class="absolute inset-0" />

        <!-- Floating ambient particles -->
        <FloatingParticle color="accent"   size="md" x={12} y={18} delay={0}    duration={4.2} />
        <FloatingParticle color="warm"     size="sm" x={87} y={12} delay={1.3}  duration={5.1} />
        <FloatingParticle color="primary"  size="md" x={92} y={68} delay={0.7}  duration={5.8} />
        <FloatingParticle color="success"  size="sm" x={4}  y={82} delay={2.1}  duration={4.6} />
        <FloatingParticle color="accent"   size="sm" x={68} y={90} delay={0.4}  duration={5.4} />
        <FloatingParticle color="warm"     size="md" x={28} y={94} delay={1.6}  duration={4.0} />
        <FloatingParticle color="primary"  size="sm" x={50} y={4}  delay={0.9}  duration={6.2} />
        <FloatingParticle color="success"  size="sm" x={3}  y={44} delay={3.0}  duration={4.8} />
        <FloatingParticle color="accent"   size="lg" x={78} y={88} delay={1.8}  duration={5.0} />
      </div>

    </div>
  </div>

</section>
