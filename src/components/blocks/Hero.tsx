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
    <section className="relative min-h-[60vh] flex items-center justify-center text-white">
      {image?.url && (
        <Image src={image.url} alt={image.alt || ''} fill className="object-cover" priority />
      )}
      <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity / 100 }} />
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {heading && <h1 className="text-4xl md:text-6xl font-bold mb-4">{heading}</h1>}
        {subheading && <p className="text-lg md:text-xl mb-8 opacity-90">{subheading}</p>}
        {ctaText && (
          <Link
            href={getHref(ctaLink)}
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  )
}
