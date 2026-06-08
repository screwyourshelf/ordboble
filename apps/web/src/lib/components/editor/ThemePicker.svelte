<script lang="ts">
  import type { ThemeId } from '../../types/theme'
  import { themes } from '../../design/themes'

  interface Props {
    selected: ThemeId
    onSelect: (theme: ThemeId) => void
  }

  let { selected, onSelect }: Props = $props()
</script>

<div class="flex flex-col gap-3">
  <p class="text-xs font-bold uppercase tracking-widest text-muted">Tema</p>
  <div class="grid grid-cols-4 gap-2">
    {#each themes as theme (theme.id)}
      {@const isSelected = selected === theme.id}
      <button
        class="flex flex-col items-center gap-1.5 group cursor-pointer border-0 bg-transparent p-0"
        onclick={() => onSelect(theme.id)}
        aria-pressed={isSelected}
        aria-label={theme.label}
      >
        <!-- Color swatch -->
        <div
          class="w-full aspect-square rounded-xl transition-[transform,box-shadow,opacity] duration-200
            {isSelected ? 'ring-2 ring-offset-2 ring-offset-transparent scale-105' : 'opacity-70 hover:opacity-90 hover:scale-105'}"
          style="background: {theme.swatch}; {isSelected ? `ring-color: ${theme.ring}` : ''};
            box-shadow: {isSelected ? `0 0 16px ${theme.ring}55` : 'none'}"
        ></div>
        <!-- Label -->
        <span
          class="text-[11px] font-semibold leading-none transition-colors duration-150
            {isSelected ? 'text-text' : 'text-muted group-hover:text-text-soft'}"
        >{theme.label}</span>
      </button>
    {/each}
  </div>
</div>
