<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    accent?: boolean
    children: Snippet
  }

  let { accent = false, children }: Props = $props()
</script>

<p
  class="text-xs font-bold uppercase tracking-widest
    {accent ? 'text-accent' : 'text-muted'}"
>
  {@render children()}
</p>
