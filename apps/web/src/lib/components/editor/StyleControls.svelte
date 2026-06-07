<script lang="ts">
  import type { EditorStyle, EditorDensity, EditorWordSize, EditorGlow } from '../../types/editor'

  interface Props {
    style: EditorStyle
    onStyleChange: (updated: Partial<EditorStyle>) => void
  }

  let { style, onStyleChange }: Props = $props()

  const densityOptions: { id: EditorDensity; label: string }[] = [
    { id: 'compact',  label: 'Tett' },
    { id: 'balanced', label: 'Balansert' },
    { id: 'airy',     label: 'Luftig' },
  ]

  const wordSizeOptions: { id: EditorWordSize; label: string }[] = [
    { id: 'small',  label: 'Liten' },
    { id: 'medium', label: 'Medium' },
    { id: 'large',  label: 'Stor' },
  ]

  const glowOptions: { id: EditorGlow; label: string }[] = [
    { id: 'off',    label: 'Av' },
    { id: 'soft',   label: 'Myk' },
    { id: 'strong', label: 'Sterk' },
  ]
</script>

<div class="flex flex-col gap-4">
  <p class="text-xs font-bold uppercase tracking-widest text-muted">Stil</p>

  <!-- Density -->
  <div class="flex flex-col gap-1.5">
    <span class="text-xs text-text-soft font-semibold">Tetthet</span>
    <div class="flex gap-1.5">
      {#each densityOptions as opt (opt.id)}
        {@const active = style.density === opt.id}
        <button
          class="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer border-0
            {active
              ? 'bg-primary/20 text-primary'
              : 'bg-white/5 text-muted hover:bg-white/10 hover:text-text-soft'}"
          onclick={() => onStyleChange({ density: opt.id })}
          aria-pressed={active}
        >{opt.label}</button>
      {/each}
    </div>
  </div>

  <!-- Word size -->
  <div class="flex flex-col gap-1.5">
    <span class="text-xs text-text-soft font-semibold">Ordstørrelse</span>
    <div class="flex gap-1.5">
      {#each wordSizeOptions as opt (opt.id)}
        {@const active = style.wordSize === opt.id}
        <button
          class="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer border-0
            {active
              ? 'bg-accent/20 text-accent'
              : 'bg-white/5 text-muted hover:bg-white/10 hover:text-text-soft'}"
          onclick={() => onStyleChange({ wordSize: opt.id })}
          aria-pressed={active}
        >{opt.label}</button>
      {/each}
    </div>
  </div>

  <!-- Glow -->
  <div class="flex flex-col gap-1.5">
    <span class="text-xs text-text-soft font-semibold">Glød</span>
    <div class="flex gap-1.5">
      {#each glowOptions as opt (opt.id)}
        {@const active = style.glow === opt.id}
        <button
          class="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer border-0
            {active
              ? 'bg-warm/20 text-warm'
              : 'bg-white/5 text-muted hover:bg-white/10 hover:text-text-soft'}"
          onclick={() => onStyleChange({ glow: opt.id })}
          aria-pressed={active}
        >{opt.label}</button>
      {/each}
    </div>
  </div>
</div>
