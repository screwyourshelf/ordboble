<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    title: string
    eyebrow?: string
    class?: string
    children: Snippet
  }

  let { title, eyebrow, class: className = '', children }: Props = $props()
</script>

<div
  class="relative overflow-hidden rounded-card border border-border
    bg-surface backdrop-blur-xl shadow-glow
    {className}"
>
  <div class="p-6 flex flex-col gap-4">
    {#if eyebrow}
      <p class="text-xs font-bold text-muted uppercase tracking-widest">{eyebrow}</p>
    {/if}
    <h3 class="text-lg font-bold text-text">{title}</h3>
    <div>
      {@render children()}
    </div>
  </div>
</div>
