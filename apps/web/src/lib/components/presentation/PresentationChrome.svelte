<script lang="ts">
  import Badge from '../ui/Badge.svelte'
  import GradientText from '../ui/GradientText.svelte'
  import ParticipantCounter from './ParticipantCounter.svelte'

  interface Props {
    title: string
    prompt: string
    participantCount: number
  }

  let { title, prompt, participantCount }: Props = $props()

  // Fake fullscreen toggle state — no real API
  let isFullscreen = $state(false)
</script>

<!-- Top chrome bar -->
<header
  class="absolute top-0 left-0 right-0 z-50 flex items-start justify-between
    gap-4 px-8 py-6 pointer-events-none"
  style="background: linear-gradient(to bottom, rgba(7,8,22,0.82) 0%, transparent 100%)"
>
  <!-- Left: title + prompt -->
  <div class="flex flex-col gap-1.5 pointer-events-auto max-w-2xl">
    <div class="flex items-center gap-2">
      <Badge variant="success">● Live</Badge>
    </div>
    <h1 class="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-text">
      <GradientText>{title}</GradientText>
    </h1>
    <p class="text-base sm:text-lg text-text-soft leading-snug mt-0.5">
      {prompt}
    </p>
  </div>

  <!-- Right: participant counter + fake fullscreen button -->
  <div class="flex items-center gap-4 pointer-events-auto shrink-0 pt-1">
    <ParticipantCounter count={participantCount} />

    <button
      class="flex items-center justify-center w-9 h-9 rounded-xl
        bg-white/8 border border-white/12 text-muted transition-soft
        hover:bg-white/14 hover:text-text"
      title="Fullskjerm (visuell)"
      onclick={() => (isFullscreen = !isFullscreen)}
      aria-label="Bytt fullskjerm"
    >
      {#if isFullscreen}
        <!-- Compress icon -->
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M5 1v4H1M11 1v4h4M5 15v-4H1M11 15v-4h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      {:else}
        <!-- Expand icon -->
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M1 5V1h4M15 5V1h-4M1 11v4h4M15 11v4h-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      {/if}
    </button>
  </div>
</header>
