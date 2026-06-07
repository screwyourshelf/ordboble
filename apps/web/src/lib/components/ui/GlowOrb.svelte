<script lang="ts">
  interface Props {
    size?: 'sm' | 'md' | 'lg'
    color?: 'primary' | 'accent' | 'warm'
  }

  let { size = 'md', color = 'primary' }: Props = $props()

  const sizeClasses: Record<string, string> = {
    sm: 'w-32 h-32 blur-2xl',
    md: 'w-64 h-64 blur-3xl',
    lg: 'w-96 h-96 blur-[80px]',
  }

  const colorClasses: Record<string, string> = {
    primary: 'bg-primary/30',
    accent: 'bg-accent/30',
    warm: 'bg-warm/30',
  }
</script>

<div
  aria-hidden="true"
  class="pointer-events-none rounded-full float-subtle
    {sizeClasses[size]} {colorClasses[color]}"
></div>
