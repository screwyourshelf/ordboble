import type { CompositionId } from '../types/word-cloud'
import { heroComposition, presentationComposition, compactComposition } from './compositions'
import type { WordCloudComposition } from '../types/word-cloud'

export type CloudDensity = 'compact' | 'balanced' | 'airy'

export interface CloudPreset {
  id: CompositionId
  name: string
  description: string
  density: CloudDensity
  intent: string
  composition: WordCloudComposition
}

export const cloudPresets: CloudPreset[] = [
  {
    id: 'hero',
    name: 'Hero',
    description: 'Full-featured landing hero composition with 20 layered words',
    density: 'balanced',
    intent: 'landing page storytelling',
    composition: heroComposition,
  },
  {
    id: 'presentation',
    name: 'Presentation',
    description: 'High-impact composition with large tokens for big screens',
    density: 'airy',
    intent: 'fullscreen presentation',
    composition: presentationComposition,
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Tight 8-word cluster for preview and thumbnail contexts',
    density: 'compact',
    intent: 'thumbnail and preview',
    composition: compactComposition,
  },
]

export function getPreset(id: CompositionId): CloudPreset | undefined {
  return cloudPresets.find(p => p.id === id)
}
