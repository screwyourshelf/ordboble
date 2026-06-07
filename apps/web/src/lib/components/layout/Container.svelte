<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    variant?: 'default' | 'wide' | 'narrow'
    class?: string
    children: Snippet
  }

  let { variant = 'default', class: className = '', children }: Props = $props()

  const widthClasses: Record<string, string> = {
    default: 'max-w-3xl',
    wide: 'max-w-6xl',
    narrow: 'max-w-xl',
  }
</script>

<div
  class="mx-auto w-full px-4 sm:px-6 lg:px-8 {widthClasses[variant]} {className}"
>
  {@render children()}
</div>
