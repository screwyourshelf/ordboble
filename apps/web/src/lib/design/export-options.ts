import type { ExportOption } from '../types/export'

export const exportOptions: ExportOption[] = [
  {
    id: 'png',
    label: 'PNG',
    description: 'Lagre som bilde',
    icon: '🖼',
    enabled: false,
  },
  {
    id: 'svg',
    label: 'SVG',
    description: 'Vektorgrafikk',
    icon: '✦',
    enabled: false,
  },
  {
    id: 'pdf',
    label: 'PDF',
    description: 'Klar til trykk',
    icon: '📄',
    enabled: false,
  },
  {
    id: 'print',
    label: 'Skriv ut',
    description: 'Send til skriver',
    icon: '🖨',
    enabled: false,
  },
]
