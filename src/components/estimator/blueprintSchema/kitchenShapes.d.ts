import type { BlueprintShapeSchema } from './interpreter'

export type KitchenShapeKey = 'linear' | 'lshape' | 'parallel' | 'u'

export const kitchenShapes: Record<KitchenShapeKey, BlueprintShapeSchema>
