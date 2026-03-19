'use client'

/**
 * @file src/views/HomePage.tsx
 * @route /
 * @purpose Brand & Portfolio — show who we are, showcase work, build trust.
 *
 * TONE: Calm, editorial, studio portfolio. Let the work speak.
 * No urgency strips. No slot counts. WhatsApp appears once, at the end.
 *
 * SECTIONS:
 *  1. Hero         — Brand statement, "See Our Work" CTA, stats
 *  2. Projects     — 6 featured project cards
 *  3. Philosophy   — Who we are, pull quote + story
 *  4. Services     — 6 cards, clean, no pricing (that's /landingpage's job)
 *  5. Process      — 3-step horizontal cards
 *  6. Soft CTA     — One WhatsApp + Estimator, no pressure
 */

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { CONTACT } from '@/lib/constants'
import InstagramEmbed from '../../app/components/InstagramEmbed'
import YouTubeEmbed from '../../app/components/YouTubeEmbed'
import '@/styles/homepage.css'

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const PHONE   = '+917397330591'
const WA      = `https://wa.me/${PHONE.replace('+','')}?text=Hi%20Aesthetic%20Homes%2C%20I%27d%20like%20to%20discuss%20my%20interior%20project`

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PROJECTS = [
  { title:'Velachery 3BHK Full Home',    cat:'Full Home',  loc:'Velachery', year:'2024', color:'#1C2E3F' },
  { title:'Anna Nagar Modular Kitchen',  cat:'Kitchen',    loc:'Anna Nagar', year:'2024', color:'#1E2C3A' },
  { title:'OMR Master Bedroom Suite',    cat:'Bedroom',    loc:'OMR',        year:'2023', color:'#1A2D3E' },
  { title:'Adyar Wardrobe + Living',     cat:'Wardrobe',   loc:'Adyar',      year:'2023', color:'#1B2F40' },
  { title:'T Nagar TV Unit & Panels',    cat:'TV Unit',    loc:'T Nagar',    year:'2023', color:'#1D2B38' },
  { title:'Porur L-Shape Kitchen',       cat:'Kitchen',    loc:'Porur',      year:'2022', color:'#192D3C' },
]

