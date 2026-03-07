/**
 * @file src/lib/constants.ts
 * @description Single source of truth for all business data.
 *
 * ┌─ HOW TO UPDATE ────────────────────────────────────────────────────────┐
 * │  Change phone number?  → edit CONTACT.phone1                           │
 * │  New project count?    → edit SITE.projectCount                       │
 * │  New service?          → add to SERVICES array                        │
 * │  New service area?     → add to SERVICE_AREAS array                   │
 * └────────────────────────────────────────────────────────────────────────┘
 */

import type { CategoryMeta, StatusMeta, NavItem } from '@/types'

// ─── SITE IDENTITY ────────────────────────────────────────────────────────────
export const SITE = {
  name:          'Aesthetic Homes',
  legalName:     'Aesthetic Homes Interiors and Engineering Services',
  tagline:       '10 Years. 53 Homes. Crafted for Life.',
  taglineSub:    'Budget-Friendly Luxury Interiors Across Chennai',
  url:           'https://aesthetichomes.co.in',
  logo:          'https://aesthetichomes.co.in/icons/icon-192.png',
  ogImage:       'https://aesthetichomes.co.in/og-image.jpg',
  gstin:         '33BNMPA8199N1ZB',
  founded:       2015,
  yearsInBiz:    10,
  projectCount:  53,
  rating:        4.9,
  reviewCount:   50,
} as const

// ─── CONTACT ──────────────────────────────────────────────────────────────────
export const CONTACT = {
  phone1:        '+917397330591',
  phone1Display: '+91 73973 30591',
  /** WhatsApp deep-link — pre-filled message */
  waLink1: 'https://wa.me/917397330591?text=Hi%20Aesthetic%20Homes%2C%20I%27d%20like%20a%20free%20site%20visit',
  email:   'admin@aesthetichomes.co.in',
  address: {
    street:  '10, Gokul Brindavan Flats, United India Colony',
    area:    'Kodambakkam',
    city:    'Chennai',
    state:   'Tamil Nadu',
    pincode: '600024',
    country: 'IN',
    full:    '10, Gokul Brindavan Flats, United India Colony, Kodambakkam, Chennai – 600024, Tamil Nadu',
    /** Coordinates for LocalBusiness schema and Maps */
    lat:  13.0569,
    lng:  80.2211,
  },
  googleMapsUrl: 'https://maps.google.com/?q=Aesthetic+Homes+Kodambakkam+Chennai+600024',
} as const

// ─── SOCIAL & PARTNER LINKS ───────────────────────────────────────────────────
export const SOCIAL = {
  instagram: 'https://www.instagram.com/aesthetichomes_in',
  youtube:   'https://www.youtube.com/@AestheticHomes_in',
} as const

export const HOMEFIX = {
  url:       'https://www.homefix.co.in',
  store:     'https://www.homefix.co.in/store',
  kitchens:  'https://www.homefix.co.in/store/kitchens',
  wardrobes: 'https://www.homefix.co.in/store/wardrobes',
  tvUnits:   'https://www.homefix.co.in/store/tv-units',
  estimator: 'https://www.homefix.co.in/estimator',
  designLab: 'https://www.homefix.co.in/design-lab',
} as const

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
/** Bottom nav items (mobile/tablet). Max 5 for thumb-reachability. */
export const BOTTOM_NAV_ITEMS: NavItem[] = [
  { id: 'home',     label: 'Home',     icon: '⌂',  ariaLabel: 'Go to home page' },
  { id: 'projects', label: 'Projects', icon: '▦',  ariaLabel: 'View our projects' },
  { id: 'services', label: 'Services', icon: '✦',  ariaLabel: 'Our services' },
  { id: 'store',    label: 'Store',    icon: '⬡',  ariaLabel: 'Shop on HomeFix', external: true, href: HOMEFIX.store },
  { id: 'contact',  label: 'Contact',  icon: '◉',  ariaLabel: 'Contact us' },
]

/** Desktop header nav links */
export const HEADER_NAV_LINKS = [
  { id: 'home'      as const, label: 'Home' },
  { id: 'projects'  as const, label: 'Projects' },
  { id: 'services'  as const, label: 'Services' },
  { id: 'about'     as const, label: 'About' },
  { id: 'blog'      as const, label: 'Blog' },
  { id: 'estimator' as const, label: 'Estimator' },
  { id: 'contact'   as const, label: 'Contact' },
  { id: 'store'     as const, label: 'HomeFix Store', external: true, href: HOMEFIX.store },
]

