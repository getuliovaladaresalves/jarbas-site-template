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
    <section className="container py-16 max-w-3xl mx-auto">
      {heading && <h2 className="text-3xl font-bold text-center mb-12">{heading}</h2>}
      {items && items.length > 0 && (
        <div className="space-y-4">
          {items.map((item, i) => (
            <details key={i} className="group border border-gray-200 rounded-lg">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-medium hover:bg-gray-50">
                {item.question}
                <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-4 pb-4 text-gray-600 text-sm">
                {typeof item.answer === 'string' ? item.answer : 'Conteúdo da resposta'}
              </div>
            </details>
          ))}
        </div>
      )}
    </section>
  )
}
