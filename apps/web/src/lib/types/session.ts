export interface Session {
  id: string
  title: string
  prompt: string
  joinCode: string
  joinUrl: string
  participantCount: number
  language: string
  /** Shown on the contributor screen below the input */
  helperText?: string
}
