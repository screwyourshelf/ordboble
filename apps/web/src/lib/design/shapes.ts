import type { Shape, ShapeId } from '../types/shape'

export const shapes: Shape[] = [
  {
    id: 'freeform',
    label: 'Fritt',
    icon: '✦',
    description: 'Organic free-form cloud layout',
  },
  {
    id: 'circle',
    label: 'Sirkel',
    icon: '◉',
    description: 'Words arranged in a circular outline',
  },
  {
    id: 'heart',
    label: 'Hjerte',
    icon: '♡',
    description: 'Words shaped into a heart',
  },
  {
    id: 'star',
    label: 'Stjerne',
    icon: '✦',
    description: 'Words arranged in a star shape',
  },
]

export function getShape(id: ShapeId): Shape {
  return shapes.find(s => s.id === id) ?? shapes[0]
}
