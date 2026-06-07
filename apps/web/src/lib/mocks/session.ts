import type { Session } from '../types/session'

/**
 * Shared mock session for frontend prototype screens.
 * Used by: ContributorMobileScreen, ShareScreen, PresentationModeScreen, EditorScreen.
 */
export const mockSession: Session = {
  id: 'mock-session-1',
  title: 'Team workshop',
  prompt: 'Hva forbinder du med godt samarbeid?',
  joinCode: 'TEAM25',
  joinUrl: 'ordboble.app/join/TEAM25',
  participantCount: 24,
  language: 'nb',
  helperText: 'Skriv ett ord om gangen — du kan legge til opptil 3 ord.',
}
