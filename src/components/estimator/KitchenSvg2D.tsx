// KitchenSvg2D — CAD 2D plan for kitchen estimator
// [edith-cad][fine-line][dim-balance][final-v2025.11-CADLight]

import { expandShape }    from '@/components/estimator/blueprintSchema/interpreter'
import { kitchenShapes }  from '@/components/estimator/blueprintSchema/kitchenShapes'
import type { KitchenShapeKey } from '@/components/estimator/blueprintSchema/kitchenShapes'
import PanZoomViewport    from '@/components/estimator/common/PanZoomViewport'
import useEstimator       from '@/components/estimator/store/estimatorStore'
import React, { useMemo } from 'react'

/* ---------- Drawing constants ---------- */
const PX    = 0.22
const toPx  = (mm: number): number => mm * PX
const VIEW_W = 1200
const VIEW_H = 600
const FT     = 304.8
const COUNTER_D       = 600
const APPLIANCE_MARGIN = 60

const COLORS = {
  counter:       'rgba(200,169,110,0.18)',
  counterStroke: '#C8A96E',
  sink:          'rgba(96,165,250,0.28)',
  hob:           'rgba(248,113,113,0.25)',
  dim:           'rgba(200,169,110,0.85)',
  text:          'rgba(200,169,110,0.85)',
}

const sw = (base: number, scale: number): number => Math.max(0.7, base / (scale * 1.3))

function ArrowDef() {
  return (
    <defs>
      <marker id="cadArrow" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={4.5} markerHeight={4.5} orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={COLORS.dim} />
      </marker>
      <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feMorphology operator="dilate" radius={0.35} in="SourceAlpha" result="D" />
        <feGaussianBlur in="D" stdDeviation={0.6} result="B" />
        <feMerge><feMergeNode in="B" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
  )
}

function OuterLeaders({ bbox, scale }: { bbox: { x: number; y: number; w: number; h: number }; scale: number }) {
  const offset = Math.max(300, Math.max(bbox.w, bbox.h) * 0.08)
  const ft     = (mm: number) => (mm / FT).toFixed(1) + ' ft'
  const items  = [
    { x1: bbox.x, y1: bbox.y - offset, x2: bbox.x + bbox.w, y2: bbox.y - offset, label: ft(bbox.w) },
    { x1: bbox.x + bbox.w + offset, y1: bbox.y, x2: bbox.x + bbox.w + offset, y2: bbox.y + bbox.h, label: ft(bbox.h) },
  ]
  return (
    <>
      {items.map((d, i) => (
        <g key={i}>
          <line x1={toPx(d.x1)} y1={toPx(d.y1)} x2={toPx(d.x2)} y2={toPx(d.y2)}
            stroke={COLORS.dim} strokeWidth={sw(1.2, scale)} markerEnd="url(#cadArrow)" vectorEffect="non-scaling-stroke" />
          <text x={toPx((d.x1 + d.x2) / 2)} y={toPx((d.y1 + d.y2) / 2) - 12 / scale}
            fontSize={15 / scale} fontWeight={600} textAnchor="middle" fill={COLORS.text} filter="url(#textGlow)">
            {d.label}
          </text>
        </g>
      ))}
    </>
  )
}

function HobIcon({ x, y, w, h, orient, scale }: { x: number; y: number; w: number; h: number; orient: 'h' | 'v'; scale: number }) {
  const m   = APPLIANCE_MARGIN
  const ax  = x + m, ay = y + m
  const aw  = Math.max(1, w - 2 * m), ah = Math.max(1, h - 2 * m)
  const cols = orient === 'h' ? [0.3, 0.7] : [0.35, 0.65]
  const rows = orient === 'h' ? [0.35, 0.7] : [0.3, 0.7]
  const pts  = rows.flatMap((ry) => cols.map((cx) => [ax + aw * cx, ay + ah * ry] as const))
  return (
    <g>
      <rect x={toPx(ax)} y={toPx(ay)} width={toPx(aw)} height={toPx(ah)} rx={toPx(16)}
        fill={COLORS.hob} stroke={COLORS.counterStroke} strokeWidth={sw(1.2, scale)} vectorEffect="non-scaling-stroke" />
      {pts.map(([cx, cy], i) => (
        <circle key={i} cx={toPx(cx)} cy={toPx(cy)} r={toPx(38)}
          fill="none" stroke={COLORS.counterStroke} strokeWidth={sw(1.2, scale)} vectorEffect="non-scaling-stroke" />
      ))}
    </g>
  )
}

