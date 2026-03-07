/**
 * @file src/types/index.ts
 * @description All TypeScript interfaces and types used across the app.
 *
 * STRUCTURE
 * ─────────
 * 1. Sanity CMS data shapes  — mirrors sanity schema fields
 * 2. App state types          — views, nav, routing
 * 3. Component prop types     — shared prop interfaces
 * 4. SEO types                — structured data helpers
 */

// ─── 1. SANITY CMS DATA SHAPES ───────────────────────────────────────────────

/** A Sanity image asset reference with optional hotspot/crop */
export interface SanityImage {
  asset: { _ref: string }
  hotspot?: { x: number; y: number; width: number; height: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
}

/** Portable Text block (rich text body field) */
export interface PortableTextBlock {
  _type: string
  _key:  string
  style?: string
  children?: Array<{ _key: string; _type: string; text: string; marks?: string[] }>
  markDefs?: Array<{ _key: string; _type: string; href?: string }>
}

/** A single gallery photo with optional metadata */
export interface GalleryImage {
  _key:     string
  asset:    { _ref: string }
  caption?: string
  isBefore?: boolean          // for before/after toggle in gallery
  hotspot?: { x: number; y: number }
}

/** Site diary entry for ongoing projects */
export interface ProgressUpdate {
  _key:   string
  date:   string
  update: string
  photo?: SanityImage
}

/** Interior design project document */
export interface Project {
  _id:               string
  title:             string
  slug:              { current: string }
  status:            'completed' | 'ongoing' | 'planning'
  featured:          boolean
  category:          ProjectCategory
  bhkType?:          string
  location:          string
  startDate?:        string
  completionDate?:   string
  duration?:         string
  budget?:           string
  shortDescription?: string
  description?:      PortableTextBlock[]
  coverImage?:       SanityImage
  gallery?:          GalleryImage[]
  videoUrl?:         string
  completionPercent?: number
  expectedCompletion?: string
  progressUpdates?:  ProgressUpdate[]
  tags?:             string[]
  clientName?:       string
  testimonial?:      string
  testimonialRating?: number
  homefixLink?:      string
  seoTitle?:         string
  seoDescription?:   string
}

/** Valid project category values */
export type ProjectCategory =
  | 'kitchen' | 'wardrobe' | 'tv-unit' | 'living-room'
  | 'bedroom'  | 'full-home' | 'bathroom' | 'renovation' | 'commercial'

/** Client testimonial document */
export interface Testimonial {
  _id:              string
  clientName:       string
  location?:        string
  rating:           1 | 2 | 3 | 4 | 5
  review:           string
  source?:          'Google' | 'Instagram' | 'WhatsApp' | 'Direct' | 'JustDial' | 'Sulekha'
  date?:            string
  showOnHomepage?:  boolean
  clientPhoto?:     SanityImage
  projectTitle?:    string   // populated via GROQ join
}

/** Blog / article document */
export interface BlogPost {
  _id:             string
  title:           string
  slug:            { current: string }
  coverImage?:     SanityImage
  excerpt?:        string
  body?:           PortableTextBlock[]
  category?:       BlogCategory
  publishedAt?:    string
  status:          'published' | 'draft'
  tags?:           string[]
  readingTime?:    number
  relatedProjects?: Array<{ title: string; slug: { current: string } }>
  seoTitle?:       string
  seoDescription?: string
  ogImage?:        SanityImage
}

export type BlogCategory =
  | 'design-tips' | 'kitchen' | 'wardrobe' | 'full-home'
  | 'budgeting' | 'renovation' | 'trends' | 'before-after' | 'homefix'

/** Team member document */
export interface TeamMember {
  _id:             string
  name:            string
  role:            string
  photo?:          SanityImage
  bio?:            string
  experience?:     number
  specialization?: string[]
  order?:          number
  isFounder?:      boolean
  socialLinks?:    { instagram?: string; linkedin?: string }
}

/** Global site settings (singleton document) */
export interface SiteSettings {
  phone:                string
  email?:               string
  address?:             string
  areaServed?:          string[]
  googleMapsUrl?:       string
  googleRating?:        number
  reviewCount?:         number
  heroHeadline?:        string
  heroSubtext?:         string
  announcementBar?:     string
  showAnnouncementBar?: boolean
  stats?:               Array<{ number: string; label: string }>
  instagram?:           string
  youtube?:             string
  homefixUrl?:          string
  defaultSeoDescription?: string
}

// ─── 2. APP STATE TYPES ───────────────────────────────────────────────────────

/** All valid SPA view names */
export type ViewName =
  | 'home' | 'projects' | 'services' | 'about'
  | 'blog' | 'contact'  | 'estimator' | 'store'

/** Bottom nav / desktop nav item definition */
export interface NavItem {
  id:       ViewName
  label:    string
  icon:     string     // emoji or svg string
  ariaLabel: string
  external?: boolean   // opens in new tab (e.g. HomeFix store)
  href?:     string    // external href if external === true
}

// ─── 3. SHARED COMPONENT PROP TYPES ──────────────────────────────────────────

/** Any component that needs to trigger navigation */
export interface WithNav {
  onNav: (view: ViewName) => void
}

/** Category display metadata */
export interface CategoryMeta {
  label: string
  emoji: string
  color?: string
}

/** Status display metadata */
export interface StatusMeta {
  label:  string
  badge:  string   // CSS class e.g. 'badge--green'
}

// ─── 4. SEO / STRUCTURED DATA ────────────────────────────────────────────────

/** Props for the <Seo> component */
export interface SeoProps {
  title?:       string
  description?: string
  canonical?:   string
  ogImage?:     string
  type?:        'website' | 'article'
  noIndex?:     boolean
  location?:    string
  article?:     { publishedAt?: string; tags?: string[] }
  jsonLd?:      object | object[]  // extra JSON-LD to inject
}

/** An FAQ entry for FAQ schema injection */
export interface FaqItem {
  q: string
  a: string
}
