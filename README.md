# Aesthetic Homes — Web Application

**aesthetichomes.net** | Budget interior designer, Chennai | Est. 2015

---

## What This Is

A mobile-first Progressive Web App (PWA) for **Aesthetic Homes Interiors and Engineering Services** — a Chennai-based interior design firm with 53+ projects and 4.9★ Google rating. Built as a fast, SEO-optimised alternative to their Wix site, with a cross-domain SEO bridge to the sister brand **homefix.co.in**.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | CSS custom properties (zero Tailwind/Bootstrap) |
| SEO | react-helmet-async + JSON-LD schemas |
| CMS | Sanity v3 |
| PWA | vite-plugin-pwa + Workbox |
| Fonts | Google Fonts (Playfair Display + Plus Jakarta Sans) |
| Hosting | Cloudflare Pages (recommended) |

---

## Project Structure

```
aesthetic-homes/
├── index.html                    # HTML shell — viewport-fit=cover, PWA meta
├── vite.config.ts                # Build config + PWA plugin
├── package.json
│
├── public/
│   ├── manifest.json             # PWA manifest
│   ├── sw.js                     # Service worker (Workbox)
│   ├── offline.html              # Offline fallback page
│   └── icons/                    # PWA icons (96, 192, 512px)
│
├── src/
│   ├── main.tsx                  # React entry point
│   ├── App.tsx                   # Root: SPA router + splash screen
│   │
│   ├── styles/
│   │   └── tokens.css            # ★ MASTER DESIGN FILE — all CSS variables
│   │                               Edit this to restyle the entire site
│   │
│   ├── types/
│   │   └── index.ts              # All TypeScript interfaces
│   │
│   ├── lib/
│   │   ├── constants.ts          # All business data (phone, GSTIN, services, etc.)
│   │   ├── sanity.ts             # Sanity client, imgUrl helper, GROQ queries
│   │   └── hooks/
│   │       └── index.ts          # Custom React hooks
│   │
│   ├── components/
│   │   ├── layout/               # App chrome — rendered by Layout.tsx
│   │   │   ├── Layout.tsx        # ★ MASTER LAYOUT — wraps every page
│   │   │   ├── Header.tsx        # Fixed top header (safe-area aware)
│   │   │   ├── BottomNav.tsx     # Fixed bottom nav (mobile only)
│   │   │   ├── Footer.tsx        # Scrolling footer
│   │   │   └── WhatsAppButton.tsx # Floating WA button
│   │   │
│   │   ├── ui/
│   │   │   ├── index.tsx         # ★ All primitive components (Button, Badge, etc.)
│   │   │   ├── ProjectCard.tsx   # Project grid card
│   │   │   ├── TestimonialCard.tsx
│   │   │   ├── ServiceCard.tsx
│   │   │   └── BlogCard.tsx
│   │   │
│   │   ├── seo/
│   │   │   └── Seo.tsx           # react-helmet-async + all JSON-LD schemas
│   │   │
│   │   └── pwa/
│   │       └── index.tsx         # InstallBanner + SWUpdateBanner
│   │
│   └── views/                    # One file per page
│       ├── HomePage.tsx          # / or #home
│       ├── ProjectsPage.tsx      # #projects
│       ├── ServicesPage.tsx      # #services
│       ├── AboutPage.tsx         # #about
│       ├── BlogPage.tsx          # #blog
│       ├── ContactPage.tsx       # #contact
│       ├── EstimatorPage.tsx     # #estimator
│       └── StorePage.tsx         # #store
│
└── studio/                       # Sanity CMS studio (separate app)
    ├── sanity.config.ts
    └── schemas/
        └── index.ts              # project, testimonial, blogPost, teamMember, siteSettings
```

---

## Safe Viewport System

Every page automatically gets correct padding via **CSS variables in `tokens.css`**:

```css
--header-h:    56px (mobile) / 64px (desktop)
--bnav-h:      56px (mobile only)
--safe-top:    env(safe-area-inset-top)     ← iPhone notch/Dynamic Island
--safe-bottom: env(safe-area-inset-bottom)  ← iPhone home indicator

--page-top:    calc(var(--header-h) + var(--safe-top))
--page-bottom: calc(var(--bnav-h)   + var(--safe-bottom))
```

The `<main class="page-shell">` in `Layout.tsx` applies these:
```css
.page-shell {
  padding-top:    var(--page-top);     /* clears fixed header */
  padding-bottom: var(--page-bottom);  /* clears fixed bottom nav */
  min-height: 100dvh;                  /* dynamic viewport — handles mobile browser chrome */
}
```

**Every page just returns its JSX.** Header, footer, safe areas and nav are all handled by Layout.tsx.

---

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Sanity
```bash
# Create a free Sanity project at sanity.io
# Then update the projectId in:
#   src/lib/sanity.ts       ← line 12
#   studio/sanity.config.ts ← line 23

# Add CORS origins in sanity.io/manage → API:
#   http://localhost:5173
#   https://www.aesthetichomes.net
```

### 3. Run development server
```bash
npm run dev
# → http://localhost:5173
```

### 4. Run Sanity studio
```bash
cd studio
npm install
npx sanity dev
# → http://localhost:3333
```

