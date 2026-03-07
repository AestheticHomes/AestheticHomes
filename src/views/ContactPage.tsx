/**
 * @file src/views/ContactPage.tsx
 * @description Contact page — details, enquiry form, maps link.
 *
 * PAGE SECTIONS (in render order)
 * ────────────────────────────────
 * 1. PageHero      — dark navy header
 * 2. Two-column layout:
 *    Left  — 4 contact cards (phone, email, address, GSTIN) + office hours
 *    Right — Enquiry form (name, phone, area, BHK, budget, message)
 * 3. Maps link card
 *
 * FORM BEHAVIOUR
 * ──────────────
 * On submit: builds a pre-filled WhatsApp message and opens wa.me deep-link.
 * • No backend required — works on any static host.
 * • Works offline — opens WhatsApp app natively.
 * • No user data is stored by this site.
 *
 * TO ADD A FORM BACKEND:
 *   Replace handleSubmit() logic with a fetch() to Formspree / Netlify Forms.
 *   Keep the WhatsApp fallback as a secondary option.
 *
 * SEO
 * ───
 * • Address and phone rendered visibly — reinforces LocalBusiness schema.
 * • GSTIN shown — builds trust and confirms registered status.
 */

import { useState } from 'react'
import Seo, { buildFaqSchema } from '@/components/seo/Seo'
import { PageHero } from '@/components/ui'
import { SITE, CONTACT, CONTACT_FAQS } from '@/lib/constants'

// ─── TYPES ────────────────────────────────────────────────────────────────────
type FormState = {
  name:    string
  phone:   string
  area:    string
  bhk:     string
  budget:  string
  message: string
}

// ─── CONTACT CARD DATA ────────────────────────────────────────────────────────
const CONTACT_CARDS = [
  {
    icon: '📞', label: 'Phone / WhatsApp',
    value: CONTACT.phone1Display,
    href: `tel:${CONTACT.phone1}`,
  },
  {
    icon: '📧', label: 'Email',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    icon: '📍', label: 'Address',
    value: CONTACT.address.full,
    href: CONTACT.googleMapsUrl,
  },
  {
    icon: '🏛', label: 'GSTIN (Registered Business)',
    value: SITE.gstin,
    href: null,
  },
]

