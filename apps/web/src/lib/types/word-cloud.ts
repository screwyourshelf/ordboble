export interface WordEntry {
  word: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  color?: 'primary' | 'accent' | 'warm' | 'success' | 'text' | 'soft'
  rotation?: number
  glow?: boolean
  gradient?: boolean
  x: number
  y: number
  delay?: number
}
