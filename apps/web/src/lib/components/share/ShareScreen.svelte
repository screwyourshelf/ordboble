<script lang="ts">
  import { onMount } from 'svelte'
  import PageShell from '../layout/PageShell.svelte'
  import Container from '../layout/Container.svelte'
  import GlowOrb from '../ui/GlowOrb.svelte'
  import Eyebrow from '../ui/Eyebrow.svelte'
  import Badge from '../ui/Badge.svelte'
  import GradientText from '../ui/GradientText.svelte'
  import Card from '../ui/Card.svelte'
  import QRCode from './QRCode.svelte'
  import JoinLinkCard from './JoinLinkCard.svelte'
  import PresentationLaunchCard from './PresentationLaunchCard.svelte'
  import { mockSession } from '../../mocks/session'
  import { getCloud } from '../../services/cloud-api'
  import { getTheme } from '../../design/themes'
  import type { ThemeId } from '../../types/theme'
  import env from '../../config/env'

  interface Props {
    sessionId?: string
  }

  let { sessionId }: Props = $props()

  const effectiveId = sessionId ?? mockSession.id
  const joinUrl = `${window.location.origin}/join/${effectiveId}`

  // When a real sessionId is provided, do NOT pre-fill with mock — prevents misleading display
  // on invalid routes. Prototype mode (no sessionId) keeps mock data as intentional fallback.
  let sessionTitle = $state(sessionId ? '' : mockSession.title)
  let sessionPrompt = $state(sessionId ? '' : mockSession.prompt)
  let sessionJoinCode = $state(sessionId ? '' : mockSession.joinCode)
  let sessionThemeId = $state<ThemeId>('playful')

  const activeTheme = $derived(getTheme(sessionThemeId))

  let loadingSession = $state(sessionId != null && !!env.apiBaseUrl)
  let notFound = $state(false)

  onMount(async () => {
    if (!env.apiBaseUrl || !sessionId) return
    const result = await getCloud(effectiveId)
    if (result.ok) {
      sessionTitle = result.data.title
      sessionPrompt = result.data.prompt ?? result.data.title
      sessionJoinCode = result.data.joinCode
      sessionThemeId = (result.data.themeId as ThemeId) ?? 'playful'
    } else if (result.notFound) {
      notFound = true
    }
    loadingSession = false
  })
</script>

<PageShell class="relative overflow-hidden">
  <!-- Atmospheric glow orbs (theme-aware) -->
  <div
    class="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 pointer-events-none"
    aria-hidden="true"
  >
    <GlowOrb size="lg" color={sessionThemeId === 'calm' ? 'primary' : 'accent'} />
  </div>
  <div
    class="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 pointer-events-none"
    aria-hidden="true"
  >
    <GlowOrb size="md" color={activeTheme.glowColor} />
  </div>

  <Container variant="wide">

    {#if notFound}
      <!-- ── Not-found state ── -->
      <div class="relative py-32 flex flex-col items-center gap-6 text-center animate-fade-in">
        <div class="text-5xl select-none" aria-hidden="true">🔍</div>
        <div class="flex flex-col gap-2">
          <h1 class="text-2xl font-bold text-text">Vi fant ikke denne økten</h1>
          <p class="text-base text-muted leading-relaxed max-w-sm">
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
      <!-- ── Main content ── -->
      <div class="relative py-12 sm:py-16 flex flex-col gap-8 animate-fade-in">

        <!-- Header -->
        <header class="flex flex-col gap-4">
          <!-- Eyebrow row -->
          <div class="flex items-center gap-3 flex-wrap">
            <Eyebrow accent>Session aktiv</Eyebrow>
            {#if loadingSession}
              <div class="h-6 w-24 bg-white/10 rounded-full animate-pulse" aria-hidden="true"></div>
            {:else}
              <Badge variant="neutral">Kode: {sessionJoinCode}</Badge>
            {/if}
          </div>

          <!-- Title -->
          {#if loadingSession}
            <div class="h-9 sm:h-11 w-56 bg-white/10 rounded-xl animate-pulse" aria-hidden="true"></div>
          {:else}
            <h1 class="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-text">
              <GradientText>{sessionTitle}</GradientText>
            </h1>
          {/if}

          <!-- Prompt -->
          {#if loadingSession}
            <div class="h-5 w-80 max-w-full bg-white/8 rounded-lg animate-pulse" aria-hidden="true"></div>
          {:else}
            <p class="text-base sm:text-lg text-text-soft max-w-xl leading-relaxed">
              {sessionPrompt}
            </p>
          {/if}
        </header>

        <!-- Main content grid -->
        <!--
          Mobile: single column (QR → join link → presentation CTA)
          Desktop: two columns — left: invite info; right: presentation CTA (full height)
        -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <!-- Left column: invite section -->
          <div class="flex flex-col gap-4">

            <!-- QR card -->
            <Card elevated>
              <div class="flex flex-col items-center gap-2 px-6 pt-8 pb-6">
                <QRCode url={joinUrl} />
              </div>
            </Card>

            <!-- Join link card -->
            <JoinLinkCard joinUrl={joinUrl} />
          </div>

          <!-- Right column: presentation CTA -->
          <PresentationLaunchCard />
        </div>

      </div>
    {/if}

  </Container>
</PageShell>
