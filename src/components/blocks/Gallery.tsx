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
  const colClass = columns === '4' ? 'lg:grid-cols-4' : columns === '2' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'

  return (
    <section className="container py-16">
      {heading && <h2 className="text-3xl font-bold text-center mb-12">{heading}</h2>}
      {images && images.length > 0 && (
        <div className={`grid grid-cols-1 md:grid-cols-2 ${colClass} gap-4`}>
          {images.map((item, i) => (
            <div key={i} className="group relative aspect-square rounded-lg overflow-hidden">
              {item.image?.url && (
                <Image src={item.image.url} alt={item.image.alt || item.caption || ''} fill className="object-cover group-hover:scale-105 transition-transform" />
              )}
              {item.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm">{item.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
