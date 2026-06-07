<script lang="ts">
  import QRCodePlaceholder from '../share/QRCodePlaceholder.svelte'

  interface Props {
    joinCode: string
    joinUrl: string
  }

  let { joinCode, joinUrl }: Props = $props()
</script>

<div
  class="flex flex-col items-center gap-3 px-5 py-5 rounded-[1.5rem]
    bg-white/5 border border-white/10 backdrop-blur-md text-center"
>
  <!-- Compact QR -->
  <div class="scale-[0.6] origin-top -mb-8">
    <QRCodePlaceholder />
  </div>

  <!-- Join code -->
  <div class="flex flex-col items-center gap-1">
    <p class="text-xs text-muted font-semibold uppercase tracking-widest">Bli med på</p>
    <p class="text-lg font-black text-text tracking-widest font-mono">{joinUrl.replace('https://', '')}</p>
    <div
      class="mt-1 px-4 py-1.5 rounded-pill bg-accent/15 border border-accent/30 text-accent
        font-black text-2xl tracking-[0.18em] font-mono"
    >
      {joinCode}
    </div>
  </div>
</div>