function SinkIcon({ x, y, w, h, scale }: { x: number; y: number; w: number; h: number; orient: 'h' | 'v'; inward: string; scale: number }) {
  const m   = APPLIANCE_MARGIN
  const ax  = x + m, ay = y + m
  const aw  = Math.max(1, w - 2 * m), ah = Math.max(1, h - 2 * m)
  return (
    <g>
      <rect x={toPx(ax)} y={toPx(ay)} width={toPx(aw)} height={toPx(ah)} rx={toPx(8)}
        fill={COLORS.sink} stroke={COLORS.counterStroke} strokeWidth={sw(1.2, scale)} vectorEffect="non-scaling-stroke" />
      <circle cx={toPx(ax + aw * 0.25)} cy={toPx(ay + ah * 0.25)} r={toPx(12)} fill={COLORS.counterStroke} />
    </g>
  )
}

const within = (
  host: { x: number; y: number; w: number; h: number },
  w: number,
  h: number,
  pref: 'center' | 'nearStart' | 'nearEnd' = 'center'
): { x: number; y: number } => {
  const m  = APPLIANCE_MARGIN
  const ix = host.x + m, iy = host.y + m
  const iw = Math.max(1, host.w - 2 * m), ih = Math.max(1, host.h - 2 * m)
  if (host.w >= host.h) {
    const y = iy
    const x = pref === 'nearStart' ? ix + COUNTER_D
      : pref === 'nearEnd'  ? ix + Math.max(0, iw - w - COUNTER_D)
      : ix + Math.max(0, (iw - w) / 2)
    return { x, y }
  } else {
    const x = ix
    const y = pref === 'nearStart' ? iy + COUNTER_D
      : pref === 'nearEnd'  ? iy + Math.max(0, ih - h - COUNTER_D)
      : iy + Math.max(0, (ih - h) / 2)
    return { x, y }
  }
}

