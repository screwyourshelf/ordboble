<script lang="ts">
  import type { ExportOption } from '../../types/export'

  interface Props {
    option: ExportOption
  }

  let { option }: Props = $props()
</script>

<button
  disabled={!option.enabled}
  class="flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-bold
    transition-[background-color,border-color,color,opacity] duration-150 w-full text-left
    {option.enabled
      ? 'border-white/16 bg-white/6 text-text-soft cursor-pointer hover:bg-white/10 hover:text-text'
      : 'border-white/8 bg-white/3 text-muted cursor-not-allowed opacity-50 select-none'}"
  title={option.enabled ? option.description : 'Kommer snart'}
  aria-label="{option.label}{option.enabled ? '' : ' — kommer snart'}"
>
  <span class="text-sm leading-none shrink-0" aria-hidden="true">{option.icon}</span>
  <span>{option.label}</span>
</button>
