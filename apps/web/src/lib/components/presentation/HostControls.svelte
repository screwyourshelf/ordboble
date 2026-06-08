<script lang="ts">
  interface Props {
    isFullscreen: boolean
    chromeVisible: boolean
    frozen: boolean
    paused: boolean
    queuedCount: number
    canFullscreen: boolean
    onFullscreenToggle: () => void
    onChromeToggle: () => void
    onFreezeToggle: () => void
    onPauseToggle: () => void
    onReset: () => void
  }

  let {
    isFullscreen,
    chromeVisible,
    frozen,
    paused,
    queuedCount,
    canFullscreen,
    onFullscreenToggle,
    onChromeToggle,
    onFreezeToggle,
    onPauseToggle,
    onReset,
  }: Props = $props()
</script>

<!--
  Host Controls — floating presenter toolbar.
  Always rendered (z-[100]) so the host can restore chrome even when it is hidden.
  Hidden on small screens: this is a desktop/projector control surface.
-->
<div
  class="absolute top-6 right-6 z-[100] hidden sm:flex flex-col gap-1.5
    opacity-40 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300
    pointer-events-auto"
  role="toolbar"
  aria-label="Presentasjonskontroller"
>
  <!-- Fullscreen (hidden when browser does not support the API) -->
  {#if canFullscreen}
    <button
      class="ctrl-btn"
      class:ctrl-btn-active={isFullscreen}
      onclick={onFullscreenToggle}
      title={isFullscreen ? 'Avslutt fullskjerm (F)' : 'Fullskjerm (F)'}
      aria-label={isFullscreen ? 'Avslutt fullskjerm' : 'Fullskjerm'}
      aria-pressed={isFullscreen}
    >
      {#if isFullscreen}
        <!-- Compress icon -->
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M5 1v4H1M11 1v4h4M5 15v-4H1M11 15v-4h4"
            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      {:else}
        <!-- Expand icon -->
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M1 5V1h4M15 5V1h-4M1 11v4h4M15 11v4h-4"
            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      {/if}
    </button>
  {/if}

  <!-- Chrome visibility toggle (eye / eye-off) -->
  <button
    class="ctrl-btn"
    class:ctrl-btn-active={!chromeVisible}
    onclick={onChromeToggle}
    title={chromeVisible ? 'Skjul krom (C)' : 'Vis krom (C)'}
    aria-label={chromeVisible ? 'Skjul krom' : 'Vis krom'}
    aria-pressed={!chromeVisible}
  >
    {#if chromeVisible}
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    {:else}
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 2l12 12M6.5 6.5A2 2 0 0 0 9.5 9.5M4 4.5C2.5 5.7 1 8 1 8s2.5 5 7 5c1.3 0 2.4-.4 3.4-.9M12.5 11C13.8 9.8 15 8 15 8s-2.5-5-7-5c-.8 0-1.5.1-2.2.3"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    {/if}
  </button>

  <!-- Freeze layout (snowflake) -->
  <button
    class="ctrl-btn"
    class:ctrl-btn-active={frozen}
    onclick={onFreezeToggle}
    title={frozen ? 'Opphev frysing' : 'Frys layout'}
    aria-label={frozen ? 'Opphev frysing' : 'Frys layout'}
    aria-pressed={frozen}
  >
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1v14M1 8h14M3.2 3.2l9.6 9.6M12.8 3.2l-9.6 9.6"
        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
    </svg>
  </button>

  <!-- Pause / resume live updates -->
  <div class="relative">
    <button
      class="ctrl-btn"
      class:ctrl-btn-active={paused}
      onclick={onPauseToggle}
      title={paused
        ? `Fortsett${queuedCount > 0 ? ` (${queuedCount} i kø)` : ''} (P)`
        : 'Pause oppdateringer (P)'}
      aria-label={paused ? 'Fortsett oppdateringer' : 'Pause oppdateringer'}
      aria-pressed={paused}
    >
      {#if paused}
        <!-- Play icon -->
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 2l9 6-9 6V2z" fill="currentColor" opacity="0.7"
            stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      {:else}
        <!-- Pause icon -->
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="3" y="2" width="3" height="12" rx="1" fill="currentColor" opacity="0.8"/>
          <rect x="10" y="2" width="3" height="12" rx="1" fill="currentColor" opacity="0.8"/>
        </svg>
      {/if}
    </button>

    <!-- Queue count badge -->
    {#if paused && queuedCount > 0}
      <span
        class="absolute -top-1 -right-1 flex items-center justify-center
          w-4 h-4 rounded-full text-[9px] font-black pointer-events-none
          bg-accent text-white"
        aria-hidden="true"
      >
        {queuedCount > 9 ? '9+' : queuedCount}
      </span>
    {/if}
  </div>

  <!-- Divider -->
  <div class="w-full h-px bg-white/10 my-0.5" role="separator" aria-hidden="true"></div>

  <!-- Reset cloud -->
  <button
    class="ctrl-btn ctrl-btn-reset"
    onclick={onReset}
    title="Nullstill sky (R)"
    aria-label="Nullstill sky"
  >
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M13.7 7A6 6 0 1 0 12 12.4"
        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13 3.5v4h-4"
        stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</div>

<style>
  .ctrl-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.125rem;
    height: 2.125rem;
    border-radius: 0.625rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: var(--color-muted);
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
    flex-shrink: 0;
  }

  .ctrl-btn:hover {
    background: rgba(255, 255, 255, 0.14);
    border-color: rgba(255, 255, 255, 0.22);
    color: var(--color-text);
  }

  .ctrl-btn-active {
    background: rgba(255, 79, 163, 0.15);
    border-color: rgba(255, 79, 163, 0.35);
    color: var(--color-accent);
  }

  .ctrl-btn-active:hover {
    background: rgba(255, 79, 163, 0.22);
    border-color: rgba(255, 79, 163, 0.5);
  }

  .ctrl-btn-reset:hover {
    border-color: rgba(255, 122, 47, 0.4);
    color: var(--color-warm);
  }
</style>
