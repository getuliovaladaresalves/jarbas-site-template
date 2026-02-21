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
      className="relative py-16 overflow-hidden"
      style={{ backgroundColor: backgroundColor || '#1e40af', color: textColor || '#ffffff' }}
    >
      {image?.url && (
        <Image src={image.url} alt={image.alt || ''} fill className="object-cover opacity-20" />
      )}
      <div className="relative container flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          {heading && <h2 className="text-2xl md:text-3xl font-bold mb-2">{heading}</h2>}
          {description && <p className="opacity-90">{description}</p>}
        </div>
        {ctaText && (
          <Link
            href={getHref(ctaLink)}
            className="shrink-0 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  )
}
