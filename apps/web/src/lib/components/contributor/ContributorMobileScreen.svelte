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
  import { getTheme } from '../../design/themes'
  import type { ThemeId } from '../../types/theme'
  import env from '../../config/env'

  interface Props {
    sessionId?: string
  }

  let { sessionId }: Props = $props()

  // Priority: route session id → env override → mock fallback
  const cloudId = sessionId || env.cloudId || session.id

  let cloudTitle = $state(session.title)
  let cloudPrompt = $state(session.prompt)
  let cloudThemeId = $state<ThemeId>('playful')

  const activeTheme = $derived(getTheme(cloudThemeId))

  // Show loading only when we will actually call the API
  let loadingSession = $state(!!env.apiBaseUrl)
  let notFound = $state(false)

  let submitted = $state(false)
  let submittedWords = $state<string[]>([])
  let loading = $state(false)
  let error = $state<string | null>(null)

  onMount(async () => {
    if (!env.apiBaseUrl) {
      loadingSession = false
      return
    }
    const result = await getCloud(cloudId)
    if (result.ok) {
      cloudTitle = result.data.title
      cloudPrompt = result.data.prompt ?? result.data.title
      cloudThemeId = (result.data.themeId as ThemeId) ?? 'playful'
    } else if (result.notFound && sessionId) {
      // Real route ID provided but cloud does not exist — do NOT fall back to mock
      notFound = true
    }
    loadingSession = false
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

<div
  class="relative min-h-dvh flex flex-col items-center justify-center
    px-6 py-8 overflow-x-hidden overflow-y-auto overscroll-none"
  style="padding-bottom: max(2rem, env(safe-area-inset-bottom, 2rem))"
>

  <!-- Atmospheric glow orbs (theme-aware) -->
  <div class="absolute -top-16 -right-16 pointer-events-none" aria-hidden="true">
    <GlowOrb size="md" color={cloudThemeId === 'calm' ? 'primary' : 'accent'} />
  </div>
  <div class="absolute -bottom-16 -left-16 pointer-events-none" aria-hidden="true">
    <GlowOrb size="sm" color={activeTheme.glowColor} />
  </div>

  {#if loadingSession}
    <!-- Loading state -->
    <div class="relative flex flex-col items-center gap-3 text-center animate-fade-in">
      <div class="flex gap-1.5" aria-label="Laster…">
        <span class="w-2 h-2 rounded-full bg-accent animate-dot-pulse" style="animation-delay: 0s;"></span>
        <span class="w-2 h-2 rounded-full bg-primary animate-dot-pulse" style="animation-delay: 0.2s;"></span>
        <span class="w-2 h-2 rounded-full bg-warm animate-dot-pulse" style="animation-delay: 0.4s;"></span>
      </div>
      <p class="text-sm text-muted">Laster økt…</p>
    </div>

  {:else if notFound}
    <!-- Not-found state -->
    <div class="relative w-full max-w-sm flex flex-col items-center gap-6 text-center animate-fade-in">
      <div class="text-5xl select-none" aria-hidden="true">🔍</div>
      <div class="flex flex-col gap-2">
        <h1 class="text-xl font-bold text-text">Økt ikke funnet</h1>
        <p class="text-sm text-muted leading-relaxed">
          Lenken er ugyldig eller økten er avsluttet.<br>
          Sjekk at du har riktig lenke.
        </p>
      </div>
      <a
        href="/"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-pill font-bold text-sm text-muted
          bg-white/6 border border-border hover:bg-white/10 hover:text-text transition-soft"
      >
        ← Tilbake til forsiden
      </a>
    </div>

  {:else}
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
          <p class="text-sm text-center text-warm/90 px-2 leading-relaxed">{error}</p>
        {/if}
        <WordInputList onSubmit={handleSubmit} loading={loading} />
      {/if}

    </div>
  {/if}

</div>
