<script lang="ts">
  import type { WordEntry } from '../../types/word-cloud'
  import WordToken from './WordToken.svelte'

  interface Props {
    words: WordEntry[]
    class?: string
  }

  let { words, class: className = '' }: Props = $props()

  // Depth 1 = foreground (highest z), depth 4 = background (lowest z)
  const depthZMap: Record<number, string> = {
    1: 'z-30',
    2: 'z-20',
    3: 'z-10',
    4: 'z-0',
  }
</script>

<div class="relative w-full h-full {className}">
  {#each words as entry (entry.id ?? entry.word)}
    <div
      class="absolute {depthZMap[entry.depth ?? 1]}"
      style="left: {entry.x}%; top: {entry.y}%; transform: translate(-50%, -50%)"
    >
      <WordToken
        word={entry.word}
        size={entry.size}
        color={entry.color}
        variant={entry.variant}
        depth={entry.depth}
        glowIntensity={entry.glowIntensity}
        rotation={entry.rotation ?? 0}
        gradient={entry.gradient ?? false}
        glow={entry.glow ?? false}
        delay={entry.delay ?? 0}
      />
    </div>
  {/each}
</div>
