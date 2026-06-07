<script lang="ts">
  import Card from '../ui/Card.svelte'
  import Badge from '../ui/Badge.svelte'
  import Button from '../ui/Button.svelte'

  interface Props {
    words: string[]
    onReset: () => void
  }

  let { words, onReset }: Props = $props()
</script>

<div class="flex flex-col gap-5 text-center" style="animation: fade-in 0.4s ease forwards;">
  <div class="text-6xl select-none" aria-hidden="true">🎉</div>

  <Card elevated>
    <div class="flex flex-col gap-4 p-6">
      <p class="text-xl font-bold text-text">Takk for bidragene dine!</p>
      <p class="text-sm text-muted">Du sendte inn disse ordene:</p>

      <div class="flex flex-wrap gap-2 justify-center">
        {#each words as word}
          <Badge variant="success">{word}</Badge>
        {/each}
      </div>

      <p class="text-xs text-muted mt-1">
        Ordene dine er nå en del av ordskyen ✨
      </p>
    </div>
  </Card>

  <Button variant="ghost" size="md" onclick={onReset}>
    Legg til flere ord
  </Button>
</div>
