<script lang="ts">
  import Button from '../ui/Button.svelte'
  import GradientText from '../ui/GradientText.svelte'
</script>

<!--
  Presentation launch CTA card.
  Full-height on desktop (CSS grid stretches it to match left column).
  Centres content vertically via flexbox.
-->
<div
  class="relative overflow-hidden rounded-card border border-border bg-surface
    backdrop-blur-xl shadow-glow flex flex-col items-center justify-center
    text-center p-8 min-h-72"
>
  <!-- Gradient tint overlay -->
  <div
    aria-hidden="true"
    class="absolute inset-0 [background:var(--gradient-button)] opacity-[0.07]
      pointer-events-none"
  ></div>

  <!-- Radial glow -->
  <div
    aria-hidden="true"
    class="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(124,60,255,0.22),transparent_65%)]
      pointer-events-none"
  ></div>

  <!-- Content -->
  <div class="relative flex flex-col items-center gap-6">
    <!-- Icon: expand / fullscreen -->
    <div
      class="w-16 h-16 rounded-full bg-white/8 border border-border-strong
        flex items-center justify-center"
    >
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4"
          stroke="white"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle cx="12" cy="12" r="2.5" fill="white" opacity="0.5" />
      </svg>
    </div>

    <!-- Text -->
    <div class="flex flex-col gap-2">
      <h3 class="text-2xl sm:text-3xl font-black leading-tight">
        <GradientText>Start presentasjon</GradientText>
      </h3>
      <p class="text-sm text-muted leading-relaxed max-w-[220px] mx-auto">
        Åpne ordskyen i fullskjerm.<br />
        Perfekt for storskjerm og projektor.
      </p>
    </div>

    <!-- CTA -->
    <Button variant="primary" size="lg">
      Start nå →
    </Button>

    <p class="text-xs text-muted -mt-2">
      Ingen installasjon nødvendig
    </p>
  </div>
</div>
