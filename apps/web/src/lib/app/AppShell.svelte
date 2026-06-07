<script lang="ts">
  import type { ScreenId } from '../types/app'
  import ScreenSwitcher from './ScreenSwitcher.svelte'
  import PrototypeNav from './PrototypeNav.svelte'

  // Active screen state — local, no routing, no stores
  let currentScreen: ScreenId = $state('landing')

  function navigateTo(id: ScreenId) {
    currentScreen = id
  }
</script>

<!--
  AppShell — app composition root.
  Owns screen state and renders the active screen + prototype nav.
-->
<div class="relative">
  <ScreenSwitcher screen={currentScreen} />
  <PrototypeNav current={currentScreen} onNavigate={navigateTo} />
</div>
