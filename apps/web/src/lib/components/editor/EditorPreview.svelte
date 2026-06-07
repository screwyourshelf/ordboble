<script lang="ts">
  import GlowOrb from '../ui/GlowOrb.svelte'
  import WordCluster from '../word-cloud/WordCluster.svelte'
  import FloatingParticle from '../word-cloud/FloatingParticle.svelte'
  import type { EditorTheme, EditorShape } from '../../types/editor'
  import { heroComposition } from '../../word-cloud/compositions'
  import { getTheme } from '../../design/themes'
  import { getShape } from '../../design/shapes'

  interface Props {
    theme: EditorTheme
    shape: EditorShape
  }

  let { theme, shape }: Props = $props()

  const activeTheme = $derived(getTheme(theme))
  const activeShape = $derived(getShape(shape))
</script>

<!--
  EditorPreview — live word cloud preview with theme tinting.
  Theme selection changes the background atmosphere only (no real shape masking).
-->
<div
  class="relative w-full h-full overflow-hidden rounded-[2rem] border border-white/10"
  style="background: {activeTheme.previewBg}"
>
  <!-- Atmospheric glow -->
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <div class="absolute -top-16 right-[-8%] opacity-50">
      <GlowOrb size="md" color={activeTheme.glowColor} />
    </div>
    <div class="absolute -bottom-10 left-[5%] opacity-40">
      <GlowOrb size="sm" color="accent" />
    </div>
    <!-- Inner radial depth -->
    <div
      class="absolute inset-0"
      style="background: radial-gradient(ellipse 55% 50% at 50% 50%, rgba(124,60,255,0.12) 0%, transparent 65%)"
    ></div>
  </div>

  <!-- Word cloud -->
  <WordCluster words={heroComposition.words} class="absolute inset-0" />

  <!-- Floating particles -->
  <FloatingParticle color="accent"  size="sm" x={8}  y={12} delay={0}   duration={4.8} />
  <FloatingParticle color="primary" size="sm" x={90} y={15} delay={1.1} duration={5.6} />
  <FloatingParticle color="warm"    size="sm" x={85} y={78} delay={0.6} duration={4.2} />
  <FloatingParticle color="success" size="sm" x={5}  y={80} delay={2.0} duration={5.0} />
  <FloatingParticle color="accent"  size="sm" x={50} y={5}  delay={0.8} duration={6.0} />

  <!-- Shape badge (bottom-left) -->
  <div class="absolute bottom-4 left-4 z-20">
    <span
      class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill
        bg-black/40 backdrop-blur-sm border border-white/12
        text-xs font-bold text-text-soft"
    >
      {activeShape.icon} {activeShape.label}
    </span>
  </div>
</div>
