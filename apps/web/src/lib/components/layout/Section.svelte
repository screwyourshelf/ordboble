<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    spacing?: 'default' | 'compact' | 'spacious'
    class?: string
    children: Snippet
  }

  let { spacing = 'default', class: className = '', children }: Props = $props()

  const spacingClasses: Record<string, string> = {
    default: 'py-16',
    compact: 'py-8',
    spacious: 'py-24',
  }
</script>

<section class="{spacingClasses[spacing]} {className}">
  {@render children()}
</section>
