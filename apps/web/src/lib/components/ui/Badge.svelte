<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    variant?: 'neutral' | 'accent' | 'success'
    children: Snippet
  }

  let { variant = 'neutral', children }: Props = $props()

  const variantClasses: Record<string, string> = {
    neutral: 'bg-white/8 text-text-soft border border-border',
    accent: 'bg-accent/15 text-accent border border-accent/30',
    success: 'bg-success/15 text-success border border-success/30',
  }
</script>

<span
  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-bold
    {variantClasses[variant]}"
>
  {@render children()}
</span>
