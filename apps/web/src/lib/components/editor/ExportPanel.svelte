<script lang="ts">
  const actions = [
    { label: 'PNG', icon: '🖼' },
    { label: 'SVG', icon: '✦' },
    { label: 'PDF', icon: '📄' },
    { label: 'Print', icon: '🖨' },
  ]
</script>

<div class="flex flex-col gap-3">
  <p class="text-xs font-bold uppercase tracking-widest text-muted">Eksporter</p>
  <div class="grid grid-cols-2 gap-2">
    {#each actions as action (action.label)}
      <button
        disabled
        class="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl
          border border-white/8 bg-white/3 text-muted text-xs font-bold
          cursor-not-allowed opacity-50 select-none"
        title="Kommer snart"
        aria-label="{action.label} — kommer snart"
      >
        <span class="text-sm leading-none" aria-hidden="true">{action.icon}</span>
        <span>{action.label}</span>
      </button>
    {/each}
  </div>
  <p class="text-[11px] text-muted/60 text-center leading-snug">
    Export kommer i en fremtidig versjon
  </p>
</div>
