<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    variant?: 'playful' | 'calm'
    children: Snippet
  }

  let { variant = 'playful', children }: Props = $props()

  const variantClasses: Record<string, string> = {
    playful: '[background:var(--gradient-logo)] bg-clip-text text-transparent',
    calm: '[background:linear-gradient(135deg,#a78bfa,#d9def3_60%,#7c3cff)] bg-clip-text text-transparent',
  }
</script>

<span class="inline {variantClasses[variant]}">
  {@render children()}
</span>
