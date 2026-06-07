<script lang="ts">
  import type { ScreenId } from '../types/app'
  import { screens } from './screens'

  interface Props {
    current: ScreenId
    onNavigate: (id: ScreenId) => void
  }

  let { current, onNavigate }: Props = $props()
</script>

<!--
  PrototypeNav — floating pill navigation bar.
  Fixed bottom-center, compact, semi-transparent.
  Clearly prototype-style — does not feel like final product nav.
  Stays on top of all screens including fullscreen ones.
-->
<nav
  class="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100]
    flex items-center gap-1 p-1.5 rounded-pill
    bg-black/60 backdrop-blur-xl border border-white/12
    shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
  aria-label="Prototype navigasjon"
>
  {#each screens as screen (screen.id)}
    {@const isActive = current === screen.id}
    <button
      class="flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-bold
        transition-all duration-150 cursor-pointer border-0 select-none
        {isActive
          ? '[background:var(--gradient-button)] text-white shadow-[0_2px_12px_rgba(255,79,163,0.35)]'
          : 'text-muted hover:text-text-soft hover:bg-white/8'}"
      onclick={() => onNavigate(screen.id)}
      aria-current={isActive ? 'page' : undefined}
      title={screen.description}
    >
      <span aria-hidden="true">{screen.emoji}</span>
      <span class="hidden sm:inline">{screen.label}</span>
    </button>
  {/each}
</nav>