// ─── SERVICES ─────────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    id: 'full-home', icon: '🏠',
    title: 'Full Home Interiors',
    desc:  'End-to-end turnkey projects — concept, 3D design, supply, installation, handover.',
    startingFrom: null,
    homefixLink: null,
  },
  {
    id: 'kitchen', icon: '🍳',
    title: 'Modular Kitchen',
    desc:  'L-shaped, U-shaped, parallel & island layouts. Marine ply carcass. Italian/acrylic/laminate shutters.',
    startingFrom: '₹85,000',
    homefixLink: HOMEFIX.kitchens,
  },
  {
    id: 'wardrobe', icon: '🚪',
    title: 'Wardrobes & Storage',
    desc:  'Sliding, hinged and walk-in wardrobes. Loft storage. Custom fittings.',
    startingFrom: '₹45,000',
    homefixLink: HOMEFIX.wardrobes,
  },
  {
    id: 'tv-unit', icon: '📺',
    title: 'TV Units & Wall Panels',
    desc:  'Media walls, floating consoles, fluted panels, backlit units.',
    startingFrom: '₹18,000',
    homefixLink: HOMEFIX.tvUnits,
  },
  {
    id: 'bedroom', icon: '🛏',
    title: 'Bedroom Interiors',
    desc:  'Custom beds, side tables, dressing units, study desks and wardrobe combos.',
    startingFrom: null,
    homefixLink: null,
  },
  {
    id: 'living-room', icon: '🛋',
    title: 'Living Room',
    desc:  'False ceilings, accent walls, entertainment units, foyer design.',
    startingFrom: null,
    homefixLink: null,
  },
  {
    id: '3d-design', icon: '📐',
    title: '3D Visualization',
    desc:  'Photorealistic renders before a single nail is placed. Free with every project.',
    startingFrom: 'Free',
    homefixLink: HOMEFIX.designLab,
  },
  {
    id: 'renovation', icon: '🏗',
    title: 'Renovation & Remodeling',
    desc:  'Partial or full renovation. Civil, electrical, painting, waterproofing.',
    startingFrom: null,
    homefixLink: null,
  },
  {
    id: 'consulting', icon: '💡',
    title: 'Interior Consulting',
    desc:  'Paid 2-hour session — space planning, material selection, contractor review.',
    startingFrom: '₹2,500',
    homefixLink: null,
  },
] as const

// ─── TRUST SIGNALS (used in trust bars across pages) ─────────────────────────
export const TRUST_SIGNALS = [
  { label: `${SITE.yearsInBiz}+ Years`,    desc: `In business since ${SITE.founded}` },
  { label: `${SITE.projectCount} Projects`, desc: 'Completed across Chennai' },
  { label: `${SITE.rating}★ Rating`,       desc: `${SITE.reviewCount}+ Google reviews` },
  { label: 'GSTIN Registered',             desc: SITE.gstin },
  { label: '100km Radius',                 desc: 'Service coverage area' },
  { label: 'Free 3D Design',               desc: 'Before you commit' },
] as const

// ─── PROCESS STEPS ────────────────────────────────────────────────────────────
export const PROCESS_STEPS = [
  { num: '01', title: 'Free Site Visit',    desc: 'We come to your home in Chennai, take measurements and understand your vision — zero charge.' },
  { num: '02', title: '3D Design',          desc: 'Full 3D visualisation presented within 48 hours. See exactly what your space will look like.' },
  { num: '03', title: 'Transparent Quote',  desc: 'Detailed line-item quote. No hidden costs. Budget and premium options shown side by side.' },
  { num: '04', title: 'Execution',          desc: 'Our trained in-house team begins work with weekly photo updates on WhatsApp.' },
  { num: '05', title: 'Handover',           desc: 'Final walkthrough, punch-list clearance, GST invoice. Move in.' },
] as const

// ─── PROJECT CATEGORY DISPLAY MAP ────────────────────────────────────────────
export const CATEGORY_META: Record<string, CategoryMeta> = {
  'kitchen':     { label: 'Kitchen',      emoji: '🍳' },
  'wardrobe':    { label: 'Wardrobe',     emoji: '🚪' },
  'tv-unit':     { label: 'TV Unit',      emoji: '📺' },
  'living-room': { label: 'Living Room',  emoji: '🛋' },
  'bedroom':     { label: 'Bedroom',      emoji: '🛏' },
  'full-home':   { label: 'Full Home',    emoji: '🏠' },
  'bathroom':    { label: 'Bathroom',     emoji: '🚿' },
  'renovation':  { label: 'Renovation',   emoji: '🏗' },
  'commercial':  { label: 'Commercial',   emoji: '🏢' },
}

// ─── PROJECT STATUS DISPLAY MAP ───────────────────────────────────────────────
export const STATUS_META: Record<string, StatusMeta> = {
  completed: { label: 'Completed', badge: 'badge--green' },
  ongoing:   { label: 'Ongoing',   badge: 'badge--amber' },
  planning:  { label: 'Planning',  badge: 'badge--blue'  },
}

