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

const btnStyles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-800 text-white hover:bg-gray-900',
  outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
}

export function CTA({ heading, description, ctaText, ctaLink, style = 'primary' }: CTAProps) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container text-center max-w-2xl mx-auto">
        {heading && <h2 className="text-3xl font-bold mb-4">{heading}</h2>}
        {description && <p className="text-gray-600 mb-8">{description}</p>}
        {ctaText && (
          <Link
            href={getHref(ctaLink)}
            className={`inline-block px-8 py-3 font-semibold rounded-lg transition-colors ${btnStyles[style]}`}
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  )
}
