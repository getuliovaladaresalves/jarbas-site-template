// SHELL — sem estilo. O @dev aplica o design-system.md neste componente.
// data-highlighted indica o plano em destaque para o @dev estilizar diferente.
import Link from 'next/link'

interface Plan {
  name?: string
  price?: string
  period?: string
  features?: Array<{ feature?: string }>
  ctaText?: string
  ctaLink?: { type?: string; url?: string; reference?: { slug?: string } | null }
  highlighted?: boolean
}

interface PricingProps {
  heading?: string
  description?: string
  plans?: Plan[]
}

function getHref(link?: Plan['ctaLink']): string {
  if (!link) return '#'
  if (link.type === 'external') return link.url || '#'
  if (link.type === 'internal' && link.reference) return `/${(link.reference as { slug?: string }).slug || ''}`
  return link.url || '#'
}

export function Pricing({ heading, description, plans }: PricingProps) {
  return (
    <section className="container">
      {(heading || description) && (
        <div>
          {heading && <h2>{heading}</h2>}
          {description && <p>{description}</p>}
        </div>
      )}
      {plans && plans.length > 0 && (
        <div>
          {plans.map((plan, i) => (
            <div key={i} data-highlighted={plan.highlighted || undefined}>
              {plan.name && <h3>{plan.name}</h3>}
              <div>
                {plan.price && <span>{plan.price}</span>}
                {plan.period && <span>{plan.period}</span>}
              </div>
              {plan.features && (
                <ul>
                  {plan.features.map((f, j) => (
                    <li key={j}>{f.feature}</li>
                  ))}
                </ul>
              )}
              {plan.ctaText && (
                <Link href={getHref(plan.ctaLink)}>{plan.ctaText}</Link>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
