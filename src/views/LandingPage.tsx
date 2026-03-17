'use client'

/**
 * @file src/views/LandingPage.tsx
 * @route /landingpage
 * @purpose Conversion — get visitor to WhatsApp or book a site visit.
 *
 * TONE: Urgent, direct, high-trust.
 * SECTIONS:
 *  1. Hero          — Full viewport, strong H1, dual CTA, stats
 *  2. Urgency strip — Slot scarcity
 *  3. Pain → Promise — 4 problems flipped to 4 guarantees
 *  4. Services       — 6 cards with pricing anchors
 *  5. Inline CTA     — Mid-page WhatsApp nudge
 *  6. Process        — 5-step "free till you commit" flow
 *  7. Testimonials   — 4 specific reviews
 *  8. Estimator CTA  — Callout to /estimator with mock UI
 *  9. Big CTA        — Emotional close
 * 10. Areas          — Local SEO tags
 * 11. FAQ            — Accordion
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import '@/styles/landing.css'

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const PHONE     = '+917397330591'
const PHONE_DIS = '+91 73973 30591'
const YEARS     = '10'
const PROJECTS  = '53'
const RATING    = '4.9'

const WA_VISIT = `https://wa.me/${PHONE.replace('+','')}?text=Hi%20Aesthetic%20Homes%2C%20I%27d%20like%20a%20free%20site%20visit`
const WA_QUOTE = `https://wa.me/${PHONE.replace('+','')}?text=Hi%2C%20I%27d%20like%20to%20know%20the%20cost%20for%20my%20interior%20project%20in%20Chennai`
const WA_FINAL = `https://wa.me/${PHONE.replace('+','')}?text=Hi%20Aesthetic%20Homes%2C%20I%27d%20like%20a%20free%20site%20visit%20for%20my%20home%20interior%20project`

// ─── DATA ─────────────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { init:'P', name:'Priya Suresh',        loc:'Adyar · Modular Kitchen',       body:'Quoted ₹2.8L for our modular kitchen. Delivered at exactly ₹2.8L. On day 18. The finish is stunning — neighbours keep asking who did it.' },
  { init:'R', name:'Raghav & Deepa',      loc:'Anna Nagar · Full Home',         body:'3BHK full home interior. Every room looked exactly like the 3D renders. No budget overruns, no site drama. Just a beautiful home delivered.' },
  { init:'K', name:'Karthik Menon',       loc:'Velachery · Wardrobes + Living', body:'After two bad experiences with other designers, Aesthetic Homes was a breath of fresh air. Honest pricing, responsive team, quality finish.' },
  { init:'M', name:'Meena Krishnamurthy', loc:'OMR · Kitchen + Master Bedroom', body:"Loved that the free 3D design was actually good — not a lazy render. We revised 3 times, they never complained. That's how you build trust." },
]

const STEPS = [
  { n:'1', title:'You WhatsApp us',           body:'Tell us your flat size, location and what you need. We respond within the hour.',                                         tag:'Free' },
  { n:'2', title:'We visit your site',         body:'Our designer comes to your home, takes precise measurements. Anywhere in Chennai — no travel charge.',                   tag:'Free · Same week' },
  { n:'3', title:'We present your 3D design',  body:'Within 3–5 days we share photorealistic 3D renders with a detailed line-item cost breakdown. Tweak until you love it.', tag:'Free · No obligation' },
  { n:'4', title:'You approve & we begin',     body:'Happy with design and price? We sign a contract with a fixed delivery date. Daily WhatsApp updates throughout.',         tag:'Fixed price · Fixed date' },
  { n:'5', title:'Handover & warranty',        body:'Final walkthrough, punch-list cleared. GST invoice. 1-year workmanship warranty. Your home is ready.',                  tag:'1-year warranty' },
]

const SERVICES = [
  { icon:'🏠', title:'Full Home Interiors',   desc:'End-to-end turnkey — concept, 3D, carpentry, electrical, painting, handover.', price: null },
  { icon:'🍳', title:'Modular Kitchen',        desc:'L, U, parallel & island layouts. Marine ply carcass. Acrylic/laminate shutters.',  price:'From ₹85,000' },
  { icon:'🚪', title:'Wardrobes & Storage',    desc:'Sliding, hinged, walk-in, loft units. Custom fittings and full-height designs.',   price:'From ₹45,000' },
  { icon:'📺', title:'TV Units & Wall Panels', desc:'Media walls, floating consoles, fluted panels, backlit units.',                   price:'From ₹18,000' },
  { icon:'🛏', title:'Bedroom Interiors',      desc:'Custom beds, side tables, dressing units, study desks and wardrobe combos.',       price: null },
  { icon:'📐', title:'3D Visualization',       desc:'Photorealistic renders before a single nail is placed.',                          price:'Free with every project' },
]

const FAQS = [
  { q:'How much does a modular kitchen cost in Chennai?',      a:'A straight/linear modular kitchen starts at ₹85,000 with laminate finish. L-shape and U-shape layouts start at ₹1.2L. Prices depend on wall length, material grade and fittings. We provide a detailed line-item quote after the free site visit.' },
  { q:'Do you charge for the site visit and 3D design?',        a:'No. The site visit, measurements and 3D design presentation are completely free. You commit nothing until you approve the design and price. Many clients take 2–3 revision rounds before finalising.' },
  { q:'How long does a modular kitchen installation take?',     a:'Modular kitchens take 15–20 working days from order confirmation. Full home interiors take 45–60 days. We put the delivery date in the contract and stick to it.' },
  { q:'Do you work outside Chennai?',                           a:'We cover all of Chennai plus Kanchipuram, Chengalpattu, Mahabalipuram and up to 100km radius. Site visits within this range are free.' },
  { q:'What warranty do you provide?',                          a:'We provide a 1-year workmanship warranty on all carpentry and execution work. You also receive a GST invoice at handover.' },
  { q:'Can I see your past projects?',                          a:`Yes — visit the Projects page to see all ${PROJECTS} completed projects with photos, area, scope and budget range.` },
]

const AREAS = ['Adyar','Anna Nagar','Velachery','OMR','Porur','Kodambakkam','Nungambakkam','T Nagar','Mylapore','Perambur','Ambattur','Avadi','Madipakkam','Thoraipakkam','Sholinganallur']

// ─── WA ICON ──────────────────────────────────────────────────────────────────
function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.118 1.533 5.845L.057 23.776a.5.5 0 0 0 .612.612l5.967-1.47A11.948 11.948 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.96 0-3.8-.54-5.37-1.48l-.38-.23-3.543.875.89-3.465-.25-.39C2.54 15.8 2 13.96 2 12 2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const slotCount = ['2','3','3','4'][Math.floor(Date.now() / 86400000) % 4]

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    pageRef.current?.querySelectorAll('.lp-reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="lp" ref={pageRef}>

      {/* ══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <section className="lp-hero" aria-label="Hero">
        <div className="lp-hero__grid" aria-hidden="true" />
        <svg className="lp-hero__arch" viewBox="0 0 500 800" fill="none" aria-hidden="true">
          <line x1="100" y1="0" x2="100" y2="800" stroke="#C8A96E" strokeWidth="0.5"/>
          <line x1="200" y1="0" x2="200" y2="800" stroke="#C8A96E" strokeWidth="0.5"/>
          <line x1="300" y1="0" x2="300" y2="800" stroke="#C8A96E" strokeWidth="0.5"/>
          <line x1="400" y1="0" x2="400" y2="800" stroke="#C8A96E" strokeWidth="0.5"/>
          <line x1="0" y1="100" x2="500" y2="100" stroke="#C8A96E" strokeWidth="0.5"/>
          <line x1="0" y1="350" x2="500" y2="350" stroke="#C8A96E" strokeWidth="0.5"/>
          <line x1="0" y1="600" x2="500" y2="600" stroke="#C8A96E" strokeWidth="0.5"/>
          <rect x="50" y="120" width="400" height="200" stroke="#C8A96E" strokeWidth="1" fill="none"/>
          <rect x="100" y="140" width="300" height="100" stroke="#C8A96E" strokeWidth="0.5" fill="none" strokeDasharray="4 4"/>
        </svg>

        <div className="lp-hero__content">
          <div className="lp-hero__badge">Chennai&apos;s Trusted Interior Design Studio</div>
          <h1 className="lp-hero__h1">
            Your home should make you feel<br />
            <em>something extraordinary</em><br />
            <strong>— not cost a fortune.</strong>
          </h1>
          <p className="lp-hero__sub">
            <b>{YEARS} years. {PROJECTS} homes. {RATING}★ across Chennai.</b><br />
            Modular kitchens, wardrobes, full home interiors — delivered on time, within budget.
            Free site visit. Free 3D design. No commitment until you love it.
          </p>
          <div className="lp-hero__ctas">
            <a href={WA_VISIT} className="lp-btn-wa lp-btn-wa--lg" target="_blank" rel="noopener noreferrer">
              <WaIcon /> Get Free Site Visit
            </a>
            <a href={`tel:${PHONE}`} className="lp-btn-ghost">☎ {PHONE_DIS}</a>
          </div>
          <div className="lp-hero__stats">
            <div><div className="lp-hero__stat-n">{PROJECTS}+</div><div className="lp-hero__stat-l">Projects Done</div></div>
            <div className="lp-hero__stat-sep" />
            <div><div className="lp-hero__stat-n">{RATING}★</div><div className="lp-hero__stat-l">Google Rating</div></div>
            <div className="lp-hero__stat-sep" />
            <div><div className="lp-hero__stat-n">{YEARS} Yrs</div><div className="lp-hero__stat-l">In Chennai</div></div>
            <div className="lp-hero__stat-sep" />
            <div><div className="lp-hero__stat-n">₹0</div><div className="lp-hero__stat-l">For 3D Design</div></div>
          </div>
        </div>
      </section>

      {/* ══ 2. URGENCY ═══════════════════════════════════════════════════════ */}
      <div className="lp-urgency">
        <span>
          <span className="lp-pulse" />
          Only <strong>{slotCount} site visit slots</strong> remaining this week in Chennai — Book yours free now
        </span>
      </div>

      {/* ══ 3. PAIN → PROMISE ════════════════════════════════════════════════ */}
      <section className="lp-pain" aria-labelledby="pain-heading">
        <div className="lp-container">
          <div className="lp-section-header lp-reveal">
            <div className="lp-eyebrow">Why Aesthetic Homes</div>
            <h2 id="pain-heading" className="lp-h2">The problem with most<br /><em>interior designers in Chennai</em></h2>
            <p className="lp-sub">We&apos;ve heard it all — from the {PROJECTS} families who came to us after bad experiences elsewhere.</p>
          </div>
          <div className="lp-pain-grid">
            {[
              { icon:'😤', title:'Quotes that keep climbing',     body:'You sign at ₹4L, they deliver at ₹7L. "Additional work" is always your problem.' },
              { icon:'🐌', title:'Deadlines that slip for months', body:"Your kitchen was promised in 30 days. It's been 90. You're eating out every day." },
              { icon:'🤷', title:'No one to call on-site',         body:"The designer disappears. The contractor doesn't answer. You're managing labourers yourself." },
              { icon:'🎭', title:'3D looks nothing like reality',  body:'Beautiful renders, shoddy execution. What you imagined and what you got are different homes.' },
            ].map((c, i) => (
              <div key={c.title} className={`lp-pain-card lp-reveal lp-d${i+1}`}>
                <span className="lp-pain-card__icon">{c.icon}</span>
                <div className="lp-pain-card__title">{c.title}</div>
                <p className="lp-pain-card__body">{c.body}</p>
              </div>
            ))}
            {[
              { icon:'📋', title:'Line-item quote. Fixed price.',    body:'Every material, fitting, labour charge — listed before you sign. The number we quote is the number you pay.' },
              { icon:'📅', title:'Date committed. Date delivered.',  body:'Modular kitchens in 15–20 days. Full homes in 45–60 days. We put the deadline in writing.' },
              { icon:'🤝', title:'One team. Design to handover.',    body:'Your designer is your execution manager. One number to call. One person responsible. No outsourcing.' },
              { icon:'🏆', title:'What we render, we build.',        body:'Our 3D team works from the same specs as our carpenters. The render is the contract.' },
            ].map((c, i) => (
              <div key={c.title} className={`lp-pain-card lp-pain-card--promise lp-reveal lp-d${i+1}`}>
                <span className="lp-pain-card__icon">{c.icon}</span>
                <div className="lp-pain-card__title">{c.title}</div>
                <p className="lp-pain-card__body">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. SERVICES ══════════════════════════════════════════════════════ */}
      <section className="lp-services" aria-labelledby="svc-heading">
        <div className="lp-container">
          <div className="lp-section-header lp-reveal">
            <div className="lp-eyebrow">What We Build</div>
            <h2 id="svc-heading" className="lp-h2">Every room.<br /><em>Every budget.</em></h2>
            <p className="lp-sub">From a single modular kitchen to a complete 4BHK — everything under one roof.</p>
          </div>
          <div className="lp-svc-grid">
            {SERVICES.map((s, i) => (
              <div key={s.title} className={`lp-svc-card lp-reveal lp-d${(i%3)+1}`}>
                <div className="lp-svc-icon">{s.icon}</div>
                <div>
                  <div className="lp-svc-title">{s.title}</div>
                  <div className="lp-svc-desc">{s.desc}</div>
                  {s.price && <span className="lp-svc-price">{s.price}</span>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:32 }} className="lp-reveal">
            <Link href="/services" className="lp-btn-ghost">View All Services →</Link>
          </div>
        </div>
      </section>

      {/* ══ 5. INLINE CTA ════════════════════════════════════════════════════ */}
      <div className="lp-inline-cta">
        <p>&ldquo;Not sure how much your project will cost?<br />Get a free estimate — we&apos;ll visit, measure and quote. No obligation.&rdquo;</p>
        <a href={WA_QUOTE} className="lp-btn-wa" target="_blank" rel="noopener noreferrer">
          <WaIcon /> WhatsApp for Free Quote
        </a>
      </div>

      {/* ══ 6. PROCESS ═══════════════════════════════════════════════════════ */}
      <section className="lp-process" aria-labelledby="process-heading">
        <div className="lp-container">
          <div className="lp-section-header lp-reveal">
            <div className="lp-eyebrow">How It Works</div>
            <h2 id="process-heading" className="lp-h2">From WhatsApp to<br /><em>dream home</em> — in 5 steps</h2>
            <p className="lp-sub">You commit nothing until step 4. Everything before that is on us.</p>
          </div>
          <div className="lp-process-steps">
            {STEPS.map(s => (
              <div key={s.n} className="lp-process-step lp-reveal">
                <div className="lp-process-num">{s.n}</div>
                <div>
                  <div className="lp-process-title">{s.title}</div>
                  <p className="lp-process-body">{s.body}</p>
                  <span className="lp-process-tag">{s.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 7. TESTIMONIALS ══════════════════════════════════════════════════ */}
      <section className="lp-testimonials" aria-labelledby="testi-heading">
        <div className="lp-container">
          <div className="lp-section-header lp-reveal">
            <div className="lp-eyebrow">{PROJECTS}+ Happy Families</div>
            <h2 id="testi-heading" className="lp-h2">They trusted us.<br /><em>Here&apos;s what they said.</em></h2>
          </div>
          <div className="lp-testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`lp-testi-card lp-reveal lp-d${i+1}`}>
                <div className="lp-testi-stars">★★★★★</div>
                <p className="lp-testi-body">&ldquo;{t.body}&rdquo;</p>
                <div className="lp-testi-author">
                  <div className="lp-testi-avatar">{t.init}</div>
                  <div>
                    <div className="lp-testi-name">{t.name}</div>
                    <div className="lp-testi-loc">{t.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. ESTIMATOR CALLOUT ═════════════════════════════════════════════ */}
      <section className="lp-estimator" aria-labelledby="est-heading">
        <div className="lp-container">
          <div className="lp-est-inner">
            <div className="lp-reveal">
              <div className="lp-eyebrow">Free Budget Estimator</div>
              <h2 id="est-heading" className="lp-h2">Know your budget<br /><em>before you call us.</em></h2>
              <p className="lp-sub" style={{ marginBottom:28 }}>
                Our 2-minute interactive estimator lets you draw your kitchen layout, pick your
                wardrobe size and finish — and see a live rupee breakdown. No forms. No email. Just answers.
              </p>
              <div className="lp-est-steps">
                {[
                  { n:'1', title:'Draw your kitchen',         desc:'Linear, L-shape, U-shape or Parallel. Set wall lengths. See a live 2D plan update in real time.' },
                  { n:'2', title:'Configure your wardrobe',   desc:'Width, height, loft, finish — a 2D elevation draws itself as you type.' },
                  { n:'3', title:'Get your budget breakdown', desc:'Live bar chart. Kitchen vs wardrobe split. Grand total. WhatsApp your summary instantly.' },
                ].map(s => (
                  <div key={s.n} className="lp-est-step">
                    <div className="lp-est-step-num">{s.n}</div>
                    <div>
                      <div className="lp-est-step-title">{s.title}</div>
                      <div className="lp-est-step-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginTop:32, alignItems:'center' }}>
                <Link href="/estimator" className="lp-btn-gold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/>
                    <line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>
                  </svg>
                  Try the Free Estimator
                </Link>
                <span className="lp-est-note">No login · Takes 2 minutes</span>
              </div>
            </div>

            {/* Mock UI */}
            <div className="lp-reveal lp-d2" aria-hidden="true">
              <div className="lp-est-mock">
                <div className="lp-est-mock__bar">
                  <span className="lp-est-mock__dot" style={{background:'#ff5f57'}} />
                  <span className="lp-est-mock__dot" style={{background:'#febc2e'}} />
                  <span className="lp-est-mock__dot" style={{background:'#28c840'}} />
                  <span className="lp-est-mock__title">Budget Estimator — Kitchen + Wardrobe</span>
                </div>
                <div className="lp-est-mock__body">
                  <div className="lp-est-mock__tabs">
                    <div className="lp-est-mock__tab lp-est-mock__tab--active">Kitchen</div>
                    <div className="lp-est-mock__tab">Wardrobe</div>
                    <div className="lp-est-mock__tab">Summary</div>
                  </div>
                  <div className="lp-est-mock__row">
                    <span className="lp-est-mock__label">SHAPE</span>
                    <div className="lp-est-mock__shapes">
                      <span className="lp-est-mock__shape lp-est-mock__shape--active">Linear</span>
                      <span className="lp-est-mock__shape">L-shape</span>
                      <span className="lp-est-mock__shape">U-shape</span>
                      <span className="lp-est-mock__shape">Parallel</span>
                    </div>
                  </div>
                  <div className="lp-est-mock__inputs">
                    <div className="lp-est-mock__ig">
                      <div className="lp-est-mock__label">A length (ft)</div>
                      <div className="lp-est-mock__input">10</div>
                    </div>
                    <div className="lp-est-mock__ig">
                      <div className="lp-est-mock__label">Finish</div>
                      <div className="lp-est-mock__input">Premium ▾</div>
                    </div>
                  </div>
                  <div className="lp-est-mock__canvas">
                    <svg viewBox="0 0 260 120" fill="none">
                      <rect x="20" y="28" width="180" height="36" fill="rgba(200,169,110,0.12)" stroke="#C8A96E" strokeWidth="1.2"/>
                      <rect x="70" y="34" width="40" height="24" rx="3" fill="rgba(248,113,113,0.22)" stroke="#C8A96E" strokeWidth="1"/>
                      <circle cx="80" cy="40" r="4" fill="none" stroke="#C8A96E" strokeWidth="0.8"/>
                      <circle cx="100" cy="40" r="4" fill="none" stroke="#C8A96E" strokeWidth="0.8"/>
                      <circle cx="80" cy="52" r="4" fill="none" stroke="#C8A96E" strokeWidth="0.8"/>
                      <circle cx="100" cy="52" r="4" fill="none" stroke="#C8A96E" strokeWidth="0.8"/>
                      <rect x="130" y="34" width="30" height="24" rx="3" fill="rgba(96,165,250,0.22)" stroke="#C8A96E" strokeWidth="1"/>
                      <circle cx="145" cy="46" r="4" fill="none" stroke="#C8A96E" strokeWidth="0.8"/>
                      <line x1="20" y1="14" x2="200" y2="14" stroke="#C8A96E" strokeWidth="0.8"/>
                      <polygon points="20,11 26,14 20,17" fill="#C8A96E"/>
                      <polygon points="200,11 194,14 200,17" fill="#C8A96E"/>
                      <text x="110" y="11" textAnchor="middle" fontSize="8" fill="#C8A96E" fontFamily="sans-serif">10.0 ft</text>
                    </svg>
                  </div>
                  <div className="lp-est-mock__total">
                    <div className="lp-est-mock__total-label">Estimated Total</div>
                    <div className="lp-est-mock__total-value">₹2,46,000</div>
                    <div className="lp-est-mock__total-sub">Kitchen ₹1,53,750 · Wardrobe ₹92,250</div>
                  </div>
                </div>
              </div>
              <div className="lp-est-hint">↑ Static preview — interact with the real estimator</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 9. BIG CTA ═══════════════════════════════════════════════════════ */}
      <section className="lp-cta" aria-labelledby="cta-heading">
        <div className="lp-container">
          <div className="lp-cta__badge">
            <span className="lp-pulse" />Free Site Visits Open This Week
          </div>
          <h2 id="cta-heading" className="lp-cta__h2 lp-reveal">
            Your home is waiting.<br /><em>One message is all it takes.</em>
          </h2>
          <p className="lp-cta__sub lp-reveal">
            We visit, we measure, we design, we quote.<br />
            All free. All before you spend a single rupee.
          </p>
          <div className="lp-cta__pills lp-reveal">
            {['Free site visit','Free 3D design','Fixed price quote','No commitment','GSTIN registered'].map(p => (
              <span key={p} className="lp-pill">{p}</span>
            ))}
          </div>
          <div className="lp-cta__actions lp-reveal">
            <a href={WA_FINAL} className="lp-btn-wa lp-btn-wa--lg" target="_blank" rel="noopener noreferrer">
              <WaIcon /> Book Free Site Visit on WhatsApp
            </a>
            <a href={`tel:${PHONE}`} style={{ fontSize:'0.85rem', color:'rgba(244,239,232,0.35)', textDecoration:'none' }}>
              Or call {PHONE_DIS}
            </a>
          </div>
          <div className="lp-cta__live lp-reveal">
            <span className="lp-pulse" style={{ background:'#25D366' }} />
            Responding to WhatsApp messages · Mon – Sat, 9am – 7pm
          </div>
        </div>
      </section>

      {/* ══ 10. AREAS ════════════════════════════════════════════════════════ */}
      <div className="lp-areas" role="region" aria-label="Service areas">
        <div className="lp-areas__label">We serve all of Chennai &amp; beyond</div>
        <div className="lp-areas__tags">
          {AREAS.map(a => <span key={a} className="lp-area-tag">{a}</span>)}
        </div>
      </div>

      {/* ══ 11. FAQ ══════════════════════════════════════════════════════════ */}
      <section className="lp-faq" aria-labelledby="faq-heading">
        <div className="lp-container">
          <div className="lp-section-header lp-reveal">
            <div className="lp-eyebrow">FAQs</div>
            <h2 id="faq-heading" className="lp-h2">Common questions about<br /><em>interior design in Chennai</em></h2>
          </div>
          <div className="lp-faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className={`lp-faq-item${openFaq === i ? ' open' : ''}`}>
                <button
                  className="lp-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  {faq.q}
                  <span className="lp-faq-icon" aria-hidden="true">+</span>
                </button>
                <div className="lp-faq-a" aria-hidden={openFaq !== i}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FLOATING WA ══════════════════════════════════════════════════════ */}
      <a href={WA_VISIT} className="lp-float-wa" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <WaIcon />
        <span className="lp-float-wa__tip">Chat on WhatsApp</span>
      </a>

    </div>
  )
}
