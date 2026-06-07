<script lang="ts">
  import type { EditorShape } from '../../types/editor'

  interface ShapeOption {
    id: EditorShape
    label: string
    icon: string
  }

  interface Props {
    selected: EditorShape
    onSelect: (shape: EditorShape) => void
  }

  let { selected, onSelect }: Props = $props()

  const shapes: ShapeOption[] = [
    { id: 'freeform',    label: 'Fritt',    icon: '✦' },
    { id: 'circle',      label: 'Sirkel',   icon: '◉' },
    { id: 'heart',       label: 'Hjerte',   icon: '♡' },
    { id: 'star',        label: 'Stjerne',  icon: '✦' },
  ]
</script>

<div class="flex flex-col gap-3">
  <p class="text-xs font-bold uppercase tracking-widest text-muted">Form</p>
  <div class="grid grid-cols-2 gap-2">
    {#each shapes as shape (shape.id)}
      {@const isSelected = selected === shape.id}
      <button
        class="flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all duration-150 cursor-pointer text-left
          {isSelected
            ? 'bg-primary/15 border-primary/40 text-primary'
            : 'bg-white/4 border-white/8 text-muted hover:bg-white/8 hover:border-white/16 hover:text-text-soft'}"
        onclick={() => onSelect(shape.id)}
        aria-pressed={isSelected}
      >
        <span class="text-base leading-none shrink-0">{shape.icon}</span>
        <span class="text-xs font-bold">{shape.label}</span>
      </button>
    {/each}
  </div>
</div>
