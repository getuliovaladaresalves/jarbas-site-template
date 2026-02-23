// SHELL — sem estilo. O @dev aplica o design-system.md neste componente.
import Link from 'next/link'

interface CTAProps {
  heading?: string
  description?: string
  ctaText?: string
  ctaLink?: { type?: string; url?: string; reference?: { slug?: string } | null; newTab?: boolean }
  style?: 'primary' | 'secondary' | 'outline'
}

function getHref(link?: CTAProps['ctaLink']): string {
  if (!link) return '#'
  if (link.type === 'external') return link.url || '#'
  if (link.type === 'internal' && link.reference) return `/${(link.reference as { slug?: string }).slug || ''}`
  return link.url || '#'
}

export function CTA({ heading, description, ctaText, ctaLink, style = 'primary' }: CTAProps) {
  return (
    <section>
      <div className="container">
        {heading && <h2>{heading}</h2>}
        {description && <p>{description}</p>}
        {ctaText && (
          <Link
            href={getHref(ctaLink)}
            target={ctaLink?.newTab ? '_blank' : undefined}
            data-style={style}
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  )
}
