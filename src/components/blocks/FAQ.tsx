// SHELL — sem estilo. O @dev aplica o design-system.md neste componente.
// Nota: @dev pode substituir <details> por Accordion do shadcn/ui se instalado.
interface FAQItem {
  question?: string
  answer?: Record<string, unknown>
}

interface FAQProps {
  heading?: string
  items?: FAQItem[]
}

export function FAQ({ heading, items }: FAQProps) {
  return (
    <section className="container">
      {heading && <h2>{heading}</h2>}
      {items && items.length > 0 && (
        <div>
          {items.map((item, i) => (
            <details key={i}>
              <summary>{item.question}</summary>
              <div>
                {typeof item.answer === 'string' ? item.answer : null}
              </div>
            </details>
          ))}
        </div>
      )}
    </section>
  )
}