const BHK_OPTIONS   = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Villa', 'Commercial']
const BUDGET_OPTIONS = ['Under ₹2 Lakhs', '₹2–5 Lakhs', '₹5–10 Lakhs', '₹10–20 Lakhs', 'Above ₹20 Lakhs']

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '', phone: '', area: '', bhk: '', budget: '', message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  /** Build pre-filled WhatsApp message and open wa.me link */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const lines = [
      `Hi Aesthetic Homes,`,
      ``,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Area: ${form.area}`,
      `Home Size: ${form.bhk}`,
      `Budget: ${form.budget}`,
      form.message ? `\n${form.message}` : '',
    ].join('\n')

    window.open(
      `https://wa.me/917397330591?text=${encodeURIComponent(lines)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <>
      <Seo
        title="Contact Aesthetic Homes — Free Site Visit Chennai"
        description={`Contact Aesthetic Homes for a free interior design site visit in Chennai. WhatsApp ${CONTACT.phone1Display}. GSTIN: ${SITE.gstin}. Mon–Sat 9 AM–7 PM.`}
        canonical={`${SITE.url}/contact`}
        jsonLd={buildFaqSchema([...CONTACT_FAQS])}
      />

      {/* ── 1. Hero ── */}
      <PageHero
        eyebrow="Get in Touch"
        title={<>Let's Build Something <em>Beautiful</em></>}
        subtitle="Free site visit · Free 3D design · Zero commitment — we visit anywhere in Chennai."
      />

      {/* ── 2. Two-column layout ── */}
      <section className="sec" aria-label="Contact information and enquiry form">
        <div className="container">
          <div className="grid-auto-2" style={{ gap: 'var(--sp-10)', alignItems: 'flex-start' }}>

            {/* ── Left: contact details ── */}
            <div>
              <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--fs-2xl)', color: 'var(--c-navy)', marginBottom: 'var(--sp-6)' }}>
                Contact Details
              </h2>

              {/* Contact cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
                {CONTACT_CARDS.map((card) => {
                  const inner = (
                    <div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1.3rem', flexShrink: 0, marginTop: 2 }} aria-hidden="true">
                        {card.icon}
                      </span>
                      <div>
                        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--c-text-muted)', letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase', marginBottom: 2 }}>
                          {card.label}
                        </div>
                        <div style={{ fontSize: 'var(--fs-base)', fontWeight: 'var(--fw-med)', color: 'var(--c-navy)', lineHeight: 'var(--lh-relax)' }}>
                          {card.value}
                        </div>
                      </div>
                    </div>
                  )

                  return (
                    <div key={card.label} className="card" style={{ padding: 'var(--sp-4)' }}>
                      {card.href
                        ? (
                          <a
                            href={card.href}
                            target={card.href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', display: 'block' }}
                          >
                            {inner}
                          </a>
                        )
                        : inner
                      }
                    </div>
                  )
                })}
              </div>

              {/* Office hours */}
              <div style={{ marginTop: 'var(--sp-5)', padding: 'var(--sp-4)', background: 'var(--c-bg-tint)', border: 'var(--b-base)' }}>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--c-text-muted)', letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase', marginBottom: 'var(--sp-2)' }}>
                  Office Hours
                </div>
                <div style={{ fontSize: 'var(--fs-base)', color: 'var(--c-navy)', marginBottom: 4 }}>
                  Mon–Sat: 9:00 AM – 7:00 PM
                </div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--c-text-muted)' }}>
                  WhatsApp available 8 AM – 9 PM daily
                </div>
              </div>

              {/* Maps link */}
              <a
                href={CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', padding: 'var(--sp-4)', marginTop: 'var(--sp-4)', textDecoration: 'none' }}
                aria-label="Open Aesthetic Homes location in Google Maps"
              >
                <span style={{ fontSize: '1.5rem' }} aria-hidden="true">🗺</span>
                <div>
                  <div style={{ fontWeight: 'var(--fw-semi)', color: 'var(--c-navy)', fontSize: 'var(--fs-base)' }}>
                    Open in Google Maps
                  </div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--c-text-muted)' }}>
                    Kodambakkam, Chennai 600024
                  </div>
                </div>
                <span style={{ marginLeft: 'auto', color: 'var(--c-gold)' }}>→</span>
              </a>
            </div>

            {/* ── Right: enquiry form ── */}
            <div>
              <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--fs-2xl)', color: 'var(--c-navy)', marginBottom: 'var(--sp-6)' }}>
                Send an Enquiry
              </h2>

              {/* NOTE: no <form> tag — submit is handled by handleSubmit via button onClick */}
              <div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Your Name *</label>
                    <input
                      id="name" name="name" className="form-input"
                      placeholder="e.g. Ramesh Kumar"
                      value={form.name} onChange={handleChange} required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone / WhatsApp *</label>
                    <input
                      id="phone" name="phone" className="form-input" type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone} onChange={handleChange} required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="area">Your Area *</label>
                    <input
                      id="area" name="area" className="form-input"
                      placeholder="e.g. Velachery, Anna Nagar"
                      value={form.area} onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="bhk">Home Size</label>
                    <select id="bhk" name="bhk" className="form-select" value={form.bhk} onChange={handleChange}>
                      <option value="">Select BHK</option>
                      {BHK_OPTIONS.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="budget">Approximate Budget</label>
                  <select id="budget" name="budget" className="form-select" value={form.budget} onChange={handleChange}>
                    <option value="">Select budget range</option>
                    {BUDGET_OPTIONS.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Tell Us About Your Project</label>
                  <textarea
                    id="message" name="message" className="form-textarea" rows={4}
                    placeholder="Which rooms, any specific requirements, preferred timeline..."
                    value={form.message} onChange={handleChange}
                  />
                </div>

                <button
                  className="btn btn--gold btn--full btn--lg"
                  onClick={handleSubmit}
                  style={{ justifyContent: 'center' }}
                  aria-label="Send enquiry via WhatsApp"
                >
                  Send on WhatsApp →
                </button>
                <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--c-text-muted)', marginTop: 'var(--sp-3)', textAlign: 'center' }}>
                  Your message opens in WhatsApp — no data is stored by this website.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
