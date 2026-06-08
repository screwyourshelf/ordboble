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

  <!-- Right: participant counter -->
  <div class="flex items-center gap-4 pointer-events-auto shrink-0 pt-1">
    <ParticipantCounter count={participantCount} />
  </div>
</header>
