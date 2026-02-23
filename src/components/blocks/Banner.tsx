// SHELL — sem estilo. O @dev aplica o design-system.md neste componente.
import Image from 'next/image'
import Link from 'next/link'

interface BannerProps {
  heading?: string
  description?: string
  image?: { url?: string; alt?: string } | null
  ctaText?: string
  ctaLink?: { type?: string; url?: string; reference?: { slug?: string } | null }
  backgroundColor?: string
  textColor?: string
}

function getHref(link?: BannerProps['ctaLink']): string {
  if (!link) return '#'
  if (link.type === 'external') return link.url || '#'
  if (link.type === 'internal' && link.reference) return `/${(link.reference as { slug?: string }).slug || ''}`
  return link.url || '#'
}

export function Banner({ heading, description, image, ctaText, ctaLink, backgroundColor, textColor }: BannerProps) {
  return (
    <section
      className="relative"
      style={{
        backgroundColor: backgroundColor || undefined,
        color: textColor || undefined,
      }}
    >
      {image?.url && (
        <Image src={image.url} alt={image.alt || ''} fill className="object-cover" />
      )}
      <div className="relative container">
        <div>
          {heading && <h2>{heading}</h2>}
          {description && <p>{description}</p>}
        </div>
        {ctaText && (
          <Link href={getHref(ctaLink)}>{ctaText}</Link>
        )}
      </div>
    </section>
  )
}
