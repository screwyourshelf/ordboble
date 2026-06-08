<script lang="ts">
  import Button from '../ui/Button.svelte'
  import TextInput from '../ui/TextInput.svelte'
  import Card from '../ui/Card.svelte'

  interface Props {
    onSubmit: (words: string[]) => void
    loading?: boolean
  }

  let { onSubmit, loading = false }: Props = $props()

  const MAX_WORDS = 3

  let words = $state<string[]>([''])
  let cardEl = $state<HTMLElement | null>(null)

  function getInputs(): HTMLInputElement[] {
    if (!cardEl) return []
    return Array.from(cardEl.querySelectorAll('input[type="text"], input:not([type])'))
  }

  function addWord() {
    if (words.length < MAX_WORDS) {
      words = [...words, '']
      // Focus the new input after Svelte renders it
      setTimeout(() => {
        const inputs = getInputs()
        inputs[inputs.length - 1]?.focus()
      }, 30)
    }
  }

  function handleSubmit() {
    const filled = words.map((w) => w.trim()).filter((w) => w.length > 0)
    if (filled.length === 0) return
    onSubmit(filled)
  }

  /** Keyboard progression: Enter on non-last → focus next; Enter on last → submit */
  function handleCardKeydown(e: KeyboardEvent) {
    if (e.key !== 'Enter') return
    const target = e.target as HTMLElement
    if (target.tagName !== 'INPUT') return
    e.preventDefault()
    const inputs = getInputs()
    const idx = inputs.indexOf(target as HTMLInputElement)
    if (idx === -1) return
    const isLast = idx === inputs.length - 1
    if (!isLast) {
      inputs[idx + 1]?.focus()
    } else if (canSubmit && !loading) {
      handleSubmit()
    }
  }

  let canAddMore = $derived(words.length < MAX_WORDS)
  let canSubmit = $derived(words.some((w) => w.trim().length > 0))
</script>

<div class="flex flex-col gap-4">
  <Card>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="flex flex-col gap-3 p-5"
      bind:this={cardEl}
      onkeydown={handleCardKeydown}
    >
      {#each words as _, i}
        <TextInput
          placeholder="Skriv et ord…"
          bind:value={words[i]}
          inputmode="text"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="words"
          spellcheck={false}
          enterkeyhint={i < words.length - 1 ? 'next' : 'send'}
        />
      {/each}

      {#if canAddMore}
        <button
          type="button"
          onclick={addWord}
          class="flex items-center gap-2 text-sm font-bold text-primary hover:text-accent
            transition-colors duration-200 self-start py-3 px-1 min-h-[44px]"
          aria-label="Legg til et ord til"
        >
          <span class="text-xl leading-none select-none" aria-hidden="true">+</span>
          Legg til et ord til
        </button>
      {/if}
    </div>
  </Card>

  <Button variant="primary" size="lg" disabled={!canSubmit || loading} onclick={handleSubmit}>
    {#if loading}
      <svg class="animate-spin w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
      </svg>
      Sender inn…
    {:else}
      Send inn ordene mine
    {/if}
  </Button>
</div>
