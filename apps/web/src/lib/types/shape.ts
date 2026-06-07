export type ShapeId = 'freeform' | 'circle' | 'heart' | 'star'

export interface Shape {
  id: ShapeId
  label: string
  icon: string
  description: string
}
