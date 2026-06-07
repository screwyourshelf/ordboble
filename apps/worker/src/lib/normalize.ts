/**
 * Normalizes a word for deduplication.
 * Lowercases, strips non-letter/non-number characters, collapses whitespace.
 */
export function normalizeWord(word: string): string {
  return word
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}
