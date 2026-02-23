// SHELL — sem estilo. O @dev aplica o design-system.md neste componente.
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
    <section className="container">
      {heading && <h2>{heading}</h2>}
      {testimonials && testimonials.length > 0 && (
        <div>
          {testimonials.map((t, i) => (
            <div key={i}>
              {t.rating && (
                <div aria-label={`${t.rating} de 5 estrelas`}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} aria-hidden="true" data-active={s < t.rating!}>★</span>
                  ))}
                </div>
              )}
              {t.quote && <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>}
              <div>
                {t.avatar?.url && (
                  <Image
                    src={t.avatar.url}
                    alt={t.avatar.alt || t.author || ''}
                    width={40}
                    height={40}
                  />
                )}
                <div>
                  {t.author && <p>{t.author}</p>}
                  {t.role && <p>{t.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
