<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    gradient?: boolean
    centered?: boolean
    children: Snippet
  }

  let { gradient = false, centered = false, children }: Props = $props()
</script>

<h1
  class="text-5xl sm:text-6xl font-black tracking-tight leading-none
    {centered ? 'text-center' : ''}
    {gradient
      ? '[background:var(--gradient-logo)] bg-clip-text text-transparent'
      : 'text-text'}"
>
  {@render children()}
</h1>
