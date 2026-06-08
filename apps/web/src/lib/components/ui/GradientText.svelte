<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    variant?: 'playful' | 'calm'
    children: Snippet
  }

  let { variant = 'playful', children }: Props = $props()

  const variantStyles: Record<string, string> = {
    playful: 'background: var(--gradient-logo); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;',
    calm: 'background: linear-gradient(135deg,#a78bfa,#d9def3 60%,#7c3cff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;',
  }
</script>

<span class="inline" style={variantStyles[variant]}>
  {@render children()}
</span>
