<script lang="ts">
  import Button from './lib/components/ui/Button.svelte'
  import Card from './lib/components/ui/Card.svelte'
  import Badge from './lib/components/ui/Badge.svelte'
  import TextInput from './lib/components/ui/TextInput.svelte'
  import DisplayTitle from './lib/components/ui/DisplayTitle.svelte'
  import SectionTitle from './lib/components/ui/SectionTitle.svelte'
  import BodyText from './lib/components/ui/BodyText.svelte'
  import Eyebrow from './lib/components/ui/Eyebrow.svelte'
  import GradientText from './lib/components/ui/GradientText.svelte'
  import GlowOrb from './lib/components/ui/GlowOrb.svelte'

  import PageShell from './lib/components/layout/PageShell.svelte'
  import Container from './lib/components/layout/Container.svelte'
  import Section from './lib/components/layout/Section.svelte'
  import SplitHeroLayout from './lib/components/layout/SplitHeroLayout.svelte'
  import FloatingToolbar from './lib/components/layout/FloatingToolbar.svelte'
  import PreviewFrame from './lib/components/layout/PreviewFrame.svelte'

  let inputValue = $state('')
</script>

<PageShell>

  <!-- ── Hero Section ── -->
  <Section spacing="spacious">
    <Container variant="wide">
      <SplitHeroLayout>
        {#snippet content()}
          <div class="flex flex-col gap-5">
            <div class="flex items-center gap-2">
              <Badge variant="accent">✨ Live</Badge>
              <Badge variant="success">● Active</Badge>
            </div>
            <h1 class="text-5xl font-black tracking-tight leading-tight [background:var(--gradient-logo)] bg-clip-text text-transparent">
              Ordboble
            </h1>
            <p class="text-xl text-text-soft leading-relaxed max-w-sm">
              A playful collaborative word cloud — share a link, collect words, present live.
            </p>
            <div class="flex flex-wrap gap-3">
              <Button variant="primary" size="lg">Create Cloud ✨</Button>
              <Button variant="secondary" size="lg">See demo</Button>
            </div>
          </div>
        {/snippet}

        {#snippet visual()}
          <PreviewFrame title="Live word cloud" eyebrow="Preview">
            <!-- Mock word cloud placeholder -->
            <div class="relative h-64 rounded-2xl overflow-hidden flex items-center justify-center
              [background:radial-gradient(circle_at_50%_50%,rgba(124,60,255,0.18),transparent_70%)]">
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-5xl font-black text-primary opacity-90" style="transform: rotate(-8deg)">ordboble</span>
              </div>
              <div class="absolute top-6 left-8 text-accent font-bold text-xl opacity-70" style="transform: rotate(5deg)">kul</div>
              <div class="absolute top-10 right-10 text-warm font-bold text-2xl opacity-60" style="transform: rotate(-12deg)">moro</div>
              <div class="absolute bottom-8 left-12 text-success font-bold text-lg opacity-65" style="transform: rotate(3deg)">kreativ</div>
              <div class="absolute bottom-12 right-8 text-text-soft font-bold text-base opacity-50" style="transform: rotate(-6deg)">deling</div>
            </div>
          </PreviewFrame>
        {/snippet}
      </SplitHeroLayout>
    </Container>
  </Section>

  <!-- ── FloatingToolbar Demo ── -->
  <Section spacing="compact">
    <Container variant="wide">
      <div class="flex flex-col gap-3">
        <p class="text-xs font-bold text-muted uppercase tracking-widest">FloatingToolbar</p>
        <FloatingToolbar>
          <Button variant="primary" size="sm">Share link</Button>
          <Button variant="secondary" size="sm">QR kode</Button>
          <Button variant="ghost" size="sm">Innstillinger</Button>
          <Button variant="ghost" size="sm">Avslutt</Button>
        </FloatingToolbar>
      </div>
    </Container>
  </Section>

  <!-- ── UI Primitives Preview ── -->
  <Section spacing="default">
    <Container variant="default">
      <div class="space-y-8">

        <header>
          <p class="text-xs font-bold text-muted uppercase tracking-widest mb-2">Layout — Container widths</p>
          <div class="flex flex-col gap-3">
            <div class="h-10 rounded-2xl border border-border/50 bg-white/4 flex items-center px-4">
              <span class="text-xs text-muted">narrow — max-w-xl</span>
            </div>
            <div class="h-10 rounded-2xl border border-border/50 bg-white/4 flex items-center px-4 max-w-xl mx-auto w-full">
              <span class="text-xs text-muted">← max-w-xl →</span>
            </div>
          </div>
        </header>

        <!-- Buttons -->
        <Card>
          <div class="p-6 space-y-4">
            <p class="text-xs font-bold text-muted uppercase tracking-widest">Buttons — variants</p>
            <div class="flex flex-wrap gap-3">
              <Button variant="primary">Create Cloud ✨</Button>
              <Button variant="secondary">See demo</Button>
              <Button variant="ghost">Cancel</Button>
            </div>
            <p class="text-xs font-bold text-muted uppercase tracking-widest">Buttons — sizes</p>
            <div class="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
          </div>
        </Card>

        <!-- Badges + TextInput -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <div class="p-6 space-y-4">
              <p class="text-xs font-bold text-muted uppercase tracking-widest">Badges</p>
              <div class="flex flex-wrap gap-3 items-center">
                <Badge>Neutral</Badge>
                <Badge variant="accent">✨ Live</Badge>
                <Badge variant="success">● Active</Badge>
              </div>
            </div>
          </Card>
          <Card>
            <div class="p-6 space-y-4">
              <p class="text-xs font-bold text-muted uppercase tracking-widest">TextInput</p>
              <TextInput
                id="question"
                label="Question"
                placeholder="What inspires you?"
                helperText="This will be shown to contributors."
                bind:value={inputValue}
              />
              {#if inputValue}
                <p class="text-xs text-text-soft">Value: <span class="text-primary font-bold">{inputValue}</span></p>
              {/if}
            </div>
          </Card>
        </div>

        <!-- Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <div class="p-6">
              <p class="text-xs font-bold text-muted uppercase tracking-widest mb-2">Card</p>
              <p class="text-text-soft text-sm">Default — soft shadow</p>
            </div>
          </Card>
          <Card elevated>
            <div class="p-6">
              <p class="text-xs font-bold text-muted uppercase tracking-widest mb-2">Card elevated</p>
              <p class="text-text-soft text-sm">Elevated — glow shadow</p>
            </div>
          </Card>
        </div>

      </div>
    </Container>
  </Section>

  <!-- ── Typography Preview ── -->
  <Section spacing="default">
    <Container variant="default">
      <div class="space-y-10">

        <header>
          <Eyebrow>Typography Foundation</Eyebrow>
        </header>

        <!-- DisplayTitle -->
        <Card>
          <div class="p-8 space-y-6">
            <Eyebrow>DisplayTitle</Eyebrow>
            <div class="space-y-4">
              <DisplayTitle>The future of words</DisplayTitle>
              <DisplayTitle gradient>
                <GradientText variant="playful">Ordboble</GradientText>
              </DisplayTitle>
              <DisplayTitle centered>Centered Title</DisplayTitle>
            </div>
          </div>
        </Card>

        <!-- SectionTitle + Eyebrow -->
        <Card>
          <div class="p-8 space-y-6">
            <Eyebrow>SectionTitle + Eyebrow</Eyebrow>
            <div class="space-y-4">
              <div class="space-y-1">
                <Eyebrow>Section label</Eyebrow>
                <SectionTitle>Create your cloud</SectionTitle>
              </div>
              <div class="space-y-1">
                <Eyebrow accent>✨ New</Eyebrow>
                <SectionTitle compact>Compact section title</SectionTitle>
              </div>
            </div>
          </div>
        </Card>

        <!-- BodyText -->
        <Card>
          <div class="p-8 space-y-4">
            <Eyebrow>BodyText</Eyebrow>
            <BodyText>
              Share a link, collect words from your audience, and watch the cloud grow in real time.
              Perfect for workshops, classrooms and presentations.
            </BodyText>
            <BodyText muted>
              Muted variant — used for secondary descriptions, helper text and supporting content.
            </BodyText>
          </div>
        </Card>

        <!-- GradientText -->
        <Card>
          <div class="p-8 space-y-4">
            <Eyebrow>GradientText</Eyebrow>
            <p class="text-4xl font-black tracking-tight">
              <GradientText variant="playful">Playful gradient</GradientText>
            </p>
            <p class="text-4xl font-black tracking-tight">
              <GradientText variant="calm">Calm gradient</GradientText>
            </p>
          </div>
        </Card>

      </div>
    </Container>
  </Section>

  <!-- ── Motion Preview ── -->
  <Section spacing="default">
    <Container variant="default">
      <div class="space-y-10">

        <header>
          <Eyebrow>Motion Foundation</Eyebrow>
        </header>

        <!-- GlowOrbs + float-subtle -->
        <Card elevated>
          <div class="p-8 space-y-4">
            <Eyebrow>GlowOrb — float-subtle</Eyebrow>
            <div class="relative flex items-center justify-center gap-8 h-48 overflow-hidden rounded-2xl
              [background:radial-gradient(circle_at_50%_50%,rgba(17,20,42,0.6),transparent)]">
              <GlowOrb size="md" color="primary" />
              <GlowOrb size="sm" color="accent" />
              <GlowOrb size="sm" color="warm" />
            </div>
            <BodyText muted>Decorative orbs with float-subtle animation. Used as ambient background elements.</BodyText>
          </div>
        </Card>

        <!-- Motion utilities -->
        <Card>
          <div class="p-8 space-y-4">
            <Eyebrow>Motion utilities</Eyebrow>
            <div class="flex flex-wrap gap-4">
              <div class="px-6 py-3 rounded-xl bg-white/8 border border-border text-text-soft text-sm font-medium hover-lift cursor-pointer select-none">
                hover-lift
              </div>
              <div class="px-6 py-3 rounded-xl bg-white/8 border border-border text-text-soft text-sm font-medium hover-glow cursor-pointer select-none">
                hover-glow
              </div>
              <div class="px-6 py-3 rounded-xl bg-white/8 border border-border text-text-soft text-sm font-medium transition-soft hover:bg-white/14 cursor-pointer select-none">
                transition-soft
              </div>
              <div class="px-6 py-3 rounded-xl bg-white/8 border border-border text-text-soft text-sm font-medium animate-fade-in cursor-default select-none">
                animate-fade-in
              </div>
            </div>
            <BodyText muted>Hover the tiles to preview motion utilities.</BodyText>
          </div>
        </Card>

      </div>
    </Container>
  </Section>

</PageShell>