const SERVICES = [
  { icon:'🏠', title:'Full Home Interiors',    desc:'Complete turnkey from concept to keys' },
  { icon:'🍳', title:'Modular Kitchens',        desc:'L, U, parallel and island layouts' },
  { icon:'🚪', title:'Wardrobes & Storage',     desc:'Floor to ceiling, sliding and hinged' },
  { icon:'📺', title:'TV Units & Panels',       desc:'Media walls, fluted panels, backlit units' },
  { icon:'🛏', title:'Bedroom Interiors',       desc:'Custom beds, dressing units, study desks' },
  { icon:'📐', title:'3D Visualization',        desc:'See your home before we build it' },
]

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
export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('hp-visible'); obs.unobserve(e.target) } }),
      { threshold: 0.08 }
    )
    pageRef.current?.querySelectorAll('.hp-reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="hp" ref={pageRef}>

      {/* ══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <section className="hp-hero" aria-label="Hero">
        {/* Background grid */}
        <div className="hp-hero__bg" aria-hidden="true">
          <div className="hp-hero__grid" />
          <div className="hp-hero__glow" />
        </div>

        {/* Thin gold rule left edge */}
        <div className="hp-hero__rule" aria-hidden="true" />

        <div className="hp-hero__inner">
          <div className="hp-hero__label">Interior Design Studio · Chennai · Est. 2015</div>

          <h1 className="hp-hero__h1">
            Interior Design & Home Renovation<br />
            Services in Chennai
          </h1>

          <p className="hp-hero__sub">
            53 projects across Chennai. Every one designed from scratch,
            built by our own hands, delivered on time.
          </p>

          <div className="hp-hero__actions">
            <a href="#projects" className="hp-btn-primary">
              See Our Work
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </a>
            <Link href="/landingpage" className="hp-btn-ghost">Get a Free Quote</Link>
          </div>

          <div className="hp-hero__stats" role="list">
            {[
              { n:'53+',    l:'Projects Delivered' },
              { n:'4.9★',   l:'Google Rating'      },
              { n:'10 Yrs', l:'In Chennai'          },
              { n:'₹0',     l:'Site Visit & 3D'    },
            ].map((s, i) => (
              <div key={s.l} className="hp-stat" role="listitem">
                {i > 0 && <div className="hp-stat__sep" aria-hidden="true" />}
                <div>
                  <div className="hp-stat__n">{s.n}</div>
                  <div className="hp-stat__l">{s.l}</div>
                  {s.l === 'Google Rating' && (
                    <a
                      href={CONTACT.googleReviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="review-cta"
                    >
                      ★ Write a Review
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hp-hero__scroll" aria-hidden="true">
          <div className="hp-hero__scroll-line" />
          <span>scroll</span>
        </div>
      </section>

      {/* ══ 2. FEATURED PROJECTS ═════════════════════════════════════════════ */}
      <section className="hp-projects" id="projects" aria-labelledby="proj-heading">
        <div className="hp-container">
          <div className="hp-section-head hp-reveal">
            <span className="hp-eyebrow">Selected Work</span>
            <h2 id="proj-heading" className="hp-h2">Recent Home Interior Projects in Chennai</h2>
          </div>

          <div className="hp-proj-grid">
            {PROJECTS.map((p, i) => (
              <div
                key={p.title}
                className={`hp-proj-card hp-reveal hp-d${(i % 3) + 1}`}
              >
                {/* Image placeholder — replace with next/image when photos are ready */}
                <div className="hp-proj-card__img" style={{ background: p.color }} aria-hidden="true">
                  {/* Gold floor plan SVG for placeholder visual */}
                  <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="hp-proj-card__plan">
                    <rect x="20" y="20" width="160" height="100" stroke="#C8A96E" strokeWidth="1" fill="none" opacity="0.3"/>
                    <rect x="20" y="20" width="80" height="60" stroke="#C8A96E" strokeWidth="0.8" fill="none" opacity="0.3"/>
                    <rect x="100" y="20" width="80" height="40" stroke="#C8A96E" strokeWidth="0.8" fill="none" opacity="0.3"/>
                    <line x1="60" y1="80" x2="60" y2="120" stroke="#C8A96E" strokeWidth="0.8" opacity="0.25"/>
                    <line x1="140" y1="60" x2="140" y2="120" stroke="#C8A96E" strokeWidth="0.8" opacity="0.25"/>
                    <circle cx="100" cy="90" r="3" fill="#C8A96E" opacity="0.4"/>
                  </svg>
                  <div className="hp-proj-card__cat">{p.cat}</div>
                </div>
                <div className="hp-proj-card__body">
                  <h3 className="hp-proj-card__title">{p.title}</h3>
                  <div className="hp-proj-card__meta">{p.loc} · {p.year}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="hp-proj-footer hp-reveal">
            <Link href="/projects" className="hp-btn-outline">
              View All 53 Projects
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="social-proof-section" aria-labelledby="social-proof-heading">
        <div className="sp-container">
          <p className="sp-eyebrow">Real Work · Real Chennai Homes</p>
          <h2 id="social-proof-heading" className="sp-title">Watch our projects come to life.</h2>
          <p className="sp-sub">
            Every video and reel below is from a real Aesthetic Homes
            project - filmed on site, across Chennai homes. Modular
            kitchens, wardrobes, full home interiors and more.
          </p>

          <div className="sp-grid">
            <div className="sp-item sp-item--wide">
              <p className="sp-item__label">
                📹 Full Project Walkthrough · Chennai Home Interior
              </p>
              {/* TODO: Replace with real YouTube video ID from https://www.youtube.com/@AestheticHomes_in */}
              <YouTubeEmbed
                videoId="REPLACE_WITH_REAL_VIDEO_ID"
                title="Full home interior project walkthrough — Aesthetic Homes Chennai"
              />
              <p className="sp-item__caption">
                Watch the complete transformation of a Chennai home -
                from bare walls to fully finished interiors by our team.
              </p>
            </div>

            <div className="sp-item">
              <p className="sp-item__label">
                📸 Modular Kitchen Install · Anna Nagar
              </p>
              {/* TODO: Replace with real Instagram reel URL from https://www.instagram.com/aesthetichomes_in */}
              <InstagramEmbed
                postUrl="REPLACE_WITH_REAL_INSTAGRAM_REEL_URL"
                caption="Modular kitchen installation in Anna Nagar, Chennai"
              />
            </div>

            <div className="sp-item">
              <p className="sp-item__label">
                📸 Wardrobe Build · Velachery
              </p>
              {/* TODO: Replace with real Instagram reel URL from https://www.instagram.com/aesthetichomes_in */}
              <InstagramEmbed
                postUrl="REPLACE_WITH_REAL_INSTAGRAM_REEL_URL"
                caption="Custom wardrobe installation in Velachery, Chennai"
              />
            </div>
          </div>

          <div className="sp-follow">
            <a
              href="https://www.youtube.com/@AestheticHomes_in"
              target="_blank"
              rel="noopener noreferrer"
              className="sp-follow__link"
            >
              ▶ Watch more on YouTube
            </a>
            <a
              href="https://www.instagram.com/aesthetichomes_in"
              target="_blank"
              rel="noopener noreferrer"
              className="sp-follow__link"
            >
              ◎ Follow on Instagram
            </a>
          </div>
        </div>

        <style>{`
          .social-proof-section {
            padding: 96px 0;
            border-top: 1px solid var(--color-border, #e8e3dc);
          }
          .sp-container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 24px;
          }
          .sp-eyebrow {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: .15em;
            text-transform: uppercase;
            color: var(--color-accent, #b07d4a);
            margin-bottom: 14px;
          }
          .sp-title {
            font-size: clamp(26px, 3.5vw, 40px);
            font-weight: 400;
            margin-bottom: 16px;
            font-family: var(--font-display, Georgia, serif);
          }
          .sp-sub {
            font-size: 16px;
            line-height: 1.7;
            color: var(--color-muted, #666);
            max-width: 600px;
            margin-bottom: 48px;
          }
          .sp-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
          .sp-item--wide { grid-column: 1 / -1; }
          .sp-item__label {
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 12px;
            color: var(--color-text, #1a1a1a);
          }
          .sp-item__caption {
            font-size: 13px;
            color: var(--color-muted, #666);
            margin-top: 12px;
            line-height: 1.6;
          }
          .sp-follow {
            display: flex;
            gap: 24px;
            margin-top: 48px;
            flex-wrap: wrap;
          }
          .sp-follow__link {
            font-size: 14px;
            font-weight: 600;
            color: var(--color-text, #1a1a1a);
            text-decoration: none;
            border-bottom: 1px solid currentColor;
            padding-bottom: 2px;
          }
          .sp-follow__link:hover { opacity: .7; }
          @media (max-width: 768px) {
            .sp-grid { grid-template-columns: 1fr; }
            .sp-item--wide { grid-column: 1; }
            .social-proof-section { padding: 64px 0; }
          }
        `}</style>
      </section>

      {/* ══ 3. PHILOSOPHY ════════════════════════════════════════════════════ */}
      <section className="hp-philosophy" aria-labelledby="phil-heading">
        <div className="hp-container">
          <div className="hp-phil-inner">

            {/* Left — pull quote */}
            <div className="hp-phil-quote hp-reveal">
              <div className="hp-phil-quote__mark">&ldquo;</div>
              <blockquote className="hp-phil-quote__text">
                Good interiors don&apos;t shout.<br />
                They make you feel at home<br />
                the moment you walk in.
              </blockquote>
              <div className="hp-phil-quote__line" aria-hidden="true" />
            </div>

            {/* Right — story */}
            <div className="hp-phil-story hp-reveal hp-d2">
              <span className="hp-eyebrow">About the Studio</span>
              <h2 id="phil-heading" className="hp-h2" style={{ marginTop:12 }}>
                Why Choose Aesthetic Homes for Your Interiors?
              </h2>
              <p className="hp-phil-p">
                Aesthetic Homes was founded in Chennai in 2015 with a conviction that
                beautiful interiors shouldn&apos;t require a luxury budget — only the right
                team, the right process, and complete honesty with the client.
              </p>
              <p className="hp-phil-p">
                As one of the top interior designers in Chennai, we specialize in turnkey home interiors that seamlessly blend budget-friendly luxury with exceptional craftsmanship.
              </p>
              <p className="hp-phil-p">
                We handle everything in-house. Our designer is your project manager.
                Our carpenters work only for us. There is no subcontracting,
                no handoffs, no surprises on the bill.
              </p>
              <p className="hp-phil-p">
                Every project starts with a free site visit and ends with a GST
                invoice and a 1-year workmanship warranty.
                That is the Aesthetic Homes guarantee.
              </p>
              <Link href="/about" className="hp-text-link">
                Meet the team →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ══ 4. SERVICES ══════════════════════════════════════════════════════ */}
      <section className="hp-services" aria-labelledby="svc-heading">
        <div className="hp-container">
          <div className="hp-section-head hp-reveal">
            <span className="hp-eyebrow">Our Services</span>
            <h2 id="svc-heading" className="hp-h2">Our Custom Interior Design Services</h2>
          </div>

          <div className="hp-svc-grid">
            {SERVICES.map((s, i) => (
              <div key={s.title} className={`hp-svc-card hp-reveal hp-d${(i % 3) + 1}`}>
                <div className="hp-svc-card__icon" aria-hidden="true">{s.icon}</div>
                <div className="hp-svc-card__title">{s.title}</div>
                <div className="hp-svc-card__desc">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="hp-svc-footer hp-reveal">
            <Link href="/services" className="hp-btn-outline">
              View All Services &amp; Pricing →
            </Link>
            <div style={{ display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap', marginTop: 18 }}>
              <Link href="/green" className="hp-text-link">
                Explore Green Solutions →
              </Link>
              <Link href="/partners" className="hp-text-link">
                Partner With Us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. PROCESS ═══════════════════════════════════════════════════════ */}
      <section className="hp-process" aria-labelledby="process-heading">
        <div className="hp-container">
          <div className="hp-section-head hp-reveal">
            <span className="hp-eyebrow">How It Works</span>
            <h2 id="process-heading" className="hp-h2">Our Transparent 3-Step Design Process</h2>
          </div>

          <div className="hp-process-grid">
            {[
              {
                n: '01',
                title: 'Free Site Visit',
                body: 'We come to you, take precise measurements, and understand your vision — anywhere in Chennai, no travel charge.',
                note: 'Same week · Free',
              },
              {
                n: '02',
                title: '3D Design & Quote',
                body: 'Photorealistic renders and a line-item cost breakdown in 3–5 days. Revise until you love it. You commit nothing.',
                note: '3–5 days · Free',
              },
              {
                n: '03',
                title: 'We Build It',
                body: 'Fixed price. Fixed delivery date. Daily WhatsApp updates. One team from first nail to final handover.',
                note: 'Fixed price · 1-yr warranty',
              },
            ].map((s, i) => (
              <div key={s.n} className={`hp-process-card hp-reveal hp-d${i + 1}`}>
                <div className="hp-process-card__n" aria-hidden="true">{s.n}</div>
                <div className="hp-process-card__title">{s.title}</div>
                <p className="hp-process-card__body">{s.body}</p>
                <div className="hp-process-card__note">{s.note}</div>
              </div>
            ))}
          </div>

          <div className="hp-process-footer hp-reveal">
            <Link href="/landingpage#process" className="hp-text-link">
              See the full 5-step process →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 6. SOFT CTA ══════════════════════════════════════════════════════ */}
      <section className="hp-cta" aria-labelledby="cta-heading">
        <div className="hp-cta__inner hp-reveal">
          <h2 id="cta-heading" className="hp-cta__h2">
            Ready to see what your home<br /><em>could look like?</em>
          </h2>
          <p className="hp-cta__sub">
            Free site visit. Free 3D design. No commitment needed.
          </p>
          <div className="hp-cta__actions">
            <a href={WA} className="hp-btn-wa" target="_blank" rel="noopener noreferrer">
              <WaIcon /> WhatsApp Us
            </a>
            <Link href="/estimator" className="hp-btn-outline hp-btn-outline--light">
              Try the Estimator →
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
