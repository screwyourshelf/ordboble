<script lang="ts">
  interface Props {
    label?: string
    placeholder?: string
    helperText?: string
    value?: string
    id?: string
    name?: string
    type?: 'text' | 'email' | 'password' | 'search'
    inputmode?: 'text' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'
    enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'
    autocomplete?: string
    autocapitalize?: string
    autocorrect?: string
    spellcheck?: boolean
  }

  let {
    label,
    placeholder = '',
    helperText,
    value = $bindable(''),
    id,
    name,
    type = 'text',
    inputmode,
    enterkeyhint,
    autocomplete,
    autocapitalize,
    autocorrect,
    spellcheck,
  }: Props = $props()
</script>

<div class="flex flex-col gap-1.5">
  {#if label}
    <label for={id} class="text-sm font-bold text-muted">
      {label}
    </label>
  {/if}

  <input
    {id}
    {name}
    {type}
    {placeholder}
    {inputmode}
    {enterkeyhint}
    {autocomplete}
    {autocapitalize}
    {autocorrect}
    {spellcheck}
    bind:value
    class="w-full px-4 py-3.5 rounded-2xl border border-border bg-white/7 text-text
      placeholder:text-muted outline-none
      focus:border-primary/60 focus:ring-2 focus:ring-primary/20
      transition-colors duration-200"
  />

  {#if helperText}
    <p class="text-xs text-muted">{helperText}</p>
  {/if}
</div>
