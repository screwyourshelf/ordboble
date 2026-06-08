<script lang="ts">
  import Card from '../ui/Card.svelte'
  import TextInput from '../ui/TextInput.svelte'
  import Button from '../ui/Button.svelte'
  import ThemePicker from '../editor/ThemePicker.svelte'
  import ShapePicker from '../editor/ShapePicker.svelte'
  import { createCloud } from '../../services/cloud-api'
  import { mockSession } from '../../mocks/session'
  import type { ThemeId } from '../../types/theme'
  import type { ShapeId } from '../../types/shape'

  let title = $state(mockSession.title)
  let prompt = $state(mockSession.prompt)
  let themeId = $state<ThemeId>('playful')
  let shapeId = $state<ShapeId>('freeform')
  let loading = $state(false)
  let errorMsg = $state<string | null>(null)

  async function handleCreate() {
    if (!title.trim()) return

    loading = true
    errorMsg = null

    const result = await createCloud({
      title: title.trim(),
      prompt: prompt.trim() || undefined,
      language: 'nb',
      liveEnabled: true,
      themeId,
      shapeId,
    })

    loading = false

    if (result.ok) {
      window.location.href = `/share/${result.data.id}`
    } else {
      errorMsg = result.error
    }
  }
</script>

<Card elevated class="w-full max-w-md">
  <div class="flex flex-col gap-5 p-6">
    <div class="flex flex-col gap-1">
      <p class="text-sm font-bold uppercase tracking-widest text-muted">Ny ordboble</p>
      <p class="text-xs text-muted leading-relaxed">
        Fyll inn tema og spørsmål, så er du klar til å dele.
      </p>
    </div>

    <TextInput
      id="session-title"
      label="Tittel"
      placeholder="Team workshop"
      bind:value={title}
    />

    <TextInput
      id="session-prompt"
      label="Spørsmål til deltakerne"
      placeholder="Hva forbinder du med godt samarbeid?"
      bind:value={prompt}
    />

    <!-- Theme + shape pickers -->
    <div class="flex flex-col gap-4 pt-1 border-t border-white/8">
      <ThemePicker selected={themeId} onSelect={(id) => (themeId = id)} />
      <ShapePicker selected={shapeId} onSelect={(id) => (shapeId = id)} />
    </div>

    {#if errorMsg}
      <p class="text-sm text-red-400 leading-snug">{errorMsg}</p>
    {/if}

    <Button
      variant="primary"
      disabled={loading || !title.trim()}
      onclick={handleCreate}
    >
      {#if loading}
        Oppretter…
      {:else}
        Start ordboble ✨
      {/if}
    </Button>
  </div>
</Card>
