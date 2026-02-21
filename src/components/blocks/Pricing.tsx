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
    <section className="container py-16">
      <div className="text-center mb-12">
        {heading && <h2 className="text-3xl font-bold mb-4">{heading}</h2>}
        {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
      </div>
      {plans && plans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-lg p-8 ${plan.highlighted ? 'bg-blue-600 text-white ring-2 ring-blue-600 scale-105' : 'bg-white border border-gray-200'}`}
            >
              {plan.name && <h3 className="text-xl font-bold mb-2">{plan.name}</h3>}
              <div className="mb-6">
                {plan.price && <span className="text-4xl font-bold">{plan.price}</span>}
                {plan.period && <span className={`text-sm ${plan.highlighted ? 'text-blue-100' : 'text-gray-500'}`}>{plan.period}</span>}
              </div>
              {plan.features && (
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <span className={plan.highlighted ? 'text-blue-200' : 'text-green-500'}>✓</span>
                      {f.feature}
                    </li>
                  ))}
                </ul>
              )}
              {plan.ctaText && (
                <Link
                  href={getHref(plan.ctaLink)}
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${plan.highlighted ? 'bg-white text-blue-600 hover:bg-blue-50' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  {plan.ctaText}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
