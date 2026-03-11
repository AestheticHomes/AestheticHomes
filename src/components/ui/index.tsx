/**
 * @file src/components/ui/index.tsx
 * @description Reusable primitive UI components.
 *
 * All styling comes from tokens.css CSS classes — no inline styles here.
 *
 * COMPONENTS
 * ──────────
 * Button       — all button variants (gold, navy, outline, ghost)
 * Badge        — status / label chips
 * SectionHeader — eyebrow + title + subtitle block
 * TrustBar     — horizontal scrollable trust signals strip
 * StarRating   — renders ★ rating display
 * ProcessStep  — numbered process card
 * StatCard     — large-number + label stat display
 * FaqAccordion — accessible <details> FAQ list with JSON-LD
 * Divider      — horizontal rule
 * Spinner      — loading indicator
 * EmptyState   — empty/no-results message
 * SkeletonCard — loading placeholder card
 */

import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import { TRUST_SIGNALS } from '@/lib/constants'
import type { FaqItem } from '@/types'

// ─── BUTTON ───────────────────────────────────────────────────────────────────
type BtnVariant = 'gold' | 'navy' | 'outline-navy' | 'outline-gold' | 'outline-inv'
type BtnSize    = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant
  size?:    BtnSize
  full?:    boolean
  children: ReactNode
}

/**
 * Primary button component.
 * @example <Button variant="gold" size="lg" onClick={fn}>Get Quote</Button>
 */
export function Button({ variant = 'gold', size = 'md', full, children, className = '', ...rest }: ButtonProps) {
  const cls = [
    'btn',
    `btn--${variant}`,
    size === 'sm' ? 'btn--sm' : size === 'lg' ? 'btn--lg' : '',
    full ? 'btn--full' : '',
    className,
  ].filter(Boolean).join(' ')

  return <button className={cls} {...rest}>{children}</button>
}

/** Anchor styled as a button — use for external links */
interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: BtnVariant
  size?:    BtnSize
  full?:    boolean
  children: ReactNode
}

export function LinkButton({ variant = 'gold', size = 'md', full, children, className = '', ...rest }: LinkButtonProps) {
  const cls = [
    'btn',
    `btn--${variant}`,
    size === 'sm' ? 'btn--sm' : size === 'lg' ? 'btn--lg' : '',
    full ? 'btn--full' : '',
    className,
  ].filter(Boolean).join(' ')

  return <a className={cls} {...rest}>{children}</a>
}

// ─── BADGE ────────────────────────────────────────────────────────────────────
type BadgeVariant = 'gold' | 'navy' | 'green' | 'amber' | 'blue'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

/**
 * Status/label badge chip.
 * @example <Badge variant="green">Completed</Badge>
 */
