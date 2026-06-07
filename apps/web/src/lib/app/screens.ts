import type { ScreenMeta } from '../types/app'

export const screens: ScreenMeta[] = [
  {
    id: 'landing',
    label: 'Landing',
    emoji: '🏠',
    description: 'Landing page hero with word cloud',
  },
  {
    id: 'contributor',
    label: 'Deltaker',
    emoji: '📱',
    description: 'Mobile contributor word submission screen',
  },
  {
    id: 'share',
    label: 'Del',
    emoji: '🔗',
    description: 'Host share screen with QR and join link',
  },
  {
    id: 'presentation',
    label: 'Presentasjon',
    emoji: '🎬',
    description: 'Fullscreen cinematic presentation mode',
  },
  {
    id: 'editor',
    label: 'Editor',
    emoji: '🎨',
    description: 'Word cloud customization studio',
  },
]
