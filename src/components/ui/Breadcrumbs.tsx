import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/seo'
import { SITE } from '@/lib/constants'

export interface BreadcrumbItem {
  name: string
  url?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Ensure we always have URLs for the schema. If it's the last item, fallback to the current page.
  const schemaItems = items.map((item) => ({
    name: item.name,
    url: item.url || SITE.url, // Default fallback, but pages should supply valid URLs
  }))

  return (
    <>
      <JsonLd id="breadcrumbs-schema" data={buildBreadcrumbSchema(schemaItems)} />
      <nav aria-label="breadcrumb">
        <ol
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--sp-2)',
            color: 'var(--c-text-muted)',
            fontSize: 'var(--fs-sm)',
            listStyle: 'none',
            padding: 0,
            margin: 0,
            flexWrap: 'wrap',
          }}
        >
          {items.map((item, i) => {
            const isLast = i === items.length - 1

            return (
              <li key={item.name} style={{ display: 'flex', alignItems: 'center' }}>
                {isLast || !item.url ? (
                  <span style={{ color: 'var(--c-text)' }} aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.url} style={{ color: 'inherit' }}>
                      {item.name}
                    </Link>
                    <span aria-hidden="true" style={{ marginLeft: 'var(--sp-2)' }}>
                      /
                    </span>
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
