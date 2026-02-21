import Image from 'next/image'

interface Testimonial {
  quote?: string
  author?: string
  role?: string
  avatar?: { url?: string; alt?: string } | null
  rating?: number
}

interface TestimonialsProps {
  heading?: string
  testimonials?: Testimonial[]
}

export function Testimonials({ heading, testimonials }: TestimonialsProps) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container">
        {heading && <h2 className="text-3xl font-bold text-center mb-12">{heading}</h2>}
        {testimonials && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                {t.rating && (
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span key={s} className={s < t.rating! ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                )}
                {t.quote && <p className="text-gray-700 mb-4 italic">&ldquo;{t.quote}&rdquo;</p>}
                <div className="flex items-center gap-3">
                  {t.avatar?.url && (
                    <Image src={t.avatar.url} alt={t.avatar.alt || t.author || ''} width={40} height={40} className="rounded-full" />
                  )}
                  <div>
                    {t.author && <p className="font-semibold text-sm">{t.author}</p>}
                    {t.role && <p className="text-gray-500 text-xs">{t.role}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
