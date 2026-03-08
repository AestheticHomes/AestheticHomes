import type { Metadata } from 'next'
import EstimatorPage from '@/views/EstimatorPage'
import { SITE } from '@/lib/constants'
import { buildPageMetadata } from '@/lib/seo'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/estimator', {
    title: 'Interior Design Cost Estimator Chennai - Kitchen & Wardrobe Budget Calculator',
    description: `Estimate interior design costs in Chennai with our interactive calculator. Modular kitchens, wardrobes - live 2D plan + instant cost breakdown. Aesthetic Homes, ${SITE.projectCount} projects, ${SITE.rating}★.`,
  })
}

export default function Page() {
  return <EstimatorPage />
}
