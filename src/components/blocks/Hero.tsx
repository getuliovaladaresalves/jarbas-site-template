// SHELL — sem estilo. O @dev aplica o design-system.md neste componente.
import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  heading?: string
  subheading?: string
  image?: { url?: string; alt?: string } | null
  ctaText?: string
  ctaLink?: { type?: string; url?: string; reference?: { slug?: string } | null; newTab?: boolean }
  overlayOpacity?: number
}

function getHref(link?: HeroProps['ctaLink']): string {
  if (!link) return '#'
  if (link.type === 'external') return link.url || '#'
  if (link.type === 'internal' && link.reference) return `/${(link.reference as { slug?: string }).slug || ''}`
  return link.url || '#'
}

export function Hero({ heading, subheading, image, ctaText, ctaLink, overlayOpacity = 50 }: HeroProps) {
  return (
    <section className="relative">
      {image?.url && (
        <Image src={image.url} alt={image.alt || ''} fill className="object-cover" priority />
      )}
      {image?.url && (
        <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity / 100 }} />
      )}
      <div className="relative container">
        {heading && <h1>{heading}</h1>}
        {subheading && <p>{subheading}</p>}
        {ctaText && (
          <Link href={getHref(ctaLink)} target={ctaLink?.newTab ? '_blank' : undefined}>
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  )
}
