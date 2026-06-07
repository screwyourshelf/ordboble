<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    muted?: boolean
    children: Snippet
  }

  let { muted = false, children }: Props = $props()
</script>

<p
  class="text-base leading-relaxed
    {muted ? 'text-muted' : 'text-text-soft'}"
>
  {@render children()}
</p>
