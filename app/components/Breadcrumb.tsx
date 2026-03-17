interface BreadcrumbItem {
  href: string
  label: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb-nav">
      <ol className="breadcrumb-list">
        {items.map((item, i) => (
          <li key={item.href} className="breadcrumb-item">
            {i < items.length - 1 ? (
              <a href={item.href} className="breadcrumb-link">{item.label}</a>
            ) : (
              <span className="breadcrumb-current" aria-current="page">{item.label}</span>
            )}
            {i < items.length - 1 && (
              <span className="breadcrumb-sep" aria-hidden="true">›</span>
            )}
          </li>
        ))}
      </ol>
      <style>{`
        .breadcrumb-nav { padding: 16px 0 0; }
        .breadcrumb-list { display:flex; flex-wrap:wrap; align-items:center; gap:4px; list-style:none; padding:0; margin:0; }
        .breadcrumb-item { display:flex; align-items:center; gap:4px; font-size:13px; }
        .breadcrumb-link { color:var(--color-muted,#666); text-decoration:none; }
        .breadcrumb-link:hover { text-decoration:underline; }
        .breadcrumb-current { color:var(--color-text,#1a1a1a); font-weight:500; }
        .breadcrumb-sep { color:var(--color-muted,#aaa); }
      `}</style>
    </nav>
  )
}
