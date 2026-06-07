<script lang="ts">
  import type { ScreenId } from '../types/app'
  import ScreenSwitcher from './ScreenSwitcher.svelte'
  import PrototypeNav from './PrototypeNav.svelte'
  import { parseRoute } from './router'

  // Parse the URL once on initial load to resolve screen and session
  const initialRoute = parseRoute(window.location.pathname)

  let currentScreen: ScreenId = $state(initialRoute.screen)
  let routeSessionId: string | null = $state(initialRoute.sessionId)

  function navigateTo(id: ScreenId) {
    currentScreen = id
  }
</script>

<!--
  AppShell — app composition root.
  Owns screen state and renders the active screen + prototype nav.
  Screen and session are initialized from URL on first load.
-->
<div class="relative">
  <ScreenSwitcher screen={currentScreen} sessionId={routeSessionId} />
  <PrototypeNav current={currentScreen} onNavigate={navigateTo} />
</div>
