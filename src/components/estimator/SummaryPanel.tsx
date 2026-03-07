// SummaryPanel — cost breakdown with bar + pie charts

import useEstimator from '@/components/estimator/store/estimatorStore'
import { CONTACT } from '@/lib/constants'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, Tooltip,
  PieChart, Pie, Cell, type PieLabelRenderProps,
} from 'recharts'

const GOLD_PALETTE = ['#C8A96E', '#B8955A', '#A07840', '#D4BB8A']

const Money = ({ v = 0 }: { v?: number }) => <>₹{Math.round(v).toLocaleString()}</>

export default function SummaryPanel() {
  const setStep        = useEstimator((s) => s.setStep)
  const k              = useEstimator((s) => s.kitchen)
  const w              = useEstimator((s) => s.wardrobe)
  const includeKitchen  = useEstimator((s) => s.includeKitchen)
  const includeWardrobe = useEstimator((s) => s.includeWardrobe)
  const getComputed    = useEstimator((s) => s.getComputed)
  const comp           = getComputed()

  const parts = [
    includeKitchen  && { label: 'Kitchen Base', value: comp.kBaseCost || 0 },
    includeKitchen  && { label: 'Kitchen Wall',  value: comp.kWallCost || 0 },
    includeWardrobe && { label: 'Wardrobe Body',  value: comp.wBaseCost || 0 },
    includeWardrobe && { label: 'Wardrobe Loft',  value: comp.wLoftCost || 0 },
  ].filter(Boolean) as { label: string; value: number }[]

  const total     = comp.total || 0
  const chartData = parts.length ? parts : [{ label: 'No items', value: 0 }]
  const max       = Math.max(...chartData.map((p) => p.value), 1)

  const pieData = [
    includeKitchen  && { name: 'Kitchen',  value: (comp.kBaseCost || 0) + (comp.kWallCost || 0) },
    includeWardrobe && { name: 'Wardrobe', value: (comp.wBaseCost || 0) + (comp.wLoftCost || 0) },
  ].filter(Boolean) as { name: string; value: number }[]

  const card: React.CSSProperties = {
    background: 'var(--c-bg-card)', border: 'var(--b-base)', borderRadius: 16,
    padding: '24px 28px',
  }

  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={card}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>

          {/* ── Left — Text breakdown ── */}
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--c-accent-gold)', marginBottom: 12 }}>
              Estimate Summary
            </h2>
            <div style={{ fontSize: 13, color: 'var(--c-text-2)', lineHeight: 1.7, marginBottom: 16 }}>
              {includeKitchen ? (
                <div>Kitchen: <b>{k.shape}</b> · Finish: <b>{k.finish}</b> · Run: <b>{comp.totalRun?.toFixed(1)} ft</b></div>
              ) : <div>Kitchen: Not included</div>}
              {includeWardrobe ? (
                <div>Wardrobe: <b>{comp.width?.toFixed(1)} ft</b> wide · Finish: <b>{w.finish}</b></div>
              ) : <div>Wardrobe: Not included</div>}
            </div>

            {/* Bar rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {chartData.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 140, fontSize: 12, color: 'var(--c-text-2)', flexShrink: 0 }}>{p.label}</div>
                  <div style={{ flex: 1, height: 8, borderRadius: 999, background: 'var(--c-bg-tint)', overflow: 'hidden' }}>
                    <div style={{ height: 8, borderRadius: 999, background: GOLD_PALETTE[i % GOLD_PALETTE.length], width: `${(p.value / max) * 100}%`, transition: 'width 0.5s' }} />
                  </div>
                  <div style={{ width: 110, textAlign: 'right', fontSize: 12, fontWeight: 600, color: 'var(--c-text)' }}>
                    <Money v={p.value} />
                  </div>
                </div>
              ))}
            </div>

            {/* Grand total */}
            <div style={{
              marginTop: 20, padding: '16px 24px', borderRadius: 12, textAlign: 'center',
              background: 'var(--c-navy)', color: 'var(--c-gold)', fontFamily: 'var(--f-serif)',
              fontSize: 22, fontWeight: 700,
            }}>
              Grand Total: <Money v={total} />
            </div>

            {/* WhatsApp CTA */}
            <a href={CONTACT.waLink1} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'block', marginTop: 16, padding: '12px 20px', borderRadius: 10, textAlign: 'center',
                background: '#25D366', color: '#fff', fontWeight: 600, fontSize: 14,
                textDecoration: 'none',
              }}>
              📱 Get Accurate Quote on WhatsApp →
            </a>
          </div>

          {/* ── Right — Charts ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--c-accent-gold)', marginBottom: 8 }}>Cost Breakdown (₹)</div>
              <div style={{ background: 'var(--c-bg)', border: 'var(--b-base)', borderRadius: 12, padding: 12 }}>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="label" tick={{ fontSize: 10, fill: 'var(--c-text-2)' }} interval={0} />
                    <Tooltip formatter={(v: number | string) => `₹${Math.round(Number(v)).toLocaleString()}`} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {chartData.map((_, i) => <Cell key={i} fill={GOLD_PALETTE[i % GOLD_PALETTE.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--c-accent-gold)', marginBottom: 8 }}>Kitchen vs Wardrobe</div>
              <div style={{ background: 'var(--c-bg)', border: 'var(--b-base)', borderRadius: 12, padding: 12 }}>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={pieData.length ? pieData : [{ name: 'No items', value: 1 }]}
                      cx="50%" cy="50%" outerRadius={60} dataKey="value" labelLine={false}
                      label={({ name, percent }: PieLabelRenderProps) =>
                        `${name ?? ''} ${((typeof percent === 'number' ? percent : 0) * 100).toFixed(0)}%`
                      }>
                      {(pieData.length ? pieData : [{ name: '', value: 1 }]).map((_, i) => (
                        <Cell key={i} fill={GOLD_PALETTE[i % GOLD_PALETTE.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number | string) => `₹${Math.round(Number(v)).toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Assumptions */}
        <div style={{ marginTop: 24, fontSize: 12, color: 'var(--c-text-2)' }}>
          <div style={{ fontWeight: 600, color: 'var(--c-accent-gold)', marginBottom: 8 }}>Assumptions</div>
          <ul style={{ paddingLeft: 20, lineHeight: 1.8, margin: 0 }}>
            <li>Per-wall cap for kitchen runs: 20 ft</li>
            <li>Counter depth assumed: 2 ft (visual only)</li>
            <li>Base unit height: 2.46 ft · Wall unit height: 2.0 ft</li>
            <li>Wardrobe heights: 7 ft (bottom) + 3 ft (loft)</li>
            <li>Finishes apply multipliers — Essential ×1.0, Premium ×1.25, Luxury ×1.5</li>
          </ul>
        </div>
      </div>

      {/* Sticky footer */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        padding: '12px 20px', background: 'var(--c-bg-card)', borderTop: 'var(--b-base)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backdropFilter: 'blur(8px)',
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--c-accent-gold)' }}>
          Total: <Money v={total} />
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setStep('wardrobe')}
            style={{ padding: '8px 16px', borderRadius: 8, border: 'var(--b-gold)', fontSize: 13,
              color: 'var(--c-accent-gold)', background: 'transparent', cursor: 'pointer' }}>
            ← Back
          </button>
          <button onClick={() => window.print()}
            style={{ padding: '8px 20px', borderRadius: 8, border: 'none', fontSize: 13,
              background: 'var(--c-accent-gold)', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
            Print / Save PDF
          </button>
        </div>
      </div>
    </div>
  )
}
