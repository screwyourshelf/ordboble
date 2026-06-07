export type TokenSize        = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type TokenColor       = 'primary' | 'accent' | 'warm' | 'success' | 'text' | 'soft'
export type TokenVariant     = 'hero' | 'solid' | 'gradient' | 'subtle' | 'ghost'
export type TokenDepth       = 1 | 2 | 3 | 4
export type GlowIntensity    = 'none' | 'soft' | 'medium' | 'strong'

export interface WordEntry {
  /** Optional stable ID — used as {#each} key when present. */
  id?: string
  word: string
  size?: TokenSize
  color?: TokenColor
  variant?: TokenVariant
  depth?: TokenDepth
  glowIntensity?: GlowIntensity
  rotation?: number
  /** @deprecated use variant instead */
  gradient?: boolean
  /** @deprecated use glowIntensity instead */
  glow?: boolean
  x: number
  y: number
  delay?: number
}

export type CompositionId = 'hero' | 'presentation' | 'compact'

export interface WordCloudComposition {
  id: CompositionId
  label: string
  words: WordEntry[]
}
