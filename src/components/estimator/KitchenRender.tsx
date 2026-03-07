// KitchenRender — toolbar + 2D SVG canvas for kitchen step

import KitchenSvg2D from '@/components/estimator/KitchenSvg2D'
import useEstimator from '@/components/estimator/store/estimatorStore'
import { useCallback } from 'react'

const SHAPES = [
  { key: 'linear',   label: 'Linear'   },
  { key: 'lshape',   label: 'L-shape'  },
  { key: 'u',        label: 'U-shape'  },
  { key: 'parallel', label: 'Parallel' },
]

const inputStyle = {
  width: 64, borderRadius: 8, border: 'var(--b-base)',
  background: 'var(--c-bg)', padding: '4px 8px',
  textAlign: 'center' as const, fontSize: 12,
  color: 'var(--c-text)',
}

const selectStyle = {
  borderRadius: 8, border: 'var(--b-base)',
  background: 'var(--c-bg)', padding: '4px 10px',
  fontSize: 12, color: 'var(--c-text)',
}

export default function KitchenRender() {
  const kitchen    = useEstimator((s) => s.kitchen)
  const setShape   = useEstimator((s) => s.setKitchenShape)
  const setLength  = useEstimator((s) => s.setKitchenLength)
  const setFinish  = useEstimator((s) => s.setKitchenFinish)

  const handleLength = useCallback((key: 'A' | 'B' | 'C', value: string) => {
    const n = Number(value.replace(/[^\d.]/g, ''))
    setLength(key, Number.isFinite(n) ? n : 0)
  }, [setLength])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '20px 24px' }}>
      {/* ── Toolbar ── */}
      <div style={{ background: 'var(--c-bg-tint)', border: 'var(--b-base)', borderRadius: 16, padding: '16px 20px' }}>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--c-text)' }}>Kitchen layout</div>
          <div style={{ fontSize: 12, color: 'var(--c-text-2)', marginTop: 2 }}>
            Adjust wall lengths, layout shape and finishes. The 2D plan is used for pricing.
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, fontSize: 12 }}>

          {/* Shape */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--c-text-2)' }}>Shape</span>
            <div style={{ display: 'flex', gap: 4, background: 'var(--c-bg)', borderRadius: 999, padding: 4 }}>
              {SHAPES.map((s) => {
                const active = (kitchen.shape || 'linear') === s.key
                return (
                  <button key={s.key} onClick={() => setShape(s.key)}
                    style={{
                      padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 500,
                      border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                      background: active ? '#C8A96E' : 'transparent',
                      color:      active ? '#0F1923' : '#4A4A4A',
                    }}>
                    {s.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Lengths */}
          {(['A', 'B', 'C'] as const).map((k) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11, color: 'var(--c-text-2)' }}>{k} length (ft)</span>
              <input type="number" min={4} max={30}
                value={kitchen.lengths?.[k] ?? 10}
                onChange={(e) => handleLength(k, e.target.value)}
                style={inputStyle} />
            </div>
          ))}

          {/* Finish */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: 'var(--c-text-2)' }}>Finish</span>
            <select value={kitchen.finish || 'essential'} onChange={(e) => setFinish(e.target.value as any)} style={selectStyle}>
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
          <KitchenSvg2D />
        </div>
        <div style={{ position: 'absolute', top: 10, left: 12, fontSize: 10, color: 'rgba(200,169,110,0.8)', pointerEvents: 'none' }}>
          KITCHEN · 2D PLAN
        </div>
        <div style={{ position: 'absolute', bottom: 10, right: 12, fontSize: 10, color: 'rgba(200,169,110,0.6)', pointerEvents: 'none' }}>
          Aesthetic Homes
        </div>
      </div>

      <p style={{ fontSize: 11, color: 'var(--c-text-2)', margin: 0 }}>
        2D plan is the exact layout used for pricing. Wall lengths assume a continuous counter with 2 ft depth — adjust spans to mirror your kitchen.
      </p>
    </div>
  )
}
