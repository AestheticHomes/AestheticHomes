export interface DimensionVars {
  A?: number
  B?: number
  C?: number
}

export type NumericExpr = number | string | null | undefined

export interface WallExpression {
  x: NumericExpr
  y: NumericExpr
  w: NumericExpr
  h: NumericExpr
}

export interface ApplianceExpression {
  x: NumericExpr
  y: NumericExpr
  w?: number
  h?: number
}

export type ApplianceExpressionMap = Record<string, ApplianceExpression>

export interface WallsWithOptionalAppliances {
  walls: WallExpression[]
  appliances?: ApplianceExpressionMap
}

export interface BlueprintShapeSchema {
  name?: string
  walls:
    | WallExpression[]
    | ((vars: Required<DimensionVars>) => WallExpression[] | WallsWithOptionalAppliances)
  appliances?: ApplianceExpressionMap | ((vars: Required<DimensionVars>) => ApplianceExpressionMap)
}

export interface ExpandedWall {
  x: number
  y: number
  w: number
  h: number
  _i: number
}

export interface ExpandedAppliance {
  x: number
  y: number
  w: number
  h: number
}

export interface ExpandedShape {
  walls: ExpandedWall[]
  appliances: Record<string, ExpandedAppliance>
}

export const FT_MM: number

export function evaluate(expr: NumericExpr, vars: Record<string, number>): number

export function expandShape(
  schema: BlueprintShapeSchema | null | undefined,
  dims: DimensionVars | null | undefined
): ExpandedShape
