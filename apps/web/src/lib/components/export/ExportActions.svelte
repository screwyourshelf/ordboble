<script lang="ts">
  import ExportActionButton from './ExportActionButton.svelte'
  import { exportOptions } from '../../design/export-options'
</script>

<div class="grid grid-cols-2 gap-2">
  {#each exportOptions as option (option.id)}
    <ExportActionButton {option} />
  {/each}
</div>
