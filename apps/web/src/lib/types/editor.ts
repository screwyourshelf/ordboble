export type { ThemeId as EditorTheme } from './theme'
export type { ShapeId as EditorShape } from './shape'

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
