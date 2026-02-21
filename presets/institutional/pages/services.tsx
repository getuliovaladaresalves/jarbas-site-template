import Image from 'next/image'
import { getPayload } from '@/lib/payload'

export default async function ServicesPage() {
  const payload = await getPayload()
  const { docs: services } = await payload.find({
    collection: 'services',
    sort: 'order',
    limit: 50,
    depth: 1,
  })

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Nossos Serviços</h1>
      {services.length === 0 ? (
        <p className="text-gray-600">Nenhum serviço cadastrado ainda.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const icon = typeof service.icon === 'object' ? service.icon : null
            return (
              <div key={service.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                {icon?.url && (
                  <Image src={icon.url} alt={icon.alt || service.title} width={64} height={64} className="mb-4" />
                )}
                <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
