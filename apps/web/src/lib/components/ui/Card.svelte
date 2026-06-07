<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    elevated?: boolean
    class?: string
    children: Snippet
  }

  let { elevated = false, class: className = '', children }: Props = $props()
</script>

<div
  class="relative overflow-hidden rounded-card border border-border bg-surface backdrop-blur-xl
    {elevated ? 'shadow-glow' : 'shadow-soft'}
    {className}"
>
  {@render children()}
</div>
