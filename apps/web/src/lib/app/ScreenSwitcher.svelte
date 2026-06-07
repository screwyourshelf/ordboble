<script lang="ts">
  import type { ScreenId } from '../types/app'
  import WordCloudHero from '../components/word-cloud/WordCloudHero.svelte'
  import ContributorMobileScreen from '../components/contributor/ContributorMobileScreen.svelte'
  import ShareScreen from '../components/share/ShareScreen.svelte'
  import PresentationModeScreen from '../components/presentation/PresentationModeScreen.svelte'
  import EditorScreen from '../components/editor/EditorScreen.svelte'

  interface Props {
    screen: ScreenId
    sessionId?: string | null
  }

  let { screen, sessionId = null }: Props = $props()
</script>

{#if screen === 'landing'}
  <WordCloudHero />
{:else if screen === 'contributor'}
  <ContributorMobileScreen sessionId={sessionId ?? undefined} />
{:else if screen === 'share'}
  <ShareScreen sessionId={sessionId ?? undefined} />
{:else if screen === 'presentation'}
  <PresentationModeScreen sessionId={sessionId ?? undefined} />
{:else if screen === 'editor'}
  <EditorScreen sessionId={sessionId ?? undefined} />
{/if}
