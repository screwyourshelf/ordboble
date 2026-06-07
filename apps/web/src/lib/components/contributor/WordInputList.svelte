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

  function addWord() {
    if (words.length < MAX_WORDS) {
      words = [...words, '']
    }
  }

  function handleSubmit() {
    const filled = words.map((w) => w.trim()).filter((w) => w.length > 0)
    if (filled.length === 0) return
    onSubmit(filled)
  }

  let canAddMore = $derived(words.length < MAX_WORDS)
  let canSubmit = $derived(words.some((w) => w.trim().length > 0))
</script>

<div class="flex flex-col gap-4">
  <Card>
    <div class="flex flex-col gap-4 p-5">
      {#each words as _, i}
        <TextInput
          placeholder="Skriv et ord…"
          bind:value={words[i]}
        />
      {/each}

      {#if canAddMore}
        <button
          type="button"
          onclick={addWord}
          class="flex items-center gap-2 text-sm font-bold text-primary hover:text-accent transition-colors duration-200 self-start py-1"
        >
          <span class="text-xl leading-none">+</span>
          Legg til et ord til
        </button>
      {/if}
    </div>
  </Card>

  <Button variant="primary" size="lg" disabled={!canSubmit || loading} onclick={handleSubmit}>
    {loading ? 'Sender inn…' : 'Send inn ordene mine'}
  </Button>
</div>
