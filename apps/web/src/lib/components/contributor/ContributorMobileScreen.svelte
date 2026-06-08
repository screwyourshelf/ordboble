<script lang="ts">
  import { onMount } from 'svelte'
  import GlowOrb from '../ui/GlowOrb.svelte'
  import Eyebrow from '../ui/Eyebrow.svelte'
  import GradientText from '../ui/GradientText.svelte'
  import WordInputList from './WordInputList.svelte'
  import SuccessConfirmation from './SuccessConfirmation.svelte'
  import { mockSession as session } from '../../mocks/session'
  import { submitWords } from '../../services/word-api'
  import { getCloud } from '../../services/cloud-api'
  import env from '../../config/env'

  interface Props {
    sessionId?: string
  }

  let { sessionId }: Props = $props()

  // Priority: route session id → env override → mock fallback
  const cloudId = sessionId || env.cloudId || session.id

  let cloudTitle = $state(session.title)
  let cloudPrompt = $state(session.prompt)

  let submitted = $state(false)
  let submittedWords = $state<string[]>([])
  let loading = $state(false)
  let error = $state<string | null>(null)

  onMount(async () => {
    if (!env.apiBaseUrl) return
    const result = await getCloud(cloudId)
    if (result.ok) {
      cloudTitle = result.data.title
      cloudPrompt = result.data.prompt ?? result.data.title
    }
  })

  async function handleSubmit(words: string[]) {
    loading = true
    error = null

    const result = await submitWords(cloudId, words)

    loading = false

    if (result.ok) {
      submittedWords = result.accepted
      submitted = true
    } else {
      error = result.error
    }
  }

  function handleReset() {
    submittedWords = []
    submitted = false
    error = null
  }
</script>

<div class="relative min-h-svh flex flex-col items-center justify-center px-6 py-12 overflow-hidden">

  <!-- Atmospheric glow orbs -->
  <div
    class="absolute -top-16 -right-16 pointer-events-none"
    aria-hidden="true"
  >
    <GlowOrb size="md" color="accent" />
  </div>
  <div
    class="absolute -bottom-16 -left-16 pointer-events-none"
    aria-hidden="true"
  >
    <GlowOrb size="sm" color="primary" />
  </div>

  <!-- Content -->
  <div class="relative w-full max-w-sm flex flex-col gap-8">

    <!-- Header -->
    <header class="flex flex-col gap-3 text-center">
      <Eyebrow accent>
        <GradientText variant="playful">{cloudTitle}</GradientText>
      </Eyebrow>

      <h1 class="text-2xl font-bold text-text leading-snug">
        {cloudPrompt}
      </h1>

      {#if !submitted}
        <p class="text-sm text-muted">{session.helperText}</p>
      {/if}
    </header>

    <!-- Flow -->
    {#if submitted}
      <SuccessConfirmation words={submittedWords} onReset={handleReset} />
    {:else}
      {#if error}
        <p class="text-sm text-center text-red-400 px-2">{error}</p>
      {/if}
      <WordInputList onSubmit={handleSubmit} loading={loading} />
    {/if}

  </div>
</div>
