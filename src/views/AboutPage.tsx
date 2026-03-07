/**
 * @file src/views/AboutPage.tsx
 * @description About Us — brand story, stats, trust signals, address.
 *
 * PAGE SECTIONS
 * ─────────────
 * 1. Dark hero with brand description
 * 2. Stats grid  — 4 key numbers (founded, projects, rating, GSTIN)
 * 3. Why us      — 6 differentiator cards
 * 4. Team        — Fetched from Sanity (team members)
 * 5. Address     — Physical address for LocalBusiness SEO
 * 6. CTA strip
 *
 * SEO
 * ───
 * • Physical address prominently rendered (boosts LocalBusiness schema confidence)
 * • GSTIN displayed as visible trust signal
 * • "About" page linked from Organization schema sameAs
 *
 * DATA
 * ────
 * Team members: fetched from Sanity via useSanity hook.
 * All other content is static from constants.ts.
 */

import Seo from '@/components/seo/Seo'
import { PageHero, StatCard, SectionHeader, CtaStrip, Spinner } from '@/components/ui'
import { useSanity } from '@/lib/hooks'
import { QUERIES, imgUrl } from '@/lib/sanity'
import { SITE, CONTACT, SOCIAL } from '@/lib/constants'
import { useReveal } from '@/lib/hooks'
import type { TeamMember, ViewName } from '@/types'

const WHY_US = [
  { icon:'🏗', title:'Budget Specialists',      desc:'We specialise in making premium interiors accessible. Every project receives the same care regardless of budget.' },
  { icon:'📐', title:'Free 3D Before You Commit', desc:'No commitment needed. We present a full 3D visualisation before you sign anything.' },
  { icon:'✅', title:'GSTIN Registered',        desc:`Proper GST invoices for every project. GSTIN: ${SITE.gstin}. 100% transparent billing.` },
  { icon:'📍', title:'100km Service Radius',    desc:'All of Chennai plus Kanchipuram, Chengalpattu, Pondicherry, Vellore and Sriperumbudur.' },
  { icon:'🔨', title:'In-house Team Only',      desc:'No subcontracting. Our own trained craftsmen on every project — consistent quality, direct accountability.' },
  { icon:'📱', title:'HomeFix Digital Platform', desc:'Order modular furniture online at homefix.co.in — transparent pricing, 3D planning, free installation.' },
]

interface Props {
  onNav?: (v: ViewName) => void
}

