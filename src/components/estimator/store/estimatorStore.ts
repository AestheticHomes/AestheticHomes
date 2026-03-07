import { create } from 'zustand'

export type EstimatorStep = 'kitchen' | 'wardrobe' | 'summary'
export type ViewMode      = '2d'     | '3d'
export type Shape         = 'linear' | 'parallel' | 'lshape' | 'u'
export type Finish        = 'essential' | 'premium' | 'luxury'

export interface KitchenData {
  shape:      Shape
  finish:     Finish
  perWallMax: number
  lengths:    Record<string, number>
}
export interface WardrobeData {
  widthFt: number; finish: Finish; maxFt: number; baseH: number; loftH: number
}
export interface ComputedEstimate {
  kBaseSqft: number; kWallSqft: number
  kBaseCost: number; kWallCost: number
  wBaseCost: number; wLoftCost: number
  total: number; totalRun: number; width: number
}
export interface EstimatorState {
  step: EstimatorStep; mode: ViewMode
  includeKitchen: boolean; includeWardrobe: boolean
  hasKitchen: boolean; hasWardrobe: boolean
  kitchen: KitchenData; wardrobe: WardrobeData
  setStep:            (s: EstimatorStep)        => void
  setMode:            (m: ViewMode)             => void
  setIncludeKitchen:  (v: boolean)              => void
  setIncludeWardrobe: (v: boolean)              => void
  setHasKitchen:      (v: boolean)              => void
  setHasWardrobe:     (v: boolean)              => void
  setKitchenShape:    (shape: string)           => void
  setKitchenFinish:   (finish: Finish)          => void
  setKitchenLength:   (key: string, val: number)=> void
  setWardrobeWidth:   (val: number | string)    => void
  setWardrobeFinish:  (finish: Finish)          => void
  setWardrobeLoftH:   (loftFt: number)          => void
  getComputed:        () => ComputedEstimate
}

const SHAPES: Shape[]              = ['linear','parallel','lshape','u']
const MIN_W: Record<Shape, number> = { linear:10, parallel:8, lshape:8, u:8 }
const RATES = { kitchen:{base:2000,wall:1500}, wardrobe:{base:1800,loft:1000} }
const MULT: Record<Finish, number> = { essential:1.0, premium:1.25, luxury:1.5 }

const useEstimator = create<EstimatorState>()((set, get) => ({
  step:'kitchen', mode:'2d',
  includeKitchen:true, includeWardrobe:true,
  hasKitchen:true, hasWardrobe:true,
  kitchen:  { shape:'linear', finish:'essential', perWallMax:20, lengths:{A:10,B:10,C:10} },
  wardrobe: { widthFt:10, finish:'essential', maxFt:20, baseH:7, loftH:3 },

  setStep:            (step) => set({ step }),
  setMode:            (mode) => set({ mode }),
  setIncludeKitchen:  (v)    => set({ includeKitchen:v, hasKitchen:v }),
  setIncludeWardrobe: (v)    => set({ includeWardrobe:v, hasWardrobe:v }),
  setHasKitchen:      (v)    => set({ includeKitchen:v, hasKitchen:v }),
  setHasWardrobe:     (v)    => set({ includeWardrobe:v, hasWardrobe:v }),

  setKitchenShape: (shape) => set((s) => {
    const raw = shape.toLowerCase().trim()
    const safe = SHAPES.includes(raw as Shape) ? raw as Shape : 'linear'
    return { kitchen: { ...s.kitchen, shape: safe } }
  }),
  setKitchenFinish: (finish) => set((s) => ({ kitchen: { ...s.kitchen, finish } })),
  setKitchenLength: (key, val) => set((s) => {
    const clamped = Math.min(Math.max(Number(val)||0, MIN_W[s.kitchen.shape]), s.kitchen.perWallMax)
    return { kitchen: { ...s.kitchen, lengths: { ...s.kitchen.lengths, [key]: clamped } } }
  }),
  setWardrobeWidth:  (ft)     => set((s) => ({ wardrobe: { ...s.wardrobe, widthFt: Math.min(Number(ft)||0, s.wardrobe.maxFt) } })),
  setWardrobeFinish: (finish) => set((s) => ({ wardrobe: { ...s.wardrobe, finish } })),
  setWardrobeLoftH:  (loftFt) => set((s) => ({ wardrobe: { ...s.wardrobe, loftH: Math.min(Math.max(Number(loftFt)||0,0),5) } })),

  getComputed: (): ComputedEstimate => {
    const { kitchen:k, wardrobe:w, includeKitchen:ik, includeWardrobe:iw } = get()
    const run  = Object.values(k.lengths).reduce((a:number,b) => a+(Number(b)||0), 0)
    const km   = MULT[k.finish], wm = MULT[w.finish]
    const kB   = run * 2.46 * RATES.kitchen.base  * km
    const kW   = run * 2.0  * RATES.kitchen.wall  * km
    const wB   = w.widthFt * w.baseH * RATES.wardrobe.base * wm
    const wL   = w.widthFt * w.loftH * RATES.wardrobe.loft * wm
    return {
      kBaseSqft: run*2.46, kWallSqft: run*2.0,
      kBaseCost: ik?kB:0, kWallCost: ik?kW:0,
      wBaseCost: iw?wB:0, wLoftCost: iw?wL:0,
      total: (ik?kB+kW:0)+(iw?wB+wL:0),
      totalRun: run, width: w.widthFt,
    }
  },
}))

export default useEstimator