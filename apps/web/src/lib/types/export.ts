export type ExportFormatId = 'png' | 'svg' | 'pdf' | 'print'

export interface ExportOption {
  id: ExportFormatId
  label: string
  description: string
  icon: string
  /** Whether this export action is available. False = coming soon. */
  enabled: boolean
}