export default function AboutPage({ onNav: _onNav }: Props = {}) {
  const { data: team, loading: teamLoading } = useSanity<TeamMember[]>(QUERIES.teamMembers)
  const revealRef = useReveal()

  return (
    <>
      <Seo
        title={`About Aesthetic Homes — ${SITE.yearsInBiz} Years of Interior Design in Chennai`}
        description={`Aesthetic Homes has been delivering budget-friendly luxury interiors in Chennai since ${SITE.founded}. GSTIN: ${SITE.gstin}. ${SITE.projectCount} projects, ${SITE.rating}★ rated. Registered at ${CONTACT.address.full}.`}
        canonical={`${SITE.url}/#about`}
      />

      <div ref={revealRef}>

        {/* ── Hero ── */}
        <PageHero
          eyebrow="About Us"
          title={<>{SITE.yearsInBiz} Years of <em>Crafting Homes</em> in Chennai</>}
          subtitle={`Founded in ${SITE.founded}, ${SITE.name} has completed ${SITE.projectCount}+ projects across Chennai. We believe luxury is about how a space makes you feel — not just what it costs.`}
        />

        {/* ── Stats ── */}
        <section className="sec sec--tint" aria-label="Key statistics">
          <div className="container">
            <div className="grid-auto-4">
              <StatCard number={String(SITE.founded)} label="Year Founded"    detail={`${SITE.yearsInBiz}+ years in business`} />
              <StatCard number={`${SITE.projectCount}+`} label="Projects"    detail="Completed across Chennai" />
              <StatCard number={`${SITE.rating}★`}    label="Google Rating"  detail={`${SITE.reviewCount}+ verified reviews`} />
              <StatCard number="GSTIN"                  label="Registered"    detail={SITE.gstin} />
            </div>
          </div>
        </section>

        {/* ── Why Us ── */}
        <section className="sec" aria-labelledby="why-us-heading">
          <div className="container">
            <SectionHeader
              eyebrow="Why Choose Us"
              title={<>What Makes Us <em>Different</em></>}
            />
            <div className="grid-auto-3">
              {WHY_US.map((item, i) => (
                <div key={item.title} className={`reveal reveal-delay-${(i % 4) + 1}`} style={{ padding:'var(--sp-5)' }}>
                  <div style={{ fontSize:'1.6rem', marginBottom:'var(--sp-3)' }} aria-hidden="true">{item.icon}</div>
                  <h3 style={{ fontFamily:'var(--f-serif)', fontSize:'var(--fs-lg)', color:'var(--c-navy)', marginBottom:'var(--sp-2)' }}>{item.title}</h3>
                  <p style={{ fontSize:'var(--fs-base)', color:'var(--c-text-2)', lineHeight:'var(--lh-relax)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        {(teamLoading || (team && team.length > 0)) && (
          <section className="sec sec--linen" aria-labelledby="team-heading">
            <div className="container">
              <SectionHeader eyebrow="Our Team" title={<>The People Behind <em>Every Project</em></>} />
              {teamLoading ? (
                <Spinner />
              ) : (
                <div className="grid-auto-3">
                  {team!.map((member, i) => (
                    <div key={member._id} className={`card reveal reveal-delay-${(i % 4) + 1}`} style={{ padding:'var(--sp-5)', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:'var(--sp-3)' }}>
                      {/* Avatar */}
                      <div style={{ width:72, height:72, borderRadius:'var(--r-full)', overflow:'hidden', flexShrink:0, border:'2px solid var(--c-gold-tint)' }}>
                        {member.photo ? (
                          <img src={imgUrl(member.photo, 144, 144, 'crop')} alt={member.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                        ) : (
                          <div style={{ width:'100%', height:'100%', background:'var(--c-bg-tint)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--f-serif)', fontSize:'var(--fs-xl)', color:'var(--c-gold)' }}>
                            {member.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div style={{ fontFamily:'var(--f-serif)', fontSize:'var(--fs-lg)', color:'var(--c-navy)', fontWeight:'var(--fw-med)' }}>{member.name}</div>
                        <div style={{ fontSize:'var(--fs-xs)', color:'var(--c-gold)', letterSpacing:'var(--ls-wide)', textTransform:'uppercase', marginTop:'var(--sp-1)' }}>{member.role}</div>
                        {member.experience && <div style={{ fontSize:'var(--fs-xs)', color:'var(--c-text-muted)', marginTop:'var(--sp-1)' }}>{member.experience} yrs experience</div>}
                      </div>
                      {member.bio && <p style={{ fontSize:'var(--fs-base)', color:'var(--c-text-2)', lineHeight:'var(--lh-relax)' }}>{member.bio}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Address — renders physical address for LocalBusiness schema confidence ── */}
        <section className="sec sec--linen" aria-labelledby="address-heading">
          <div className="container">
            <SectionHeader eyebrow="Find Us" title={<>Studio <em>Address</em></>} />
            <div className="grid-auto-2" style={{ gap:'var(--sp-8)', alignItems:'flex-start' }}>

              {/* Address block */}
              <div>
                <address style={{ fontStyle:'normal', fontSize:'var(--fs-lg)', lineHeight:'var(--lh-loose)', color:'var(--c-text)', marginBottom:'var(--sp-5)' }}>
                  <strong style={{ fontFamily:'var(--f-serif)', fontSize:'var(--fs-xl)', color:'var(--c-navy)', display:'block', marginBottom:'var(--sp-3)' }}>
                    {SITE.name}
                  </strong>
                  {CONTACT.address.street},<br />
                  {CONTACT.address.area}, {CONTACT.address.city} – {CONTACT.address.pincode},<br />
                  {CONTACT.address.state}, India
                </address>

                <div style={{ display:'flex', flexDirection:'column', gap:'var(--sp-3)', marginBottom:'var(--sp-5)' }}>
                  <a href={`tel:${CONTACT.phone1}`} style={{ color:'var(--c-gold)', fontWeight:'var(--fw-semi)' }} aria-label={`Call ${CONTACT.phone1Display}`}>{CONTACT.phone1Display}</a>
                  <a href={`tel:${CONTACT.phone2}`} style={{ color:'var(--c-gold)', fontWeight:'var(--fw-semi)' }} aria-label={`Call ${CONTACT.phone2Display}`}>{CONTACT.phone2Display}</a>
                  <a href={`mailto:${CONTACT.email}`} style={{ color:'var(--c-gold)', fontWeight:'var(--fw-semi)' }} aria-label="Email us">{CONTACT.email}</a>
                </div>

                {/* GSTIN box — visible trust signal */}
                <div style={{ padding:'var(--sp-3) var(--sp-4)', background:'var(--c-bg)', border:'var(--b-gold-dim)', display:'inline-block' }}>
                  <div style={{ fontSize:'var(--fs-xs)', color:'var(--c-text-muted)', marginBottom:'2px', letterSpacing:'var(--ls-wide)', textTransform:'uppercase' }}>GSTIN</div>
                  <div style={{ fontWeight:'var(--fw-semi)', color:'var(--c-navy)', letterSpacing:'0.05em', fontFamily:'monospace' }}>{SITE.gstin}</div>
                </div>

                <div style={{ marginTop:'var(--sp-4)', display:'flex', gap:'var(--sp-3)', flexWrap:'wrap' }}>
                  <a href={SOCIAL.instagram} className="btn btn--outline-navy btn--sm" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
                  <a href={SOCIAL.youtube}   className="btn btn--outline-navy btn--sm" target="_blank" rel="noopener noreferrer" aria-label="YouTube">YouTube</a>
                </div>
              </div>

              {/* Maps link */}
              <a
                href={CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open location in Google Maps"
                className="card reveal"
                style={{ display:'flex', alignItems:'center', justifyContent:'center', aspectRatio:'4/3', fontSize:'1.5rem', gap:'var(--sp-3)', textDecoration:'none', flexDirection:'column', color:'var(--c-text-muted)' }}
              >
                <span style={{ fontSize:'3rem' }}>📍</span>
                <span style={{ fontSize:'var(--fs-base)', fontWeight:'var(--fw-semi)', color:'var(--c-navy)' }}>Open in Google Maps →</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <CtaStrip
          title="Let's Build Something Beautiful"
          subtitle="10 years of Chennai interiors · Free 3D · No hidden costs"
          primaryLabel="WhatsApp Us →"
          primaryHref={CONTACT.waLink1}
          secondaryLabel={`Call ${CONTACT.phone1Display}`}
          secondaryTel={CONTACT.phone1}
        />

      </div>
    </>
  )
}
