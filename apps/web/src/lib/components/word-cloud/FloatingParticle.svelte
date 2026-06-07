<script lang="ts">
  interface Props {
    color?: 'primary' | 'accent' | 'warm' | 'success'
    size?: 'sm' | 'md' | 'lg'
    x: number
    y: number
    delay?: number
    duration?: number
  }

  let {
    color = 'accent',
    size = 'sm',
    x,
    y,
    delay = 0,
    duration = 5,
  }: Props = $props()

  const sizeMap: Record<string, string> = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2.5 h-2.5',
    lg: 'w-4 h-4',
  }

  const colorMap: Record<string, string> = {
    primary: 'bg-primary',
    accent:  'bg-accent',
    warm:    'bg-warm',
    success: 'bg-success',
  }
</script>

<span
  aria-hidden="true"
  class="absolute rounded-full pointer-events-none blur-[3px] opacity-75
    {sizeMap[size]} {colorMap[color]}"
  style="left: {x}%; top: {y}%; animation: float-subtle {duration}s ease-in-out {delay}s infinite"
></span>
