// SHELL — sem estilo. O @dev aplica o design-system.md neste componente.
import Image from 'next/image'

interface GalleryImage {
  image?: { url?: string; alt?: string } | null
  caption?: string
}

interface GalleryProps {
  heading?: string
  images?: GalleryImage[]
  columns?: '2' | '3' | '4'
}

export function Gallery({ heading, images, columns = '3' }: GalleryProps) {
  return (
    <section className="container" data-columns={columns}>
      {heading && <h2>{heading}</h2>}
      {images && images.length > 0 && (
        <div>
          {images.map((item, i) => (
            <div key={i}>
              {item.image?.url && (
                <Image
                  src={item.image.url}
                  alt={item.image.alt || item.caption || ''}
                  fill
                  className="object-cover"
                />
              )}
              {item.caption && <p>{item.caption}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
