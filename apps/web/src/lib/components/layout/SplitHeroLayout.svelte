<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    content: Snippet
    visual: Snippet
    class?: string
  }

  let { content, visual, class: className = '' }: Props = $props()
</script>

<div class="grid md:grid-cols-2 gap-12 items-center {className}">
  <div class="flex flex-col gap-6">
    {@render content()}
  </div>
  <div>
    {@render visual()}
  </div>
</div>
