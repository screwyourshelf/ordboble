<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    class?: string
    children: Snippet
  }

  let { class: className = '', children }: Props = $props()
</script>

<div
  class="inline-flex flex-wrap items-center gap-3 px-5 py-3
    rounded-pill border border-border
    bg-surface/80 backdrop-blur-xl
    shadow-soft
    {className}"
>
  {@render children()}
</div>
