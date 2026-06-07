<script lang="ts">
  import type { WordEntry } from '../../types/word-cloud'
  import WordToken from './WordToken.svelte'

  interface Props {
    words: WordEntry[]
    class?: string
  }

  let { words, class: className = '' }: Props = $props()
</script>

<div class="relative w-full h-full {className}">
  {#each words as entry (entry.word)}
    <div
      class="absolute"
      style="left: {entry.x}%; top: {entry.y}%; transform: translate(-50%, -50%)"
    >
      <WordToken
        word={entry.word}
        size={entry.size}
        color={entry.color}
        rotation={entry.rotation ?? 0}
        glow={entry.glow ?? false}
        gradient={entry.gradient ?? false}
        delay={entry.delay ?? 0}
      />
    </div>
  {/each}
</div>