### 5. Build for production
```bash
npm run build
# Output: dist/
```

---

## Deployment

### Cloudflare Pages (recommended)
1. Push repo to GitHub
2. Connect to Cloudflare Pages
3. Build command: `npm run build`
4. Output directory: `dist`
5. No server-side config needed (hash routing)

### Netlify / Vercel
Same build command. Add a rewrite rule for SPA routing if switching to path-based routing.

---

## Updating Business Data

All business data lives in **one file**: `src/lib/constants.ts`

| What to change | Where |
|---|---|
| Phone numbers | `CONTACT.phone1` / `phone2` |
| Project count | `SITE.projectCount` |
| Google rating | `SITE.rating` |
| Add a service | `SERVICES` array |
| Add a service area | `SERVICE_AREAS` array |
| Nav links | `BOTTOM_NAV_ITEMS` / `HEADER_NAV_LINKS` |
| Process steps | `PROCESS_STEPS` |
| FAQ content | `HOME_FAQS` |
| HomeFix URLs | `HOMEFIX` object |

---

## Design System

All visual tokens live in **one file**: `src/styles/tokens.css`

```css
/* Colours */
--c-bg:    #FAFAF7  (warm ivory)
--c-navy:  #0F1923  (deep navy)
--c-gold:  #C8A96E  (brushed gold — primary CTA)

/* Typography */
--f-serif: 'Playfair Display'  (headings)
--f-sans:  'Plus Jakarta Sans' (body)

/* Spacing: --sp-1 through --sp-24 */
/* Shadows: --shadow-xs through --shadow-gold */
/* Transitions: --t-base, --t-color, --t-transform */
```

To restyle the entire site: **edit tokens.css only**. No hardcoded values elsewhere.

---

## Reusable Components

### Primitive UI (`src/components/ui/index.tsx`)
```tsx
<Button variant="gold" size="lg">Get Quote</Button>
<LinkButton variant="navy" href={CONTACT.waLink1}>WhatsApp</LinkButton>
<Badge variant="green">Completed</Badge>
<SectionHeader eyebrow="Services" title={<>Our <em>Services</em></>} />
<TrustBar />                        {/* renders TRUST_SIGNALS from constants */}
<StarRating rating={4} />
<ProcessStep num="01" title="Site Visit" desc="..." />
<StatCard number="53+" label="Projects" />
<FaqAccordion items={HOME_FAQS} />
<PageHero eyebrow="About" title={<>Our <em>Story</em></>} />
<CtaStrip title="Ready?" primaryLabel="WhatsApp" primaryHref={...} />
<EmptyState icon="📂" title="No results" />
<SkeletonGrid count={6} />
```

### Card Components
```tsx
<ProjectCard project={p} wide={i === 0} onClick={fn} />
<TestimonialCard testimonial={t} />
<ServiceCard service={svc} compact onNav={fn} />  {/* homepage */}
<ServiceCard service={svc} />                      {/* services page */}
<BlogCard post={post} onClick={fn} />
```

### Hooks
```tsx
const ref = useReveal()           // scroll-reveal animations
const { data, loading } = useSanity<Project[]>(QUERIES.allProjects)
const isOnline = useOnlineStatus()
const { canInstall, triggerInstall } = usePwaInstall()
```

---

## SEO Architecture

### JSON-LD schemas injected on every page
- `HomeAndConstructionBusiness` (main org)
- `WebSite` with `SearchAction`
- `subOrganization` linking to HomeFix
- `hasOfferCatalog` with all services + prices

### Per-page schemas
- `BreadcrumbList` (all non-home pages)
- `FAQPage` (homepage)
- `LocalBusiness` (location pages)
- `Article` (blog posts — TODO)

### Location pages (future)
Run `node scripts/generate-location-pages.js` to generate 50+ static HTML files
for every area in `SERVICE_AREAS` (e.g. `/interior-designer-velachery`).

---

## PWA Features

- Service worker with Workbox (network-first for HTML, cache-first for assets)
- Offline fallback page (`public/offline.html`)
- Install banner (Android Chrome/Edge)
- SW update banner (auto-detects new version)
- App manifest with theme-color, icons, shortcuts

---

## Environment Variables

No `.env` required — the Sanity projectId is hardcoded (it's public by design).
The Sanity dataset is `production` and is read-only from the CDN.

---

## Contributing / Handing Off

1. Read `src/styles/tokens.css` to understand the design system
2. Read `src/lib/constants.ts` to understand all business data
3. Read `src/components/layout/Layout.tsx` to understand the page shell
4. Read `src/components/ui/index.tsx` to see all available primitives

Every file has a JSDoc header explaining purpose, sections, and how to extend it.

---

## Business Details

| Field | Value |
|---|---|
| Legal name | Aesthetic Homes Interiors and Engineering Services |
| GSTIN | 33BNMPA8199N1ZB |
| Founded | 2015 |
| Address | 10, Gokul Brindavan Flats, United India Colony, Kodambakkam, Chennai 600024 |
| WhatsApp 1 | +91 73973 30591 |
| WhatsApp 2 | +91 72000 91892 |
| Instagram | @aesthetichomes_in |
| YouTube | @AestheticHomes_in |
| Sister brand | homefix.co.in |
