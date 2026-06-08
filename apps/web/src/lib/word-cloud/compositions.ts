import type { WordEntry, WordCloudComposition } from '../types/word-cloud'

// ─────────────────────────────────────────────
// Hero composition
// Full-featured, 20 words, landing page context
// ─────────────────────────────────────────────
const heroWords: WordEntry[] = [
  // ── Hero ── dominant center, gradient + strong glow, depth 1
  { word: 'ordboble', size: '2xl', variant: 'hero',   depth: 1, glowIntensity: 'medium', rotation: -4,  x: 50, y: 48, delay: 0 },

  // ── Ring 1 ── xl/lg, close orbit, solid + soft glow, depth 1
  { word: 'kreativ',  size: 'xl',  variant: 'solid', color: 'accent',  depth: 1, rotation:  9,  x: 21, y: 30, delay: 0.10 },
  { word: 'moro',     size: 'xl',  variant: 'solid', color: 'warm',    depth: 1, glowIntensity: 'soft', rotation: -13, x: 76, y: 26, delay: 0.15 },
  { word: 'glede',    size: 'lg',  variant: 'solid', color: 'success', depth: 1, glowIntensity: 'soft', rotation:  6,  x: 27, y: 67, delay: 0.20 },
  { word: 'farger',   size: 'lg',  variant: 'solid', color: 'primary', depth: 1, glowIntensity: 'soft', rotation: -9,  x: 73, y: 68, delay: 0.25 },

  // ── Ring 2 ── md/sm, wider orbit, solid, depth 2
  { word: 'dele',     size: 'md',  variant: 'solid', color: 'accent',  depth: 2, rotation:  16, x: 12, y: 50, delay: 0.30 },
  { word: 'ord',      size: 'md',  variant: 'solid', color: 'warm',    depth: 2, rotation:  -3, x: 86, y: 47, delay: 0.12 },
  { word: 'kunst',    size: 'md',  variant: 'solid', color: 'soft',    depth: 2, rotation:  11, x: 54, y: 21, delay: 0.18 },
  { word: 'spill',    size: 'md',  variant: 'solid', color: 'accent',  depth: 2, rotation:  -7, x: 40, y: 78, delay: 0.22 },
  { word: 'energi',   size: 'sm',  variant: 'solid', color: 'primary', depth: 2, rotation:   8, x: 79, y: 62, delay: 0.28 },

  // ── Ring 3 ── sm/xs, atmospheric, subtle, depth 2–3
  { word: 'liv',      size: 'sm',  variant: 'subtle', color: 'warm',   depth: 2, rotation: -16, x: 18, y: 38, delay: 0.14 },
  { word: 'idé',      size: 'sm',  variant: 'subtle', color: 'success',depth: 2, rotation:  13, x: 62, y: 84, delay: 0.32 },
  { word: 'stemme',   size: 'sm',  variant: 'subtle', color: 'soft',   depth: 3, rotation:  -5, x: 10, y: 71, delay: 0.36 },
  { word: 'lek',      size: 'sm',  variant: 'subtle', color: 'accent', depth: 3, rotation:  19, x: 88, y: 36, delay: 0.16 },
  { word: 'lys',      size: 'xs',  variant: 'subtle', color: 'warm',   depth: 3, rotation: -10, x: 46, y: 13, delay: 0.24 },

  // ── Outermost ── xs, ghost accents, depth 3–4
  { word: 'form',     size: 'xs',  variant: 'ghost',  color: 'soft',   depth: 3, rotation:   7, x: 22, y: 18, delay: 0.38 },
  { word: 'farge',    size: 'xs',  variant: 'ghost',  color: 'primary',depth: 3, rotation: -12, x: 62, y: 14, delay: 0.42 },
  { word: 'svar',     size: 'xs',  variant: 'ghost',  color: 'accent', depth: 4, rotation:  15, x: 85, y: 78, delay: 0.20 },
  { word: 'nå',       size: 'xs',  variant: 'ghost',  color: 'warm',   depth: 4, rotation:  -8, x: 9,  y: 22, delay: 0.44 },
  { word: 'vi',       size: 'xs',  variant: 'ghost',  color: 'soft',   depth: 4, rotation:   4, x: 34, y: 8,  delay: 0.46 },
]

