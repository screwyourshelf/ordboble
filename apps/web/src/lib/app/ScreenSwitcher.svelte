<script lang="ts">
  import type { ScreenId } from '../types/app'
  import WordCloudHero from '../components/word-cloud/WordCloudHero.svelte'
  import ContributorMobileScreen from '../components/contributor/ContributorMobileScreen.svelte'
  import ShareScreen from '../components/share/ShareScreen.svelte'
  import PresentationModeScreen from '../components/presentation/PresentationModeScreen.svelte'
  import EditorScreen from '../components/editor/EditorScreen.svelte'

  interface Props {
    screen: ScreenId
  }

  let { screen }: Props = $props()
</script>

{#if screen === 'landing'}
  <WordCloudHero />
{:else if screen === 'contributor'}
  <ContributorMobileScreen />
{:else if screen === 'share'}
  <ShareScreen />
{:else if screen === 'presentation'}
  <PresentationModeScreen />
{:else if screen === 'editor'}
  <EditorScreen />
{/if}
