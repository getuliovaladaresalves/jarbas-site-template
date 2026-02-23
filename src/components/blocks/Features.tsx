// SHELL — sem estilo. O @dev aplica o design-system.md neste componente.
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
    <section className="container">
      {(heading || description) && (
        <div>
          {heading && <h2>{heading}</h2>}
          {description && <p>{description}</p>}
        </div>
      )}
      {features && features.length > 0 && (
        <div>
          {features.map((f, i) => (
            <div key={i}>
              {f.icon && <span>{f.icon}</span>}
              {f.title && <h3>{f.title}</h3>}
              {f.description && <p>{f.description}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
