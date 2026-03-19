import type { Metadata } from 'next'
import LandingPage from '@/src/views/LandingPage'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/landingpage', {
    title: 'Interior Designers in Chennai - Free Site Visit & 3D Design',
    description: 'Free site visit, free 3D design, transparent quotes, and turnkey home interiors in Chennai by Aesthetic Homes. Modular kitchens, wardrobes, and full home interiors.',
  })
}

export default function Page() {
  return <LandingPage />
}