// ─── SERVICE AREAS (50 locations for SEO) ────────────────────────────────────
/** All areas Aesthetic Homes serves — used in SEO schemas and location pages */
export const SERVICE_AREAS = [
  // Core Chennai
  'Adyar', 'Anna Nagar', 'Velachery', 'OMR', 'Porur', 'Kodambakkam',
  'Nungambakkam', 'T Nagar', 'Mylapore', 'Perambur', 'Ambattur',
  'Avadi', 'Madipakkam', 'Thoraipakkam', 'Sholinganallur', 'Perungudi',
  'Guindy', 'KK Nagar', 'Ashok Nagar', 'Chromepet', 'Tambaram',
  'Pallavaram', 'Nanganallur', 'Medavakkam', 'Selaiyur', 'Gerugambakkam',
  'Mogappair', 'Poonamallee', 'Valasaravakkam', 'Virugambakkam',
  'Saidapet', 'Royapettah', 'Kilpauk', 'Chetpet', 'Egmore',
  'Tondiarpet', 'Kolathur', 'Villivakkam', 'Tirumullaivoyal',
  'Thiruvanmiyur', 'Besant Nagar', 'Kotturpuram', 'Neelankarai',
  'Injambakkam', 'Palavakkam', 'ECR', 'Perungalathur',
  // 100km radius towns
  'Kanchipuram', 'Chengalpattu', 'Mahabalipuram', 'Pondicherry',
  'Vellore', 'Tiruvallur', 'Sriperumbudur', 'Oragadam', 'Nellore',
] as const

// ─── HOME PAGE FAQS ───────────────────────────────────────────────────────────
/** FAQ entries — rendered as <details> and injected as FAQPage JSON-LD */
export const HOME_FAQS = [
  {
    q: 'How much does a modular kitchen cost in Chennai?',
    a: 'A modular kitchen in Chennai starts from ₹85,000 for a straight layout. L-shaped kitchens range from ₹1.2L–₹2.5L depending on size and finish. Aesthetic Homes offers transparent line-item quotes with zero hidden costs.',
  },
  {
    q: 'Do you offer a free interior design consultation in Chennai?',
    a: `Yes. We offer a free site visit and 3D design for all projects in Chennai and within 100km radius. Call or WhatsApp ${CONTACT.phone1Display} to schedule.`,
  },
  {
    q: 'How long does a full home interior project take?',
    a: 'A full 2BHK home interior typically takes 45–60 days from design approval to handover. Modular kitchens and wardrobes take 15–20 days from order confirmation.',
  },
  {
    q: 'Which areas in Chennai do you serve?',
    a: 'We serve all areas of Chennai — Adyar, Anna Nagar, OMR, Velachery, Kodambakkam, T Nagar, Porur, Tambaram and more. We also cover Kanchipuram, Chengalpattu, Pondicherry and up to 100km from Chennai.',
  },
  {
    q: 'Is Aesthetic Homes a registered business?',
    a: `Yes. Aesthetic Homes is GST registered. GSTIN: ${SITE.gstin}. We provide proper tax invoices for all projects.`,
  },
  {
    q: 'Can I order modular furniture directly?',
    a: `Yes — through HomeFix (homefix.co.in), our digital modular furniture platform. Browse, plan in 3D, and order kitchens, wardrobes and TV units with free installation in Chennai.`,
  },
] as const

export const SERVICES_FAQS = [
  {
    q: 'What interior design services do you offer in Chennai?',
    a: 'Aesthetic Homes offers modular kitchens, custom wardrobes, TV units, false ceilings, full home interior design, renovation and complete turnkey execution across Chennai.',
  },
  {
    q: 'What is included in a modular kitchen installation?',
    a: 'Our modular kitchen service includes free site measurement, 3D design, supply of cabinets, countertop, hardware, and installation. Appliances and plumbing are separate.',
  },
  {
    q: 'Do you handle full home interior design in Chennai?',
    a: 'Yes. We handle complete turnkey interior projects — from design and material selection to carpentry, painting, electrical and handover. We have completed 53+ full home projects across Chennai.',
  },
  {
    q: 'How much does a wardrobe cost in Chennai?',
    a: 'A custom wardrobe starts from ₹45,000 for a 6ft wide, 7ft tall sliding door unit. Price depends on size, material and finish. We provide a detailed line-item quote.',
  },
] as const

export const CONTACT_FAQS = [
  {
    q: 'How do I book a free site visit with Aesthetic Homes?',
    a: 'Call or WhatsApp +91 73973 30591 or fill the contact form. We visit anywhere in Chennai and within 100km — at no charge, with zero commitment.',
  },
  {
    q: 'What happens during the free site visit?',
    a: 'Our designer visits your home, takes measurements, understands your requirements and style preferences. Within 3–5 days we share a 3D design concept and transparent cost estimate.',
  },
  {
    q: 'Do I need to pay anything before signing a contract?',
    a: 'No. The site visit, 3D design and quotation are completely free. You only pay after reviewing and approving the final design and cost breakdown.',
  },
] as const

export const ABOUT_FAQS = [
  {
    q: 'How long has Aesthetic Homes been in business?',
    a: 'Aesthetic Homes was founded in 2015 and has over 10 years of experience in Chennai. We have completed 53+ projects ranging from single kitchens to complete 4BHK homes.',
  },
  {
    q: 'Who are the designers at Aesthetic Homes?',
    a: 'Our core team is a husband-and-wife duo — a civil engineer handling technical drawings and design, and an execution specialist managing on-site delivery and quality.',
  },
  {
    q: 'What makes Aesthetic Homes different from other interior designers in Chennai?',
    a: 'We combine professional design with direct execution — no third-party contractors. Every project is managed by our own team, ensuring quality control at every stage.',
  },
] as const
