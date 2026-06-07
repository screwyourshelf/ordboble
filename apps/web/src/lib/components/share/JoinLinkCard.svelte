<script lang="ts">
  interface Props {
    joinUrl: string
  }

  let { joinUrl }: Props = $props()

  let copied = $state(false)
  let copyTimer: ReturnType<typeof setTimeout> | null = null

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(joinUrl)
      copied = true
      if (copyTimer !== null) clearTimeout(copyTimer)
      copyTimer = setTimeout(() => {
        copied = false
        copyTimer = null
      }, 2000)
    } catch {
      // Clipboard API not available in this context
    }
  }
</script>

<div
  class="relative overflow-hidden rounded-card border border-border bg-surface
    backdrop-blur-xl shadow-soft p-5 flex flex-col gap-4"
>
  <div class="flex flex-col gap-2">
    <p class="text-xs font-bold uppercase tracking-widest text-muted">
      Invitasjonslenke
    </p>

    <div class="flex items-center gap-3">
      <!-- URL display -->
      <div
        class="flex-1 min-w-0 overflow-hidden rounded-xl border border-border
          bg-white/5 px-4 py-2.5"
      >
        <p class="text-sm font-mono text-text-soft truncate">{joinUrl}</p>
      </div>

      <!-- Copy button -->
      <button
        onclick={copyLink}
        class="flex-shrink-0 px-4 py-2.5 rounded-xl font-bold text-sm
          cursor-pointer transition-all duration-200 border
          {copied
            ? 'bg-success/15 text-success border-success/30'
            : 'bg-primary/15 text-primary border-primary/30 hover:bg-primary/25 hover:-translate-y-px'}"
      >
        {#if copied}
          Kopiert ✓
        {:else}
          Kopier
        {/if}
      </button>
    </div>
  </div>

  <p class="text-xs text-muted leading-relaxed">
    Del denne lenken direkte med deltakerne — de åpner den i nettleseren.
  </p>
</div>
