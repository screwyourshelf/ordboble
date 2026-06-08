<script lang="ts">
  import QRCodeLib from 'qrcode'

  interface Props {
    url: string
  }

  let { url }: Props = $props()

  let dataUrl = $state<string | null>(null)

  $effect(() => {
    QRCodeLib.toDataURL(url, {
      width: 168,
      margin: 1,
      color: { dark: '#070816', light: '#ffffff' },
    })
      .then((u) => {
        dataUrl = u
      })
      .catch(() => {
        dataUrl = null
      })
  })
</script>

<div class="flex flex-col items-center gap-4">
  <div class="bg-white p-3 rounded-2xl shadow-lg">
    {#if dataUrl}
      <img
        src={dataUrl}
        alt="QR-kode for å bli med"
        width="168"
        height="168"
        class="block"
      />
    {:else}
      <!-- Shimmer placeholder matching real QR dimensions -->
      <div
        class="w-[168px] h-[168px] rounded-xl bg-gray-100 animate-pulse"
        aria-label="Laster QR-kode…"
      ></div>
    {/if}
  </div>

  <div class="text-center">
    <p class="text-sm font-semibold text-text-soft">Scan for å bli med</p>
    <p class="text-xs text-muted mt-0.5">Pek telefonen mot QR-koden</p>
  </div>
</div>
