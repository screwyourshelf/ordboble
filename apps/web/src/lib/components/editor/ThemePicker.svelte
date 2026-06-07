<script lang="ts">
  import type { EditorTheme } from '../../types/editor'

  interface ThemeOption {
    id: EditorTheme
    label: string
    swatch: string
    ring: string
  }

  interface Props {
    selected: EditorTheme
    onSelect: (theme: EditorTheme) => void
  }

  let { selected, onSelect }: Props = $props()

  const themes: ThemeOption[] = [
    {
      id: 'playful',
      label: 'Playful',
      swatch: 'linear-gradient(135deg, #7c3cff, #ff4fa3)',
      ring: '#7c3cff',
    },
    {
      id: 'calm',
      label: 'Calm',
      swatch: 'linear-gradient(135deg, #3b82f6, #7c3cff)',
      ring: '#3b82f6',
    },
    {
      id: 'dark',
      label: 'Dark',
      swatch: 'linear-gradient(135deg, #1a1a2e, #16213e)',
      ring: '#ffffff',
    },
    {
      id: 'celebration',
      label: 'Fест',
      swatch: 'linear-gradient(135deg, #ff7a2f, #ff4fa3)',
      ring: '#ff7a2f',
    },
  ]
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
          class="w-full aspect-square rounded-xl transition-all duration-200
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
