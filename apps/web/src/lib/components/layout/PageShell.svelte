<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    class?: string
    children: Snippet
  }

  let { class: className = '', children }: Props = $props()
</script>

<div
  class="min-h-svh [background:var(--gradient-hero)] text-text {className}"
>
  {@render children()}
</div>
