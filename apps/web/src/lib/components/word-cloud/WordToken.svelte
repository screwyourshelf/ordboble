<script lang="ts">
  interface Props {
    word: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    color?: 'primary' | 'accent' | 'warm' | 'success' | 'text' | 'soft'
    rotation?: number
    glow?: boolean
    gradient?: boolean
    delay?: number
  }

  let {
    word,
    size = 'md',
    color = 'text',
    rotation = 0,
    glow = false,
    gradient = false,
    delay = 0,
  }: Props = $props()

  const fontSizeMap: Record<string, string> = {
    xs:   'text-xs',
    sm:   'text-sm',
    md:   'text-xl',
    lg:   'text-3xl',
    xl:   'text-5xl',
    '2xl': 'text-6xl sm:text-7xl',
  }

  const colorMap: Record<string, string> = {
    primary: 'text-primary',
    accent:  'text-accent',
    warm:    'text-warm',
    success: 'text-success',
    text:    'text-text',
    soft:    'text-text-soft',
  }
</script>

<span
  class="inline-block font-black leading-none select-none cursor-default word-pop-in
    {fontSizeMap[size]}
    {gradient
      ? '[background:var(--gradient-logo)] bg-clip-text text-transparent'
      : colorMap[color]}
    {glow ? 'drop-shadow-[0_0_18px_currentColor]' : ''}"
  style="transform: rotate({rotation}deg); animation-delay: {delay}s"
>
  {word}
</span>
