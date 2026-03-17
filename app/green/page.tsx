import type { Metadata } from 'next'
import Breadcrumb from '../components/Breadcrumb'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aesthetichomes.co.in'),

  title: {
    default: 'Aesthetic Homes Green | UPVC Board Wardrobes & Aluminium Interiors Chennai',
    template: '%s | Aesthetic Homes Green · Chennai',
  },

  description:
    'Aesthetic Homes Green specialises in UPVC hollow board wardrobes, kitchen cabinets, loft shutters, aluminium partitions, composite cladding, and sustainable ceiling systems in Chennai. Termite-proof, moisture-resistant, zero maintenance.',

  keywords: [
    'UPVC hollow board wardrobes Chennai',
    'UPVC board kitchen cabinets Chennai',
    'UPVC loft shutters Chennai',
    'aluminium partitions Chennai',
    'composite cladding Chennai',
    'ACP cladding Chennai',
    'sustainable interior design Chennai',
    'green interiors Chennai',
    'GRC ceiling Chennai',
    'fibre cement ceiling Chennai',
    'termite proof furniture Chennai',
    'moisture resistant wardrobes Chennai',
    'low VOC interiors Chennai',
    'UPVC board furniture Chennai',
    'interior execution partner Chennai',
  ],

  authors: [{ name: 'Aesthetic Homes', url: 'https://www.aesthetichomes.co.in' }],

  creator: 'Aesthetic Homes',
  publisher: 'Aesthetic Homes',

  alternates: {
    canonical: 'https://www.aesthetichomes.co.in/green',
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.aesthetichomes.co.in/green',
    siteName: 'Aesthetic Homes',
    title: 'Aesthetic Homes Green | UPVC Board Wardrobes & Aluminium Interiors Chennai',
    description:
      'UPVC hollow board wardrobes, aluminium partitions, composite cladding, and sustainable ceilings — installed by Aesthetic Homes across Chennai.',
    images: [
      {
        url: '/og/green.jpg',
        width: 1200,
        height: 630,
        alt: 'Aesthetic Homes Green — Sustainable Interiors Chennai',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Aesthetic Homes Green | UPVC & Aluminium Interiors Chennai',
    description:
      'UPVC hollow board furniture, aluminium systems, composite cladding and sustainable ceilings in Chennai.',
    images: ['/og/green.jpg'],
    creator: '@aesthetichomes_in',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  other: {
    'geo.region': 'IN-TN',
    'geo.placename': 'Chennai',
    'geo.position': '13.0522;80.2210',
    ICBM: '13.0522, 80.2210',
    'DC.title': 'Aesthetic Homes Green | UPVC & Aluminium Interiors Chennai',
    'DC.description': 'UPVC hollow board furniture and aluminium systems in Chennai.',
    'DC.subject': 'Interior Design, UPVC Furniture, Aluminium Interiors, Chennai',
    'DC.language': 'en',
    'DC.coverage': 'Chennai, Tamil Nadu, India',
    'DC.publisher': 'Aesthetic Homes',
  },
}

const WA_GREEN =
  'https://wa.me/917397330591?text=Hi%2C%20I%27m%20interested%20in%20Aesthetic%20Homes%20Green%20solutions'

const solutions = [
  {
    icon: '◻',
    label: 'UPVC Boards',
    title: 'UPVC Hollow Board Furniture',
    active: true,
    body: "Wardrobes, kitchen cabinets, loft shutters, and utility storage built from UPVC hollow boards — not wood, not ply. Termite-proof, moisture-resistant, zero swelling. Ideal for Chennai's humidity.",
    tags: ['Wardrobes', 'Kitchen Cabinets', 'Loft Shutters', 'Utility Storage'],
  },
  {
    icon: '◈',
    label: 'Aluminium',
    title: 'Aluminium Partitions & Systems',
    active: true,
    body: 'Powder-coated aluminium sections for partitions, framing, and structural interior elements. Slim profiles, high strength, long life with minimal upkeep.',
    tags: ['Partitions', 'Framing Systems', 'Structural Elements', 'Feature Frames'],
  },
  {
    icon: '◉',
    label: 'Composite',
    title: 'Composite Panels & Cladding',
    active: true,
    body: 'ACP and solid composite panels for facades, feature walls, and interior partitions. Low embodied carbon, weather-resistant, and available in a wide range of finishes.',
    tags: ['ACP Facades', 'Feature Walls', 'Interior Cladding', 'Signage Panels'],
  },
  {
    icon: '▣',
    label: 'Ceilings',
    title: 'Sustainable Ceilings & Partitions',
    active: true,
    body: 'GRC, fibre-cement, and low-VOC gypsum systems as alternatives to conventional POP. Tested fire ratings, zero formaldehyde, moisture-stable.',
    tags: ['GRC Panels', 'Fibre Cement', 'Low-VOC Gypsum', 'Acoustic Panels'],
  },
  {
    icon: '◇',
    label: 'Glazing',
    title: 'Glazing & IGUs',
    active: false,
    body: "Double-glazed and low-E glass units that cut heat gain significantly. Coming soon — we're building supply chain and installation capability.",
    tags: ['Double Glazed', 'Low-E Glass', 'Laminated', 'Coming Soon'],
  },
  {
    icon: '◬',
    label: 'Screens',
    title: 'Mosquito & Solar Screens',
    active: false,
    body: 'Integrated retractable insect screens and external solar shading. In development — reach out to be notified when available.',
    tags: ['Retractable', 'Pleated', 'Solar Mesh', 'Coming Soon'],
  },
]

const whyPoints = [
  { stat: '0', label: 'Termite risk', body: 'UPVC hollow boards are inherently pest-proof. No annual treatment, no swelling, no replacement from moisture damage.' },
  { stat: '25+', label: 'Year lifespan', body: "Quality UPVC board furniture outlasts wood and ply by decades in Chennai's coastal climate." },
  { stat: '100%', label: 'Recyclable', body: 'Both aluminium and UPVC are fully recyclable at end of life — lower environmental footprint than timber alternatives.' },
  { stat: '₹0', label: 'Painting ever', body: 'UPVC boards come factory-finished. No repainting, no re-polishing, no peeling edges in humid kitchens or bathrooms.' },
]

const compareLeft = {
  head: 'UPVC Hollow Boards',
  points: [
    'Best moisture and humidity resistance',
    'Zero termite risk — ever',
    'No painting or polishing needed',
    'Lighter weight — ideal for loft shutters',
    'Slightly less rigid than 18mm ply for very large panels',
  ],
  verdict: '→ Best for wardrobes, kitchen cabinets, loft shutters, and bathroom storage where moisture and pests are a concern.',
}

const compareRight = {
  head: 'Aluminium Systems',
  points: [
    'Slimmest profiles — maximum visual lightness',
    'Higher rigidity for large-span partitions',
    'Powder coating in any RAL colour',
    'Better for structural framing applications',
    'Higher material cost than UPVC boards',
  ],
  verdict: '→ Best for partitions, framing, feature walls, and any element where structural stiffness or a premium finish is the priority.',
}

const steps = [
  { n: '01', title: 'Site visit & material briefing', body: 'We assess your space, understand the use case and recommend the right material system honestly.' },
  { n: '02', title: 'Design & quotation', body: 'Layout drawings, material specs, and a line-item quote — GST included, no hidden markup.' },
  { n: '03', title: 'Fabrication & installation', body: 'Our in-house team fabricates and installs. No subcontracting, no handoffs mid-project.' },
  { n: '04', title: 'Handover & warranty', body: 'Full documentation, GST invoice, and a 1-year workmanship warranty on every job.' },
]

const certifications = ['GST Registered', 'In-house Installation Team', 'Termite-proof Materials', 'Low-VOC Options Available']

export default function GreenPage() {
  const schemaA = {
    '@type': 'LocalBusiness',
    '@id': 'https://www.aesthetichomes.co.in/#business',
    name: 'Aesthetic Homes Green',
    url: 'https://www.aesthetichomes.co.in/green',
    hasMap: 'https://maps.google.com/?cid=ChIJI3UM5r5nUjoR1IWr3ch-DYo',
    telephone: '+917397330591',
    email: 'hello@aesthetichomes.net',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '10, Gokul Brindavan Flats, United India Colony, Kodambakkam',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      postalCode: '600024',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 13.0522,
      longitude: 80.2210,
    },
    areaServed: [
      { '@type': 'City', name: 'Chennai' },
      { '@type': 'State', name: 'Tamil Nadu' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
    priceRange: '₹₹',
    image: 'https://www.aesthetichomes.co.in/og/green.jpg',
    sameAs: [
      'https://maps.google.com/?cid=ChIJI3UM5r5nUjoR1IWr3ch-DYo',
      'https://www.instagram.com/aesthetichomes_in',
      'https://www.youtube.com/@AestheticHomes_in',
    ],
    parentOrganization: {
      '@id': 'https://www.aesthetichomes.co.in/#business',
    },
  }

  const schemaB = {
    '@type': 'ItemList',
    name: 'Aesthetic Homes Green — Services',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Service',
          name: 'UPVC Hollow Board Furniture',
          description: 'Wardrobes, kitchen cabinets, loft shutters built from UPVC hollow boards. Termite-proof and moisture-resistant.',
          provider: { '@id': 'https://www.aesthetichomes.co.in/#business' },
          areaServed: 'Chennai',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Service',
          name: 'Aluminium Partitions and Interior Systems',
          description: 'Powder-coated aluminium partitions, framing, and structural interior elements for homes and commercial spaces.',
          provider: { '@id': 'https://www.aesthetichomes.co.in/#business' },
          areaServed: 'Chennai',
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Service',
          name: 'Composite Panels and ACP Cladding',
          description: 'ACP and solid composite panels for facades, feature walls, and interior partitions.',
          provider: { '@id': 'https://www.aesthetichomes.co.in/#business' },
          areaServed: 'Chennai',
        },
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@type': 'Service',
          name: 'Sustainable Ceilings and Partitions',
          description: 'GRC, fibre-cement, and low-VOC gypsum ceiling systems as alternatives to conventional POP.',
          provider: { '@id': 'https://www.aesthetichomes.co.in/#business' },
          areaServed: 'Chennai',
        },
      },
    ],
  }

  const schemaC = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.aesthetichomes.co.in' },
      { '@type': 'ListItem', position: 2, name: 'Green Solutions', item: 'https://www.aesthetichomes.co.in/green' },
    ],
  }

  return (
    <main className="green-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [schemaA, schemaB, schemaC],
          }),
        }}
      />
      <div className="g-container">
        <Breadcrumb
          items={[
            { href: '/', label: 'Home' },
            { href: '/green', label: 'Green Solutions' },
          ]}
        />
      </div>

      <section className="g-hero">
        <div className="g-container">
          <div className="g-sub-brand"><span className="g-dot" />Aesthetic Homes <strong>Green</strong></div>
          <h1 className="g-hero__headline">Smarter materials.<br /><em>Last a lifetime.</em></h1>
          <p className="g-hero__sub">UPVC hollow board furniture, aluminium systems, composite cladding, and sustainable ceiling solutions — built and installed by Aesthetic Homes across Chennai.</p>
          <div className="g-hero__ctas">
            <a href={WA_GREEN} className="g-btn g-btn--primary">Get a Free Consultation →</a>
            <a href="#solutions" className="g-btn g-btn--ghost">Explore Solutions</a>
          </div>
          <div className="g-certs">{certifications.map((c) => <span key={c} className="g-cert-pill">✓ {c}</span>)}</div>
        </div>
        <div className="g-hero__stripe" aria-hidden="true" />
      </section>

      <section className="g-mission">
        <div className="g-container g-mission__inner">
          <p className="g-mission__text">Chennai's climate destroys conventional materials fast — coastal humidity warps ply, swells MDF, and invites termites into wooden furniture within years. UPVC boards and aluminium systems aren't a premium upgrade. They're just the more sensible material choice for this city.</p>
          <a href={WA_GREEN} className="g-mission__link">Talk to a specialist →</a>
        </div>
      </section>

      <section id="solutions" className="g-section">
        <div className="g-container">
          <p className="g-eyebrow">What We Offer</p>
          <h2 className="g-section__title">Four active solutions. <em>Two coming soon.</em></h2>
          <div className="g-solutions-grid">
            {solutions.map((s) => (
              <div key={s.label} className={`g-sol-card${s.active ? '' : ' g-sol-card--soon'}`}>
                <div className="g-sol-card__top">
                  <span className="g-sol-icon">{s.icon}</span>
                  <div className="g-sol-badges">
                    <span className="g-sol-label">{s.label}</span>
                    {!s.active && <span className="g-sol-soon-badge">Coming Soon</span>}
                  </div>
                </div>
                <h3 className="g-sol-title">{s.title}</h3>
                <p className="g-sol-body">{s.body}</p>
                <div className="g-sol-tags">{s.tags.map((t) => <span key={t} className="g-tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="g-section g-section--forest">
        <div className="g-container">
          <p className="g-eyebrow g-eyebrow--light">Why It Matters</p>
          <h2 className="g-section__title g-title--light">The case for <em>greener materials.</em></h2>
          <div className="g-stats-grid">
            {whyPoints.map((w) => (
              <div key={w.label} className="g-stat-card">
                <span className="g-stat__n">{w.stat}</span>
                <span className="g-stat__label">{w.label}</span>
                <p className="g-stat__body">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="g-section g-section--light">
        <div className="g-container">
          <p className="g-eyebrow">Material Comparison</p>
          <h2 className="g-section__title">UPVC boards vs <em>aluminium.</em></h2>
          <p className="g-compare__intro">Both are greener than ply and MDF in Chennai's climate. Here's how to choose between them for your project.</p>
          <div className="g-compare">
            {[compareLeft, compareRight].map((col) => (
              <div key={col.head} className="g-compare-col">
                <p className="g-compare__head">{col.head}</p>
                <ul className="g-compare__list">{col.points.map((p) => <li key={p}>{p}</li>)}</ul>
                <p className="g-compare__verdict">{col.verdict}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="g-section">
        <div className="g-container">
          <p className="g-eyebrow">Our Process</p>
          <h2 className="g-section__title">From consultation to <em>handover.</em></h2>
          <div className="g-steps">
            {steps.map((s, i) => (
              <div key={s.n} className="g-step">
                <div className="g-step__connector">
                  <span className="g-step__n">{s.n}</span>
                  {i < steps.length - 1 && <span className="g-step__line" aria-hidden="true" />}
                </div>
                <div className="g-step__content">
                  <h3 className="g-step__title">{s.title}</h3>
                  <p className="g-step__body">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="g-section g-cta-section">
        <div className="g-container g-cta-inner">
          <div className="g-cta-icon" aria-hidden="true">◈</div>
          <h2 className="g-cta__headline">Ready to build <em>smarter?</em></h2>
          <p className="g-cta__body">Tell us what you're building — wardrobe, kitchen, partition, ceiling — and we'll recommend the right material for your budget and timeline.</p>
          <a href={WA_GREEN} className="g-btn g-btn--primary g-btn--lg">WhatsApp Us Now →</a>
          <p className="g-cta__note">Free site visit · No commitment</p>
          <p className="g-cta__email">Or email <a href="mailto:hello@aesthetichomes.net" className="g-link">hello@aesthetichomes.net</a></p>
        </div>
      </section>

      <style>{`
        .green-page{font-family:var(--font-body,'Georgia',serif);color:var(--color-text,#1a1a1a);background:var(--color-bg,#f8f7f4);--green-dark:#1e3a28;--green-mid:#2e5e3a;--green-accent:#3d7a4a;--green-light:#e8f2ea;--green-pale:#f2f8f3;--border:#dde8de}
        .g-container{max-width:1100px;margin:0 auto;padding:0 24px}
        .g-eyebrow{font-size:11px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--green-accent);margin-bottom:14px}
        .g-eyebrow--light{color:#7ec492}
        .g-section__title{font-size:clamp(26px,3.5vw,40px);font-weight:400;line-height:1.15;margin-bottom:48px;font-family:var(--font-display,'Georgia',serif)}
        .g-section__title em,.g-hero__headline em,.g-cta__headline em{font-style:italic;color:var(--green-accent)}
        .g-title--light{color:#fff}.g-title--light em{color:#7ec492}
        .g-hero{position:relative;padding:112px 0 96px;overflow:hidden;border-bottom:1px solid var(--border)}
        .g-hero__stripe{position:absolute;top:0;right:-60px;width:420px;height:100%;background:var(--green-pale);clip-path:polygon(12% 0,100% 0,100% 100%,0% 100%);z-index:0;pointer-events:none}
        .g-hero .g-container{position:relative;z-index:1}
        .g-sub-brand{display:inline-flex;align-items:center;gap:10px;font-size:13px;letter-spacing:.04em;color:var(--color-muted,#666);margin-bottom:24px}
        .g-sub-brand strong{color:var(--green-accent);font-weight:600}
        .g-dot{width:8px;height:8px;border-radius:50%;background:var(--green-accent);display:inline-block}
        .g-hero__headline{font-size:clamp(40px,6vw,68px);font-weight:400;line-height:1.1;margin-bottom:24px;font-family:var(--font-display,'Georgia',serif);max-width:560px}
        .g-hero__sub{font-size:18px;line-height:1.65;color:var(--color-muted,#555);max-width:500px;margin-bottom:40px}
        .g-hero__ctas{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:36px}
        .g-certs{display:flex;flex-wrap:wrap;gap:10px}
        .g-cert-pill{font-size:11px;font-weight:500;letter-spacing:.03em;color:var(--green-mid);background:var(--green-light);padding:5px 12px;border-radius:100px;border:1px solid var(--border)}
        .g-btn{display:inline-block;padding:13px 26px;font-size:14px;font-weight:600;letter-spacing:.03em;border-radius:4px;text-decoration:none;transition:opacity .2s,transform .18s}
        .g-btn:hover{opacity:.82;transform:translateY(-1px)}
        .g-btn--primary{background:var(--green-dark);color:#fff}
        .g-btn--ghost{border:1.5px solid var(--green-dark);color:var(--green-dark);background:transparent}
        .g-btn--lg{padding:16px 36px;font-size:15px}
        .g-mission{background:var(--green-dark);padding:48px 0}
        .g-mission__inner{display:flex;align-items:center;justify-content:space-between;gap:40px;flex-wrap:wrap}
        .g-mission__text{font-size:16px;line-height:1.7;color:rgba(255,255,255,.78);max-width:680px;margin:0}
        .g-mission__link{font-size:14px;font-weight:600;color:#7ec492;text-decoration:none;white-space:nowrap;border-bottom:1px solid #7ec49250;padding-bottom:2px}
        .g-section{padding:96px 0}
        .g-section--light{background:var(--green-pale)}
        .g-section--forest{background:var(--green-dark)}
        .g-solutions-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1px;border:1px solid var(--border);border-radius:8px;overflow:hidden;background:var(--border)}
        .g-sol-card{background:var(--color-bg,#f8f7f4);padding:36px 32px;transition:background .2s}
        .g-sol-card:hover{background:var(--green-pale)}
        .g-sol-card--soon{opacity:.6}
        .g-sol-card--soon:hover{background:var(--color-bg,#f8f7f4)}
        .g-sol-card__top{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
        .g-sol-icon{font-size:22px;color:var(--green-accent)}
        .g-sol-badges{display:flex;gap:6px;align-items:center}
        .g-sol-label{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--green-accent);background:var(--green-light);padding:4px 10px;border-radius:100px}
        .g-sol-soon-badge{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#888;background:#f0efeb;padding:4px 10px;border-radius:100px;border:1px solid #ddd}
        .g-sol-title{font-size:18px;font-weight:600;margin-bottom:12px;line-height:1.25}
        .g-sol-body{font-size:14px;line-height:1.65;color:var(--color-muted,#666);margin-bottom:20px}
        .g-sol-tags{display:flex;flex-wrap:wrap;gap:6px}
        .g-tag{font-size:11px;font-weight:500;color:var(--green-mid);border:1px solid var(--border);padding:3px 10px;border-radius:100px}
        .g-stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px}
        .g-stat-card{border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:36px 28px}
        .g-stat__n{display:block;font-size:52px;font-weight:300;color:#7ec492;font-family:var(--font-display,'Georgia',serif);line-height:1;margin-bottom:8px}
        .g-stat__label{display:block;font-size:14px;font-weight:600;color:#fff;margin-bottom:12px;text-transform:uppercase;letter-spacing:.06em}
        .g-stat__body{font-size:13px;line-height:1.6;color:rgba(255,255,255,.55)}
        .g-compare__intro{font-size:16px;line-height:1.65;color:var(--color-muted,#666);margin-top:-28px;margin-bottom:40px;max-width:580px}
        .g-compare{display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:start}
        .g-compare-col{border:1px solid var(--border);border-radius:8px;padding:36px 32px;background:#fff}
        .g-compare__head{font-size:18px;font-weight:600;color:var(--green-dark);margin-bottom:20px;padding-bottom:16px;border-bottom:2px solid var(--green-accent)}
        .g-compare__list{list-style:none;padding:0;margin:0 0 24px}
        .g-compare__list li{font-size:14px;line-height:1.6;padding:9px 0 9px 18px;border-bottom:1px solid var(--border);color:var(--color-text,#1a1a1a);position:relative}
        .g-compare__list li::before{content:'→';position:absolute;left:0;color:var(--green-accent);font-size:12px;top:10px}
        .g-compare__verdict{font-size:13px;line-height:1.65;color:var(--green-mid);background:var(--green-light);padding:14px 18px;border-radius:6px;border-left:3px solid var(--green-accent);margin:0}
        .g-steps{display:flex;flex-direction:column}
        .g-step{display:grid;grid-template-columns:72px 1fr;gap:24px;align-items:start}
        .g-step__connector{display:flex;flex-direction:column;align-items:center;padding-top:4px}
        .g-step__n{font-size:12px;font-weight:700;color:var(--green-accent);letter-spacing:.06em;background:var(--green-light);width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .g-step__line{width:1px;background:var(--border);flex:1;min-height:40px;margin:8px 0}
        .g-step__content{padding-bottom:40px}
        .g-step__title{font-size:17px;font-weight:600;margin-bottom:8px;line-height:1.3}
        .g-step__body{font-size:14px;line-height:1.65;color:var(--color-muted,#666)}
        .g-cta-section{border-top:1px solid var(--border);text-align:center}
        .g-cta-inner{max-width:580px}
        .g-cta-icon{font-size:32px;color:var(--green-light);display:block;margin-bottom:20px}
        .g-cta__headline{font-size:clamp(26px,4vw,44px);font-weight:400;line-height:1.15;margin-bottom:18px;font-family:var(--font-display,'Georgia',serif)}
        .g-cta__body{font-size:17px;line-height:1.65;color:var(--color-muted,#555);margin-bottom:36px}
        .g-cta__note{font-size:13px;color:var(--color-muted,#999);margin-top:14px}
        .g-cta__email{font-size:14px;color:var(--color-muted,#666);margin-top:10px}
        .g-link{color:var(--green-accent);text-decoration:none;border-bottom:1px solid currentColor}
        @media(max-width:768px){.g-hero{padding:80px 0 64px}.g-hero__stripe{display:none}.g-section{padding:64px 0}.g-mission__inner{flex-direction:column;gap:24px}.g-compare{grid-template-columns:1fr;gap:24px}.g-step{grid-template-columns:52px 1fr}}
      `}</style>
    </main>
  )
}
