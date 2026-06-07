<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    compact?: boolean
    children: Snippet
  }

  let { compact = false, children }: Props = $props()
</script>

<h2
  class="font-bold tracking-tight text-text
    {compact ? 'text-xl' : 'text-3xl'}"
>
  {@render children()}
</h2>
