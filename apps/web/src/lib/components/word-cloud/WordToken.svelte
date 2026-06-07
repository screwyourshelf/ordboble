<script lang="ts">
  import type { TokenSize, TokenColor, TokenVariant, TokenDepth, GlowIntensity } from '../../types/word-cloud'

  interface Props {
    word: string
    size?: TokenSize
    color?: TokenColor
    variant?: TokenVariant
    depth?: TokenDepth
    glowIntensity?: GlowIntensity
    rotation?: number
    /** @deprecated use variant instead */
    gradient?: boolean
    /** @deprecated use glowIntensity instead */
    glow?: boolean
    delay?: number
  }

  let {
    word,
    size = 'md',
    color = 'text',
    variant = 'solid',
    depth = 1,
    glowIntensity,
    rotation = 0,
    gradient = false,
    glow = false,
    delay = 0,
  }: Props = $props()

  const fontSizeMap: Record<TokenSize, string> = {
    xs:    'text-xs',
    sm:    'text-sm',
    md:    'text-xl',
    lg:    'text-3xl',
    xl:    'text-5xl',
    '2xl': 'text-6xl sm:text-7xl',
  }

  const colorMap: Record<TokenColor, string> = {
    primary: 'text-primary',
    accent:  'text-accent',
    warm:    'text-warm',
    success: 'text-success',
    text:    'text-text',
    soft:    'text-text-soft',
  }

  const glowClassMap: Record<GlowIntensity, string> = {
    none:   '',
    soft:   'glow-soft',
    medium: 'glow-medium',
    strong: 'glow-strong',
  }

  // Opacity contributions: variant × depth (rendered = outer-anim × inner-opacity)
  const variantOpacityMap: Record<TokenVariant, number> = {
    hero:     1,
    solid:    1,
    gradient: 1,
    subtle:   0.72,
    ghost:    0.38,
  }

  const depthMultMap: Record<TokenDepth, number> = {
    1: 1,
    2: 0.88,
    3: 0.68,
    4: 0.45,
  }

  // Resolve effective variant (legacy gradient compat)
  const effectiveVariant: TokenVariant = $derived(
    variant !== 'solid' ? variant : (gradient ? 'gradient' : 'solid')
  )

  // Resolve effective glow intensity (legacy glow compat)
  const effectiveGlow: GlowIntensity = $derived(
    glowIntensity ?? (glow ? 'medium' : 'none')
  )

  // Color class — variant determines gradient vs solid color
  const colorClass = $derived(
    effectiveVariant === 'hero' || effectiveVariant === 'gradient'
      ? '[background:var(--gradient-logo)] bg-clip-text text-transparent'
      : colorMap[color]
  )

  // Combined opacity (variant prominence × depth layer)
  const tokenOpacity = $derived(
    variantOpacityMap[effectiveVariant] * depthMultMap[depth]
  )

  // Gradient/hero tokens need an explicit --glow-color since text is transparent
  const glowColorVar = $derived(
    effectiveVariant === 'hero' || effectiveVariant === 'gradient'
      ? '--glow-color: var(--color-accent);'
      : ''
  )

  // Outer span: depth 4 gets subtle blur for background illusion
  const outerDepthClass = $derived(depth === 4 ? 'blur-[1px]' : '')

  const isHero = $derived(effectiveVariant === 'hero')
</script>

<!--
  Outer span: handles entrance animation + depth blur.
  Inner span: handles rotation (CSS var), hover scale, variant, glow.
  Two-span structure separates animation from transform to avoid conflicts.
-->
<span
  class="inline-block cursor-default select-none word-pop-in {outerDepthClass}"
  style="animation-delay: {delay}s"
>
  <span
    class="inline-block font-black leading-none
      {isHero ? 'word-token-hero' : 'word-token'}
      {fontSizeMap[size]}
      {colorClass}
      {glowClassMap[effectiveGlow]}"
    style="--rotation: {rotation}deg; {glowColorVar} opacity: {tokenOpacity}"
  >
    {word}
  </span>
</span>
