<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    onclick?: (e: MouseEvent) => void
    children: Snippet
  }

  let {
    variant = 'primary',
    size = 'md',
    type = 'button',
    disabled = false,
    onclick,
    children,
  }: Props = $props()

  const variantClasses: Record<string, string> = {
    primary:
      '[background:var(--gradient-button)] text-white shadow-[0_18px_45px_rgba(255,79,163,.28)] hover:shadow-[0_22px_55px_rgba(255,79,163,.38)]',
    secondary:
      'bg-white/8 border border-border-strong text-text hover:bg-white/12',
    ghost: 'bg-white/5 text-muted hover:bg-white/10 hover:text-text-soft',
  }

  const sizeClasses: Record<string, string> = {
    sm: 'px-4 py-2 text-sm min-h-9',
    md: 'px-6 py-3 text-base min-h-12',
    lg: 'px-8 py-4 text-lg min-h-14',
  }
</script>

<button
  {type}
  {disabled}
  {onclick}
  class="inline-flex items-center justify-center gap-2 font-bold cursor-pointer rounded-pill border-0 transition-all duration-200 select-none
    hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]
    disabled:opacity-50 disabled:pointer-events-none
    {variantClasses[variant]} {sizeClasses[size]}"
>
  {@render children()}
</button>
