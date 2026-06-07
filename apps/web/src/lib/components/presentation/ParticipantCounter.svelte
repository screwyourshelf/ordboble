<script lang="ts">
  interface Props {
    count: number
  }

  let { count }: Props = $props()
</script>

<div class="flex items-center gap-2.5">
  <!-- Pulsing live dot -->
  <span class="relative flex h-2.5 w-2.5" aria-hidden="true">
    <span
      class="absolute inline-flex h-full w-full rounded-full bg-success opacity-75"
      style="animation: ping 1.4s cubic-bezier(0,0,0.2,1) infinite"
    ></span>
    <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
  </span>

  <span class="text-sm font-bold text-text-soft tabular-nums">
    <span class="text-text">{count}</span> deltakere
  </span>
</div>

<style>
  @keyframes ping {
    75%, 100% {
      transform: scale(2);
      opacity: 0;
    }
  }
</style>
