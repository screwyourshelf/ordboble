<script lang="ts">
  import PageShell from '../layout/PageShell.svelte'
  import Container from '../layout/Container.svelte'
  import GlowOrb from '../ui/GlowOrb.svelte'
  import Eyebrow from '../ui/Eyebrow.svelte'
  import Badge from '../ui/Badge.svelte'
  import GradientText from '../ui/GradientText.svelte'
  import Card from '../ui/Card.svelte'
  import QRCodePlaceholder from './QRCodePlaceholder.svelte'
  import JoinLinkCard from './JoinLinkCard.svelte'
  import PresentationLaunchCard from './PresentationLaunchCard.svelte'
  import { mockSession as session } from '../../mocks/session'

  interface Props {
    sessionId?: string
  }

  let { sessionId }: Props = $props()
</script>

<PageShell class="relative overflow-hidden">
  <!-- Atmospheric glow orbs -->
  <div
    class="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 pointer-events-none"
    aria-hidden="true"
  >
    <GlowOrb size="lg" color="accent" />
  </div>
  <div
    class="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 pointer-events-none"
    aria-hidden="true"
  >
    <GlowOrb size="md" color="primary" />
  </div>

  <Container variant="wide">
    <div class="relative py-12 sm:py-16 flex flex-col gap-8 animate-fade-in">

      <!-- Header -->
      <header class="flex flex-col gap-4">
        <!-- Eyebrow row -->
        <div class="flex items-center gap-3 flex-wrap">
          <Eyebrow accent>Session aktiv</Eyebrow>
          <Badge variant="success">● {session.participantCount} deltakere</Badge>
          <Badge variant="neutral">Kode: {session.joinCode}</Badge>
        </div>

        <!-- Title -->
        <h1 class="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-text">
          <GradientText>{session.title}</GradientText>
        </h1>

        <!-- Prompt -->
        <p class="text-base sm:text-lg text-text-soft max-w-xl leading-relaxed">
          {session.prompt}
        </p>
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
              <QRCodePlaceholder />
            </div>
          </Card>

          <!-- Join link card -->
          <JoinLinkCard joinUrl={session.joinUrl} />
        </div>

        <!-- Right column: presentation CTA -->
        <PresentationLaunchCard />
      </div>

    </div>
  </Container>
</PageShell>