export function Badge({ variant = 'gold', children, className = '' }: BadgeProps) {
  return (
    <span className={`badge badge--${variant} ${className}`}>
      {children}
    </span>
  )
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
interface SectionHeaderProps {
  eyebrow:   string
  title:     ReactNode    // can contain <em> for gold italic text
  subtitle?: string
  center?:   boolean
  dark?:     boolean      // for use on navy backgrounds
  id?:       string       // optional id for aria-labelledby
}

/**
 * Reusable section header block: eyebrow label + h2 title + optional subtitle.
 * @example
 * <SectionHeader
 *   eyebrow="Our Work"
 *   title={<>53 <em>Projects</em> Across Chennai</>}
 *   subtitle="Browse completed interiors..."
 * />
 */
export function SectionHeader({ eyebrow, title, subtitle, center, dark, id }: SectionHeaderProps) {
  return (
    <div className={`sec__header ${center ? 'sec__header--center' : ''}`}>
      <div className="sec__eyebrow">{eyebrow}</div>
      <h2 id={id} className={`sec__title ${dark ? 'sec__title--inv' : ''}`}>{title}</h2>
      {subtitle && <p className={`sec__sub ${dark ? 'sec__sub--inv' : ''}`}>{subtitle}</p>}
    </div>
  )
}

// ─── TRUST BAR ────────────────────────────────────────────────────────────────
/**
 * Horizontal scrollable strip of trust signals.
 * Used below hero sections across multiple pages.
 */
export function TrustBar() {
  return (
    <div
      role="complementary"
      aria-label="Trust signals"
      style={{ background:'var(--c-bg-card)', borderBottom:'var(--b-base)', padding:'var(--sp-4) var(--sec-x)', overflowX:'auto' }}
    >
      <div style={{ display:'flex', gap:'var(--sp-6)', alignItems:'center', minWidth:'max-content', maxWidth:'var(--wrap)', margin:'0 auto', justifyContent:'space-between' }}>
        {TRUST_SIGNALS.map((signal) => (
          <div key={signal.label} style={{ display:'flex', alignItems:'center', gap:'var(--sp-2)', flexShrink:0 }}>
            <span style={{ color:'var(--c-gold)' }} aria-hidden="true">✦</span>
            <div>
              <div style={{ fontSize:'var(--fs-xs)', fontWeight:'var(--fw-semi)', color:'var(--c-navy)' }}>{signal.label}</div>
              <div style={{ fontSize:'var(--fs-xs)', color:'var(--c-text-muted)' }}>{signal.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── STAR RATING ─────────────────────────────────────────────────────────────
/**
 * Renders ★ filled and ☆ empty stars for a given rating.
 * @example <StarRating rating={4} max={5} />
 */
export function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div aria-label={`${rating} out of ${max} stars`} style={{ display:'flex', gap:'2px', color:'var(--c-gold)', fontSize:'var(--fs-base)' }}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} aria-hidden="true">{i < rating ? '★' : '☆'}</span>
      ))}
    </div>
  )
}

// ─── PROCESS STEP ─────────────────────────────────────────────────────────────
interface ProcessStepProps {
  num:   string  // '01', '02', etc.
  title: string
  desc:  string
  dark?: boolean
}

/**
 * Single numbered process card.
 * @example <ProcessStep num="01" title="Site Visit" desc="..." />
 */
export function ProcessStep({ num, title, desc, dark }: ProcessStepProps) {
  return (
    <div className="reveal" style={{ padding:'var(--sp-6)' }}>
      <div style={{ fontFamily:'var(--f-serif)', fontSize:'var(--fs-3xl)', fontWeight:'var(--fw-light)', color: dark ? 'var(--c-navy-soft)' : 'var(--c-bg-border)', lineHeight:1, marginBottom:'var(--sp-4)' }}>
        {num}
      </div>
      <h3 style={{ fontFamily:'var(--f-serif)', fontSize:'var(--fs-lg)', color: dark ? 'var(--c-text-inv)' : 'var(--c-navy)', marginBottom:'var(--sp-3)' }}>
        {title}
      </h3>
      <p style={{ fontSize:'var(--fs-base)', color: dark ? 'var(--c-text-inv-dim)' : 'var(--c-text-2)', lineHeight:'var(--lh-loose)' }}>
        {desc}
      </p>
    </div>
  )
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
interface StatCardProps {
  number:  string
  label:   string
  detail?: string
  dark?:   boolean
}

/**
 * Large number + label stat display.
 * @example <StatCard number="53+" label="Projects" detail="Across Chennai" />
 */
export function StatCard({ number, label, detail, dark }: StatCardProps) {
  return (
    <div className={`card reveal ${dark ? 'card--navy' : ''}`} style={{ padding:'var(--sp-6)', textAlign:'center' }}>
      <div style={{ fontFamily:'var(--f-serif)', fontSize:'var(--fs-3xl)', color:'var(--c-gold)', lineHeight:1, marginBottom:'var(--sp-3)' }}>
        {number}
      </div>
      <div style={{ fontWeight:'var(--fw-semi)', color: dark ? 'var(--c-text-inv)' : 'var(--c-navy)', marginBottom:'var(--sp-1)' }}>
        {label}
      </div>
      {detail && (
        <div style={{ fontSize:'var(--fs-xs)', color: dark ? 'var(--c-text-inv-dim)' : 'var(--c-text-muted)' }}>
          {detail}
        </div>
      )}
    </div>
  )
}

// ─── FAQ ACCORDION ────────────────────────────────────────────────────────────
/**
 * Accessible FAQ list using native <details>/<summary> — no JS needed.
 * Add faqSchema JSON-LD separately via <Seo jsonLd={...} /> for structured data.
 *
 * @example
 * <FaqAccordion items={HOME_FAQS} />
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'var(--sp-1)' }}>
      {items.map((faq, i) => (
        <details
          key={i}
          className="reveal"
          style={{ background:'var(--c-bg)', border:'var(--b-base)', padding:'var(--sp-5)' }}
        >
          <summary style={{
            fontFamily:'var(--f-serif)', fontSize:'var(--fs-lg)', fontWeight:'var(--fw-med)',
            color:'var(--c-navy)', cursor:'pointer', listStyle:'none',
            display:'flex', justifyContent:'space-between', alignItems:'center', gap:'var(--sp-4)',
          }}>
            {faq.q}
            <span style={{ color:'var(--c-gold)', fontFamily:'var(--f-sans)', fontSize:'var(--fs-xl)', flexShrink:0 }} aria-hidden="true">+</span>
          </summary>
          <p style={{ marginTop:'var(--sp-4)', fontSize:'var(--fs-base)', color:'var(--c-text-2)', lineHeight:'var(--lh-loose)' }}>
            {faq.a}
          </p>
        </details>
      ))}
    </div>
  )
}

// ─── DIVIDER ─────────────────────────────────────────────────────────────────
export function Divider({ dark }: { dark?: boolean }) {
  return <hr className={`divider ${dark ? 'divider--dark' : ''}`} />
}

// ─── SPINNER ─────────────────────────────────────────────────────────────────
/**
 * Loading spinner.
 * @example <Spinner size={32} />
 */
export function Spinner({ size = 24 }: { size?: number }) {
  return (
    <div role="status" aria-label="Loading..." style={{ display:'flex', justifyContent:'center', padding:'var(--sp-8)' }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--c-gold)" strokeWidth="2" style={{ animation:'spin 0.8s linear infinite' }}>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="15" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

// ─── EMPTY STATE ─────────────────────────────────────────────────────────────
interface EmptyStateProps {
  icon?:    string
  title:    string
  message?: string
  action?:  { label: string; onClick: () => void }
}

/**
 * Empty/no-results placeholder.
 * @example <EmptyState icon="📂" title="No projects found" action={{ label: 'Clear filters', onClick: fn }} />
 */
export function EmptyState({ icon = '📂', title, message, action }: EmptyStateProps) {
  return (
    <div style={{ textAlign:'center', padding:'var(--sp-16)', color:'var(--c-text-muted)' }}>
      <div style={{ fontSize:'3rem', marginBottom:'var(--sp-4)' }}>{icon}</div>
      <p style={{ fontFamily:'var(--f-serif)', fontSize:'var(--fs-xl)', color:'var(--c-navy)', marginBottom:'var(--sp-2)' }}>{title}</p>
      {message && <p style={{ fontSize:'var(--fs-base)', marginBottom:'var(--sp-4)' }}>{message}</p>}
      {action && (
        <button className="btn btn--outline-navy btn--sm" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  )
}

// ─── SKELETON CARD ────────────────────────────────────────────────────────────
/**
 * Loading placeholder card matching ProjectCard proportions.
 * @example {loading && <SkeletonGrid count={6} />}
 */
export function SkeletonCard({ aspectRatio = '4/3' }: { aspectRatio?: string }) {
  return (
    <div style={{
      background:'var(--c-bg-card)', aspectRatio,
      animation:'skeletonPulse 1.4s ease infinite',
    }}>
      <style>{`@keyframes skeletonPulse { 0%,100%{opacity:1} 50%{opacity:.5} }`}</style>
    </div>
  )
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--sp-2)' }}>
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} aspectRatio={i === 0 ? '16/7' : '4/5'} />
      ))}
    </div>
  )
}

