interface Feature {
  icon?: string
  title?: string
  description?: string
}

interface FeaturesProps {
  heading?: string
  description?: string
  features?: Feature[]
}

export function Features({ heading, description, features }: FeaturesProps) {
  return (
    <section className="container py-16">
      <div className="text-center mb-12">
        {heading && <h2 className="text-3xl font-bold mb-4">{heading}</h2>}
        {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
      </div>
      {features && features.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              {f.icon && <span className="text-3xl mb-4 block">{f.icon}</span>}
              {f.title && <h3 className="text-xl font-semibold mb-2">{f.title}</h3>}
              {f.description && <p className="text-gray-600 text-sm">{f.description}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
