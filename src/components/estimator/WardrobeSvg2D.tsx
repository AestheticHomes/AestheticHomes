// WardrobeSvg2D — 2D elevation for wardrobe estimator

import PanZoomViewport from '@/components/estimator/common/PanZoomViewport'
import useEstimator    from '@/components/estimator/store/estimatorStore'

export default function WardrobeSvg2D() {
  const wardrobe = useEstimator((s) => s.wardrobe)

  const totalW = (wardrobe.widthFt || 9) * 304.8
  const baseH  = (wardrobe.baseH  || 7) * 304.8
  const loftH  = (wardrobe.loftH  || 3) * 304.8
  const gapTopBetween = 8
  const totalH = baseH + loftH + gapTopBetween

  const nominalModule = 450
  const moduleCount   = Math.max(1, Math.round(totalW / nominalModule))
  const moduleW       = totalW / moduleCount
  const modules       = Array.from({ length: moduleCount }, (_, i) => ({ x: i * moduleW, w: moduleW }))

  const labelW       = Math.round(totalW).toString().length * 10
  const padBreathing = Math.max(160, moduleCount * 18)
  const padLeft      = 180 + labelW * 0.25 + padBreathing * 0.5
  const padRight     = 180 + labelW * 0.25 + padBreathing * 0.5
  const padTop       = 200
  const padBottom    = 260

  const vbW    = Math.max(totalW + padLeft + padRight, moduleCount * 520)
  const vbH    = totalH + padTop + padBottom
  const marginX = padLeft
  const floorY  = padTop + totalH

  const loftBandHeight = totalH * 0.22
  const baseBandHeight = totalH - loftBandHeight
  const plinthHeight   = totalH * 0.06
  const doorGap        = Math.max(14, Math.min(42, moduleW * 0.12))

  const fitKey = `${wardrobe.widthFt}-${wardrobe.finish}-${wardrobe.loftH}`

  return (
    <PanZoomViewport sceneWidth={vbW} sceneHeight={vbH} fitKey={fitKey} autoFitOnMount autoFitOnFitKeyChange>
      {(transform) => (
        <svg width="100%" height="100%" viewBox={`0 0 ${vbW} ${vbH}`} preserveAspectRatio="xMidYMid meet"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: 8, background: '#1C2B3A' }}>
          <defs>
            <linearGradient id="wardWallGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#C8A96E" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#1C2B3A"          stopOpacity="0.22" />
            </linearGradient>
            <linearGradient id="wardFloorShadow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#C8A96E" stopOpacity="0" />
              <stop offset="50%"  stopColor="#C8A96E" stopOpacity="1" />
              <stop offset="100%" stopColor="#C8A96E" stopOpacity="0" />
            </linearGradient>
            <marker id="wardArrow" markerWidth="12" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L12,4 L0,8 Z" fill="#C8A96E" />
            </marker>
          </defs>

          <g transform={`translate(${transform.x},${transform.y}) scale(${transform.z})`}>
            {/* backdrop */}
            <rect x={marginX - 80} y={padTop - 80} width={totalW + 160} height={totalH + 200}
              fill="url(#wardWallGrad)" rx={10} />

            {/* outer frame */}
            <rect x={marginX - 30} y={padTop - 10} width={totalW + 60} height={totalH + 10}
              fill="none" stroke="#C8A96E" strokeWidth={1.6} strokeOpacity={0.35}
              vectorEffect="non-scaling-stroke" rx={6} />

            {/* base plinth */}
            <rect x={marginX - 30} y={floorY + 10} width={totalW + 60} height={plinthHeight}
              fill="rgba(200,169,110,0.25)"
              stroke="#C8A96E" strokeWidth={1.2} vectorEffect="non-scaling-stroke" />

            {/* loft carcass */}
            <rect x={marginX} y={floorY - baseBandHeight - loftBandHeight} width={totalW} height={loftBandHeight}
              fill="rgba(28,43,58,0.9)"
              stroke="#C8A96E" strokeWidth={1.2} vectorEffect="non-scaling-stroke" />

            {/* loft divider line */}
            <line x1={marginX} x2={marginX + totalW} y1={floorY - baseBandHeight} y2={floorY - baseBandHeight}
              stroke="#C8A96E" strokeWidth={1} vectorEffect="non-scaling-stroke" />

            {/* base carcass */}
            <rect x={marginX} y={floorY - baseBandHeight} width={totalW} height={baseBandHeight}
              fill="#1C2B3A" stroke="#C8A96E" strokeWidth={1.2} vectorEffect="non-scaling-stroke" />

            {/* per-module doors */}
            {modules.map((m, i) => {
              const x            = marginX + m.x
              const innerX       = x + doorGap * 0.5
              const innerW       = m.w - doorGap
              const rightHinge   = i % 2 === 0
              const handleOffset = m.w * 0.18
              const handleX      = rightHinge ? x + m.w - handleOffset : x + handleOffset
              const doorFill     = i % 2 === 0
                ? 'rgba(28,43,58,0.9)'
                : 'rgba(36,53,71,0.9)'

              return (
                <g key={i}>
                  {/* base door */}
                  <rect x={innerX} y={floorY - baseBandHeight} width={innerW} height={baseBandHeight}
                    fill={doorFill} stroke="#C8A96E" strokeOpacity={0.9} strokeWidth={1.05}
                    vectorEffect="non-scaling-stroke" rx={6} />
                  {m.w > 200 && (
                    <line x1={innerX + innerW / 2} y1={floorY - baseBandHeight} x2={innerX + innerW / 2} y2={floorY}
                      stroke="rgba(200,169,110,0.6)" strokeOpacity={0.45} strokeWidth={0.7} vectorEffect="non-scaling-stroke" />
                  )}
                  {/* base handle */}
                  <rect x={handleX - 4} y={floorY - baseBandHeight * 0.6} width={8} height={baseBandHeight * 0.3}
                    rx={3} fill="#C8A96E" vectorEffect="non-scaling-stroke" />

                  {/* loft door */}
                  <rect x={innerX} y={floorY - baseBandHeight - loftBandHeight} width={innerW} height={loftBandHeight}
                    fill={doorFill} stroke="#C8A96E" strokeOpacity={0.9} strokeWidth={1}
                    vectorEffect="non-scaling-stroke" rx={4} />
                  {m.w > 200 && (
                    <line x1={innerX + innerW / 2} y1={floorY - baseBandHeight - loftBandHeight} x2={innerX + innerW / 2} y2={floorY - baseBandHeight}
                      stroke="rgba(200,169,110,0.6)" strokeOpacity={0.45} strokeWidth={0.7} vectorEffect="non-scaling-stroke" />
                  )}
                  {/* loft handle */}
                  <rect x={handleX - 3} y={floorY - baseBandHeight - loftBandHeight * 0.65} width={6} height={loftBandHeight * 0.3}
                    rx={2.5} fill="#C8A96E" vectorEffect="non-scaling-stroke" />

                  {/* module label */}
                  <text x={x + m.w / 2} y={floorY - baseBandHeight - loftBandHeight - 14}
                    textAnchor="middle" fontSize={12} fill="rgba(200,169,110,0.6)" vectorEffect="non-scaling-stroke">
                    {Math.round(m.w)} mm
                  </text>
                </g>
              )
            })}

            {/* floor shadow */}
            <line x1={marginX - 30} x2={marginX + totalW + 30} y1={floorY + 12} y2={floorY + 12}
              stroke="url(#wardFloorShadow)" strokeWidth={3} opacity={0.35} vectorEffect="non-scaling-stroke" />

            {/* width dimension */}
            <g>
              <line x1={marginX} x2={marginX + totalW} y1={floorY + 70} y2={floorY + 70}
                stroke="#C8A96E" strokeOpacity={0.55} strokeWidth={1}
                markerStart="url(#wardArrow)" markerEnd="url(#wardArrow)" vectorEffect="non-scaling-stroke" />
              <rect x={marginX + totalW / 2 - 50} y={floorY + 78} width={100} height={24} rx={6}
                fill="rgba(28,43,58,0.9)"
                stroke="#C8A96E" strokeOpacity={0.55} strokeWidth={0.9} vectorEffect="non-scaling-stroke" />
              <text x={marginX + totalW / 2} y={floorY + 94}
                textAnchor="middle" fontSize={12} fontWeight={600} fill="#C8A96E" vectorEffect="non-scaling-stroke">
                {(totalW / 304.8).toFixed(1)} ft
              </text>
            </g>

            {/* height dimension */}
            <g>
              <line x1={marginX - 70} x2={marginX - 70} y1={floorY} y2={floorY - totalH}
                stroke="#C8A96E" strokeOpacity={0.55} strokeWidth={1}
                markerStart="url(#wardArrow)" markerEnd="url(#wardArrow)" vectorEffect="non-scaling-stroke" />
              <rect x={marginX - 130} y={floorY - totalH / 2 - 12} width={82} height={24} rx={6}
                fill="rgba(28,43,58,0.9)"
                stroke="#C8A96E" strokeOpacity={0.55} strokeWidth={0.9} vectorEffect="non-scaling-stroke" />
              <text x={marginX - 90} y={floorY - totalH / 2 + 4}
                textAnchor="end" fontSize={12} fontWeight={600} fill="#C8A96E" vectorEffect="non-scaling-stroke">
                {(totalH / 304.8).toFixed(1)} ft
              </text>
            </g>
          </g>
        </svg>
      )}
    </PanZoomViewport>
  )
}
