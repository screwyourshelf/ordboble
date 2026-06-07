<script lang="ts">
  import Button from './lib/components/ui/Button.svelte'
  import Card from './lib/components/ui/Card.svelte'
  import Badge from './lib/components/ui/Badge.svelte'
  import TextInput from './lib/components/ui/TextInput.svelte'

  let inputValue = $state('')
</script>

<div class="min-h-screen p-8">
  <div class="max-w-2xl mx-auto space-y-6">

    <header class="mb-8">
      <h1 class="text-3xl font-black tracking-tight text-text">
        Ordboble
        <span class="text-base font-semibold text-muted ml-2">component preview</span>
      </h1>
    </header>

    <!-- Buttons -->
    <Card>
      <div class="p-6 space-y-4">
        <p class="text-xs font-bold text-muted uppercase tracking-widest">Buttons — variants</p>
        <div class="flex flex-wrap gap-3">
          <Button variant="primary">Create Cloud ✨</Button>
          <Button variant="secondary">See demo</Button>
          <Button variant="ghost">Cancel</Button>
        </div>
        <p class="text-xs font-bold text-muted uppercase tracking-widest">Buttons — sizes</p>
        <div class="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
        <p class="text-xs font-bold text-muted uppercase tracking-widest">Buttons — disabled</p>
        <div class="flex flex-wrap gap-3">
          <Button variant="primary" disabled>Disabled primary</Button>
          <Button variant="secondary" disabled>Disabled secondary</Button>
        </div>
      </div>
    </Card>

    <!-- Badges -->
    <Card>
      <div class="p-6 space-y-4">
        <p class="text-xs font-bold text-muted uppercase tracking-widest">Badges</p>
        <div class="flex flex-wrap gap-3 items-center">
          <Badge>Neutral</Badge>
          <Badge variant="accent">✨ Live</Badge>
          <Badge variant="success">● Active</Badge>
        </div>
      </div>
    </Card>

    <!-- TextInput -->
    <Card>
      <div class="p-6 space-y-4">
        <p class="text-xs font-bold text-muted uppercase tracking-widest">TextInput</p>
        <TextInput
          id="question"
          label="Question"
          placeholder="What inspires you?"
          helperText="This will be shown to contributors."
          bind:value={inputValue}
        />
        {#if inputValue}
          <p class="text-xs text-text-soft">Value: <span class="text-primary font-bold">{inputValue}</span></p>
        {/if}
      </div>
    </Card>

    <!-- Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card>
        <div class="p-6">
          <p class="text-xs font-bold text-muted uppercase tracking-widest mb-2">Card</p>
          <p class="text-text-soft text-sm">Default — soft shadow</p>
        </div>
      </Card>
      <Card elevated>
        <div class="p-6">
          <p class="text-xs font-bold text-muted uppercase tracking-widest mb-2">Card elevated</p>
          <p class="text-text-soft text-sm">Elevated — glow shadow</p>
        </div>
      </Card>
    </div>

  </div>
</div>
