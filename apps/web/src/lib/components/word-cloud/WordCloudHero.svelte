<script lang="ts">
  import GlowOrb from '../ui/GlowOrb.svelte'
  import GradientText from '../ui/GradientText.svelte'
  import Button from '../ui/Button.svelte'
  import Badge from '../ui/Badge.svelte'
  import WordCluster from './WordCluster.svelte'
  import FloatingParticle from './FloatingParticle.svelte'
  import { heroComposition } from '../../word-cloud/compositions'
</script>

<section class="relative min-h-svh overflow-hidden flex items-center">

  <!-- ── Atmospheric background ── -->
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <!-- Primary glow — top right -->
    <div class="absolute -top-24 right-[-5%] opacity-80">
      <GlowOrb size="lg" color="primary" />
    </div>
    <!-- Accent glow — bottom left -->
    <div class="absolute -bottom-16 left-[5%] opacity-70">
      <GlowOrb size="md" color="accent" />
    </div>
    <!-- Warm glow — mid center, behind word cloud -->
    <div class="absolute top-[25%] right-[28%] opacity-50">
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
        <div class="flex items-center gap-2">
          <Badge variant="accent">✨ Live</Badge>
          <Badge variant="success">● Beta</Badge>
        </div>

        <h1 class="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none">
          <GradientText variant="playful">Ordboble</GradientText>
        </h1>

        <p class="text-2xl sm:text-3xl font-bold text-text leading-tight max-w-xs">
          Del ord.<br />
          <span class="text-text-soft font-medium">Se dem leve.</span>
        </p>

        <p class="text-base text-muted leading-relaxed max-w-sm">
          Del en lenke, samle ord fra publikum og se ordskyen vokse i sanntid.
          Perfekt til workshops, klasser og presentasjoner.
        </p>

        <div class="flex flex-wrap gap-3 pt-1">
          <Button variant="primary" size="lg">Lag ordboble ✨</Button>
          <Button variant="secondary" size="lg">Se demo</Button>
        </div>
      </div>

      <!-- ── Right: Word cloud visual ── -->
      <div
        class="relative h-[440px] sm:h-[520px] lg:h-[620px] animate-fade-in"
        style="animation-delay: 0.15s"
      >
        <!-- Radial glow backdrop behind the cloud -->
        <div
          class="absolute inset-0 rounded-[2.5rem] pointer-events-none"
          style="background: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(124,60,255,0.13) 0%, transparent 70%)"
          aria-hidden="true"
        ></div>

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
