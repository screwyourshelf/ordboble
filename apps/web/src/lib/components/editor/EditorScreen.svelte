<script lang="ts">
  import GlowOrb from '../ui/GlowOrb.svelte'
  import GradientText from '../ui/GradientText.svelte'
  import Eyebrow from '../ui/Eyebrow.svelte'
  import Card from '../ui/Card.svelte'
  import EditorPreview from './EditorPreview.svelte'
  import ThemePicker from './ThemePicker.svelte'
  import ShapePicker from './ShapePicker.svelte'
  import StyleControls from './StyleControls.svelte'
  import ExportPanel from './ExportPanel.svelte'
  import type { EditorState, EditorTheme, EditorShape, EditorStyle } from '../../types/editor'

  // All editor state lives here — no stores, no persistence
  let state: EditorState = $state({
    theme: 'playful',
    shape: 'freeform',
    style: {
      density: 'balanced',
      wordSize: 'medium',
      glow: 'soft',
    },
  })

  function selectTheme(theme: EditorTheme) {
    state.theme = theme
  }

  function selectShape(shape: EditorShape) {
    state.shape = shape
  }

  function updateStyle(partial: Partial<EditorStyle>) {
    state.style = { ...state.style, ...partial }
  }

  // Fake static session data
  const sessionTitle = 'Team workshop'
  const sessionPrompt = 'Hva forbinder du med godt samarbeid?'
</script>

<!--
  EditorScreen — host-facing word cloud customization studio.
  Frontend-only, fake static data, local state only.
-->
<div
  class="min-h-screen w-full overflow-hidden relative"
  style="background: var(--gradient-hero)"
>
  <!-- Atmospheric glows -->
  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
    <div class="absolute -top-20 right-[-4%] opacity-40">
      <GlowOrb size="lg" color="primary" />
    </div>
    <div class="absolute bottom-[-4rem] left-[4%] opacity-30">
      <GlowOrb size="md" color="accent" />
    </div>
  </div>

  <!-- ── Main layout ── -->
  <div class="relative z-10 flex flex-col h-screen max-h-screen overflow-hidden">

    <!-- ── Top header ── -->
    <header class="shrink-0 px-6 sm:px-8 pt-6 pb-4 flex items-center justify-between gap-4">
      <div class="flex flex-col gap-1">
        <Eyebrow accent>Tilpass ordboble</Eyebrow>
        <h1 class="text-xl sm:text-2xl font-black tracking-tight text-text leading-tight">
          <GradientText>{sessionTitle}</GradientText>
        </h1>
        <p class="text-sm text-muted leading-snug hidden sm:block">{sessionPrompt}</p>
      </div>

      <!-- Wordmark -->
      <span
        class="text-sm font-black tracking-tight shrink-0"
        style="background: var(--gradient-logo); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"
      >ordboble</span>
    </header>

    <!-- ── Content: preview + panel ── -->
    <div class="flex-1 overflow-hidden px-4 sm:px-6 pb-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 min-h-0">

      <!-- ── Preview (dominant) ── -->
      <div class="relative min-h-[280px] lg:min-h-0">
        <EditorPreview theme={state.theme} shape={state.shape} />
      </div>

      <!-- ── Side panel ── -->
      <div class="lg:overflow-y-auto overflow-x-hidden">
        <Card class="h-full lg:h-auto overflow-y-auto">
          <div class="p-5 flex flex-col gap-6">

            <ThemePicker
              selected={state.theme}
              onSelect={selectTheme}
            />

            <!-- Divider -->
            <div class="border-t border-white/8"></div>

            <ShapePicker
              selected={state.shape}
              onSelect={selectShape}
            />

            <!-- Divider -->
            <div class="border-t border-white/8"></div>

            <StyleControls
              style={state.style}
              onStyleChange={updateStyle}
            />

            <!-- Divider -->
            <div class="border-t border-white/8"></div>

            <ExportPanel />

          </div>
        </Card>
      </div>

    </div>
  </div>
</div>