// ─────────────────────────────────────────────────────
// Presentation composition
// 12 words, larger tokens, wide spread — for big screens
// ─────────────────────────────────────────────────────
const presentationWords: WordEntry[] = [
  // ── Hero ──
  { word: 'ordboble', size: '2xl', variant: 'hero',   depth: 1, glowIntensity: 'strong', rotation: -3,  x: 50, y: 46, delay: 0 },

  // ── Ring 1 ── xl, bold and spread
  { word: 'kreativ',  size: 'xl',  variant: 'solid', color: 'accent',  depth: 1, glowIntensity: 'soft', rotation:  8,  x: 16, y: 26, delay: 0.10 },
  { word: 'moro',     size: 'xl',  variant: 'solid', color: 'warm',    depth: 1, glowIntensity: 'soft', rotation: -11, x: 80, y: 22, delay: 0.15 },
  { word: 'glede',    size: 'xl',  variant: 'solid', color: 'success', depth: 1, glowIntensity: 'soft', rotation:  7,  x: 20, y: 70, delay: 0.20 },
  { word: 'farger',   size: 'xl',  variant: 'solid', color: 'primary', depth: 1, glowIntensity: 'soft', rotation: -8,  x: 78, y: 68, delay: 0.25 },

  // ── Ring 2 ── lg, supporting
  { word: 'dele',     size: 'lg',  variant: 'solid', color: 'accent',  depth: 2, rotation:  14, x:  8, y: 48, delay: 0.18 },
  { word: 'ord',      size: 'lg',  variant: 'solid', color: 'warm',    depth: 2, rotation:  -4, x: 88, y: 44, delay: 0.22 },
  { word: 'kunst',    size: 'md',  variant: 'solid', color: 'soft',    depth: 2, rotation:  10, x: 50, y: 16, delay: 0.14 },
  { word: 'spill',    size: 'md',  variant: 'solid', color: 'accent',  depth: 2, rotation:  -6, x: 44, y: 82, delay: 0.28 },

  // ── Atmospheric ── subtle, depth 3
  { word: 'liv',      size: 'sm',  variant: 'subtle', color: 'warm',   depth: 3, rotation: -14, x: 12, y: 36, delay: 0.32 },
  { word: 'energi',   size: 'sm',  variant: 'subtle', color: 'primary',depth: 3, rotation:   9, x: 82, y: 58, delay: 0.36 },
  { word: 'idé',      size: 'xs',  variant: 'ghost',  color: 'success',depth: 4, rotation:  12, x: 58, y: 88, delay: 0.40 },
]

// ────────────────────────────────────────────────────────────
// Compact composition
// 8 words, tight cluster — for previews and small contexts
// ────────────────────────────────────────────────────────────
const compactWords: WordEntry[] = [
  // ── Hero ──
  { word: 'ordboble', size: 'xl',  variant: 'hero',   depth: 1, glowIntensity: 'strong', rotation: -3,  x: 50, y: 48, delay: 0 },

  // ── Ring 1 ── lg, tight orbit
  { word: 'kreativ',  size: 'lg',  variant: 'solid', color: 'accent',  depth: 1, glowIntensity: 'soft', rotation:  8,  x: 24, y: 30, delay: 0.10 },
  { word: 'moro',     size: 'lg',  variant: 'solid', color: 'warm',    depth: 1, glowIntensity: 'soft', rotation: -10, x: 74, y: 26, delay: 0.14 },
  { word: 'glede',    size: 'md',  variant: 'solid', color: 'success', depth: 2, rotation:   6, x: 26, y: 68, delay: 0.18 },
  { word: 'farger',   size: 'md',  variant: 'solid', color: 'primary', depth: 2, rotation:  -7, x: 72, y: 66, delay: 0.22 },

  // ── Ring 2 ── sm/xs, close atmospheric
  { word: 'dele',     size: 'sm',  variant: 'subtle', color: 'accent', depth: 2, rotation:  13, x: 14, y: 50, delay: 0.26 },
  { word: 'ord',      size: 'sm',  variant: 'subtle', color: 'warm',   depth: 3, rotation:  -5, x: 82, y: 46, delay: 0.30 },
  { word: 'kunst',    size: 'xs',  variant: 'ghost',  color: 'soft',   depth: 3, rotation:   9, x: 50, y: 18, delay: 0.34 },
]

// ─────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────
export const heroComposition: WordCloudComposition = {
  id: 'hero',
  label: 'Hero',
  words: heroWords,
}

export const presentationComposition: WordCloudComposition = {
  id: 'presentation',
  label: 'Presentation',
  words: presentationWords,
}

export const compactComposition: WordCloudComposition = {
  id: 'compact',
  label: 'Compact',
  words: compactWords,
}

export const compositions: Record<string, WordCloudComposition> = {
  hero: heroComposition,
  presentation: presentationComposition,
  compact: compactComposition,
}