// ─── PAGE HERO HEADER (reused by all inner pages) ────────────────────────────
interface PageHeroProps {
  eyebrow: string
  title:   ReactNode
  subtitle?: string
}

/**
 * Standard dark hero header used by Projects, Services, About, Blog, Contact.
 * @example <PageHero eyebrow="Portfolio" title={<>53 <em>Projects</em></>} />
 */
export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <div className="sec sec--navy" style={{ paddingBottom:'var(--sp-8)' }}>
      <div className="container">
        <div className="sec__eyebrow">{eyebrow}</div>
        <h1 className="sec__title sec__title--inv">{title}</h1>
        {subtitle && <p className="sec__sub sec__sub--inv">{subtitle}</p>}
      </div>
    </div>
  )
}

// ─── CTA STRIP (bottom of each page) ─────────────────────────────────────────
interface CtaStripProps {
  title:       string
  subtitle?:   string
  primaryLabel:  string
  primaryHref:   string
  secondaryLabel?: string
  secondaryHref?:  string
  secondaryTel?:   string
}

/**
 * Gold CTA band used at the bottom of service pages.
 * @example <CtaStrip title="Ready to start?" primaryLabel="WhatsApp" primaryHref={CONTACT.waLink1} />
 */
export function CtaStrip({ title, subtitle, primaryLabel, primaryHref, secondaryLabel, secondaryHref, secondaryTel }: CtaStripProps) {
  return (
    <div className="sec sec--gold" style={{ textAlign:'center' }}>
      <div className="container">
        <p style={{ fontFamily:'var(--f-serif)', fontSize:'var(--fs-4xl)', fontWeight:'var(--fw-med)', color:'var(--c-navy)', lineHeight:'var(--lh-snug)', marginBottom: subtitle ? 'var(--sp-3)' : 'var(--sp-8)' }}>
          {title}
        </p>
        {subtitle && <p style={{ fontSize:'var(--fs-base)', color:'rgba(15,25,35,0.65)', marginBottom:'var(--sp-8)' }}>{subtitle}</p>}
        <div style={{ display:'flex', gap:'var(--sp-4)', justifyContent:'center', flexWrap:'wrap' }}>
          <a href={primaryHref} className="btn btn--navy btn--lg" target="_blank" rel="noopener noreferrer">
            {primaryLabel}
          </a>
          {secondaryLabel && (secondaryHref || secondaryTel) && (
            <a
              href={secondaryHref ?? `tel:${secondaryTel}`}
              className="btn btn--outline-navy btn--lg"
              {...(secondaryHref ? { target:'_blank', rel:'noopener noreferrer' } : {})}
            >
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
