import type { Theme, ThemeId } from '../types/theme'

export const themes: Theme[] = [
  {
    id: 'playful',
    label: 'Playful',
    description: 'Vibrant purple-pink gradient — the default Ordboble feel',
    swatch: 'linear-gradient(135deg, #7c3cff, #ff4fa3)',
    ring: '#7c3cff',
    previewBg:
      'radial-gradient(ellipse 90% 80% at 55% 50%, rgba(124,60,255,0.22) 0%, rgba(255,79,163,0.12) 50%, #070816 80%)',
    glowColor: 'primary',
  },
  {
    id: 'calm',
    label: 'Calm',
    description: 'Cool blue-purple tone — focused and serene',
    swatch: 'linear-gradient(135deg, #3b82f6, #7c3cff)',
    ring: '#3b82f6',
    previewBg:
      'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(59,130,246,0.20) 0%, rgba(124,60,255,0.10) 55%, #060c1a 80%)',
    glowColor: 'primary',
  },
  {
    id: 'dark',
    label: 'Dark',
    description: 'Deep near-black — dramatic and high contrast',
    swatch: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    ring: '#ffffff',
    previewBg:
      'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(30,30,50,0.90) 0%, #04040c 70%)',
    glowColor: 'primary',
  },
  {
    id: 'celebration',
    label: 'Fest',
    description: 'Warm orange-pink — energetic and celebratory',
    swatch: 'linear-gradient(135deg, #ff7a2f, #ff4fa3)',
    ring: '#ff7a2f',
    previewBg:
      'radial-gradient(ellipse 90% 80% at 45% 50%, rgba(255,122,47,0.22) 0%, rgba(255,79,163,0.14) 50%, #0f0610 80%)',
    glowColor: 'warm',
  },
]

export function getTheme(id: ThemeId): Theme {
  return themes.find(t => t.id === id) ?? themes[0]
}
