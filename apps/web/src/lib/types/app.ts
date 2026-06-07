export type ScreenId = 'landing' | 'contributor' | 'share' | 'presentation' | 'editor'

export interface ScreenMeta {
  id: ScreenId
  label: string
  emoji: string
  description: string
}
