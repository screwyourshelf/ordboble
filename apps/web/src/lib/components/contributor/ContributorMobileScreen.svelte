<script lang="ts">
  import GlowOrb from '../ui/GlowOrb.svelte'
  import Eyebrow from '../ui/Eyebrow.svelte'
  import GradientText from '../ui/GradientText.svelte'
  import WordInputList from './WordInputList.svelte'
  import SuccessConfirmation from './SuccessConfirmation.svelte'
  import type { ContributorSession } from '../../types/contributor'

  const session: ContributorSession = {
    title: 'Team workshop',
    prompt: 'Hva forbinder du med godt samarbeid?',
    helperText: 'Skriv ett ord om gangen — du kan legge til opptil 3 ord.',
  }

  let submitted = $state(false)
  let submittedWords = $state<string[]>([])

  function handleSubmit(words: string[]) {
    submittedWords = words
    submitted = true
  }

  function handleReset() {
    submittedWords = []
    submitted = false
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
        <GradientText variant="playful">{session.title}</GradientText>
      </Eyebrow>

      <h1 class="text-2xl font-bold text-text leading-snug">
        {session.prompt}
      </h1>

      {#if !submitted}
        <p class="text-sm text-muted">{session.helperText}</p>
      {/if}
    </header>

    <!-- Flow -->
    {#if submitted}
      <SuccessConfirmation words={submittedWords} onReset={handleReset} />
    {:else}
      <WordInputList onSubmit={handleSubmit} />
    {/if}

  </div>
</div>
