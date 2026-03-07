// WardrobeRender — toolbar + 2D elevation for wardrobe step

import WardrobeSvg2D from '@/components/estimator/WardrobeSvg2D'
import useEstimator, { type Finish } from '@/components/estimator/store/estimatorStore'
import { useCallback } from 'react'

const inputStyle = {
  width: 64, borderRadius: 8, border: 'var(--b-base)',
  background: 'var(--c-bg)', padding: '4px 8px',
  textAlign: 'center' as const, fontSize: 12, color: 'var(--c-text)',
}

const selectStyle = {
  borderRadius: 8, border: 'var(--b-base)',
  background: 'var(--c-bg)', padding: '4px 10px',
  fontSize: 12, color: 'var(--c-text)',
}

export default function WardrobeRender() {
  const wardrobe  = useEstimator((s) => s.wardrobe)
  const setWidth  = useEstimator((s) => s.setWardrobeWidth)
  const setFinish = useEstimator((s) => s.setWardrobeFinish)
  const setLoftH  = useEstimator((s) => s.setWardrobeLoftH)

  const handleWidth = useCallback((v: string) => {
    const n = Number(v.replace(/[^\d.]/g, ''))
    setWidth(Number.isFinite(n) ? n : 0)
  }, [setWidth])

  const handleLoft = useCallback((v: string) => {
    const n = Number(v.replace(/[^\d.]/g, ''))
    setLoftH(Number.isFinite(n) ? n : 0)
  }, [setLoftH])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '20px 24px' }}>
      {/* ── Toolbar ── */}
      <div style={{ background: 'var(--c-bg-tint)', border: 'var(--b-base)', borderRadius: 16, padding: '16px 20px' }}>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--c-text)' }}>Wardrobe layout</div>
          <div style={{ fontSize: 12, color: 'var(--c-text-2)', marginTop: 2 }}>
            Configure width, loft height and finish. 2D elevation is used for pricing.
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, fontSize: 12 }}>

          {/* Width */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, color: 'var(--c-text-2)' }}>Width (ft)</span>
            <input type="number" min={3} max={20}
              value={Number(wardrobe.widthFt) || 0}
              onChange={(e) => handleWidth(e.target.value)}
              style={inputStyle} aria-label="Wardrobe width (ft)" />
          </div>

          {/* Loft height */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, color: 'var(--c-text-2)' }}>Loft height (ft)</span>
            <input type="number" min={0} max={5}
              value={Number(wardrobe.loftH ?? 3)}
              onChange={(e) => handleLoft(e.target.value)}
              style={inputStyle} aria-label="Loft height (ft)" />
          </div>

          {/* Finish */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: 'var(--c-text-2)' }}>Finish</span>
            <select value={wardrobe.finish || 'essential'} onChange={(e) => setFinish(e.target.value as Finish)} style={selectStyle}>
              <option value="essential">Essential</option>
              <option value="premium">Premium</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>

        </div>
      </div>

      {/* ── 2D Canvas ── */}
      <div style={{
        position: 'relative', height: 420, borderRadius: 16, overflow: 'hidden',
        border: '1px solid rgba(200,169,110,0.3)',
        background: '#1C2B3A',
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <WardrobeSvg2D />
        </div>
        <div style={{ position: 'absolute', top: 10, left: 12, fontSize: 10, color: 'rgba(200,169,110,0.8)', pointerEvents: 'none' }}>
          WARDROBE · 2D ELEVATION
        </div>
        <div style={{ position: 'absolute', bottom: 10, right: 12, fontSize: 10, color: 'rgba(200,169,110,0.6)', pointerEvents: 'none' }}>
          Aesthetic Homes
        </div>
      </div>

      <p style={{ fontSize: 11, color: 'var(--c-text-2)', margin: 0 }}>
        2D elevation is the canonical layout for pricing. Door counts are derived from overall width with standard 450 mm bay modules.
      </p>
    </div>
  )
}
