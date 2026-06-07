export type ThemeId = 'playful' | 'calm' | 'dark' | 'celebration'

export interface Theme {
  id: ThemeId
  label: string
  description: string
  /** CSS gradient string for the swatch chip in pickers */
  swatch: string
  /** Hex color for the selection ring/glow in pickers */
  ring: string
  /** CSS background value for the preview area */
  previewBg: string
  /** GlowOrb color token for the preview atmosphere */
  glowColor: 'primary' | 'accent' | 'warm'
}
