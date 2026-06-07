export type EditorTheme = 'playful' | 'calm' | 'dark' | 'celebration'

export type EditorShape = 'freeform' | 'circle' | 'heart' | 'star'

export type EditorDensity = 'compact' | 'balanced' | 'airy'

export type EditorWordSize = 'small' | 'medium' | 'large'

export type EditorGlow = 'off' | 'soft' | 'strong'

export interface EditorStyle {
  density: EditorDensity
  wordSize: EditorWordSize
  glow: EditorGlow
}

export interface EditorState {
  theme: EditorTheme
  shape: EditorShape
  style: EditorStyle
}