function KitchenSvg2DInner() {
  const kitchenLengths = useEstimator((s) => s.kitchen.lengths)
  const kitchenShape   = useEstimator((s) => s.kitchen.shape)
  const kitchenFinish  = useEstimator((s) => s.kitchen.finish)

  const dims = useMemo(() => ({
    A: (kitchenLengths?.A ?? 10) * FT,
    B: (kitchenLengths?.B ?? 10) * FT,
    C: (kitchenLengths?.C ?? 10) * FT,
  }), [kitchenLengths])

  const normalizedShape = ((kitchenShape as string) || 'linear').toLowerCase()
  const shapeKey: KitchenShapeKey = normalizedShape in kitchenShapes
    ? (normalizedShape as KitchenShapeKey)
    : 'linear'
  const schema   = kitchenShapes[shapeKey]

  const { walls, appliances } = expandShape(schema, dims)

  const sorted    = [...walls].sort((a: any, b: any) => b.w * b.h - a.w * a.h)
  const long      = sorted[0]
  const shortW    = sorted[sorted.length - 1]
  const verticalWalls   = walls.filter((w: any) => w.h > w.w).sort((a: any, b: any) => a.x - b.x)
  const horizontalWalls = walls.filter((w: any) => w.w >= w.h).sort((a: any, b: any) => a.y - b.y)

  let hostForHob  = long
  let hostForSink = shortW
  let hobPref:  'center' | 'nearStart' | 'nearEnd' = 'center'
  let sinkPref: 'center' | 'nearStart' | 'nearEnd' = 'nearStart'

  switch (shapeKey) {
    case 'linear':
      hostForHob = walls[0]; hostForSink = walls[0]; hobPref = 'nearEnd'; sinkPref = 'nearStart'; break
    case 'lshape':
      hostForSink = verticalWalls[verticalWalls.length - 1] || shortW; sinkPref = 'nearEnd'
      hostForHob  = horizontalWalls[0] || long; break
    case 'u':
      hostForHob  = horizontalWalls[0] || long
      hostForSink = verticalWalls[0] || shortW; sinkPref = 'nearEnd'; break
    case 'parallel':
      hostForHob  = horizontalWalls[0] || long
      hostForSink = horizontalWalls[1] || shortW || long; sinkPref = 'center'; break
  }

  const hobOrient:  'h' | 'v' = hostForHob.w  >= hostForHob.h  ? 'h' : 'v'
  let   sinkOrient: 'h' | 'v' = hostForSink.w >= hostForSink.h ? 'h' : 'v'
  if (shapeKey === 'lshape' || shapeKey === 'u') sinkOrient = 'v'

  const hobSize  = { w: appliances.hob?.w  ?? 700, h: appliances.hob?.h  ?? COUNTER_D - 120 }
  let   sinkSize = { w: appliances.sink?.w ?? 900, h: appliances.sink?.h ?? COUNTER_D - 120 }
  if (sinkOrient === 'v') sinkSize = { w: sinkSize.h, h: sinkSize.w }

  const hobPos  = within(hostForHob,  hobSize.w,  hobSize.h,  hobPref)
  const sinkPos = within(hostForSink, sinkSize.w, sinkSize.h, sinkPref)

  const fitKey  = `${shapeKey}-${dims.A}-${dims.B}-${dims.C}-${kitchenFinish}`
  const fitRects = walls.map((w: any) => ({ x: w.x, y: w.y, w: w.w, h: w.h }))
  const bbox = fitRects.reduce(
    (acc: any, r: any) => ({
      x: Math.min(acc.x, r.x), y: Math.min(acc.y, r.y),
      w: Math.max(acc.x + acc.w, r.x + r.w) - Math.min(acc.x, r.x),
      h: Math.max(acc.y + acc.h, r.y + r.h) - Math.min(acc.y, r.y),
    }),
    { x: fitRects[0]?.x ?? 0, y: fitRects[0]?.y ?? 0, w: fitRects[0]?.w ?? 0, h: fitRects[0]?.h ?? 0 }
  )

  let inward: 'left' | 'right' | 'up' | 'down' = 'right'
  if (sinkOrient === 'v') {
    inward = hostForSink.x + hostForSink.w / 2 < bbox.x + bbox.w / 2 ? 'right' : 'left'
  } else {
    inward = hostForSink.y + hostForSink.h / 2 < bbox.y + bbox.h / 2 ? 'down' : 'up'
  }

  const centerX = bbox.x + bbox.w / 2
  const centerY = bbox.y + bbox.h / 2

  return (
    <PanZoomViewport sceneWidth={VIEW_W} sceneHeight={VIEW_H} fitKey={fitKey} autoFitOnMount autoFitOnFitKeyChange>
      {(transform) => {
        const scale = transform.z
        const tx    = transform.x + VIEW_W / 2 - toPx(centerX) * transform.z
        const ty    = transform.y + VIEW_H / 2 - toPx(centerY) * transform.z
        return (
          <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="xMidYMid meet"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <ArrowDef />
            <g transform={`translate(${tx}, ${ty}) scale(${scale})`}>
              {walls.map((r: any, i: number) => (
                <rect key={i} x={toPx(r.x)} y={toPx(r.y)} width={toPx(r.w)} height={toPx(r.h)} rx={toPx(4)}
                  fill={COLORS.counter} stroke={COLORS.counterStroke} strokeWidth={sw(1.2, scale)} vectorEffect="non-scaling-stroke" />
              ))}
              <HobIcon  x={hobPos.x}  y={hobPos.y}  w={hobSize.w}  h={hobSize.h}  orient={hobOrient}  scale={scale} />
              <SinkIcon x={sinkPos.x} y={sinkPos.y} w={sinkSize.w} h={sinkSize.h} orient={sinkOrient} inward={inward} scale={scale} />
              <OuterLeaders bbox={bbox} scale={scale} />
            </g>
          </svg>
        )
      }}
    </PanZoomViewport>
  )
}

const KitchenSvg2D = React.memo(KitchenSvg2DInner)
KitchenSvg2D.displayName = 'KitchenSvg2D'
export default KitchenSvg2D
