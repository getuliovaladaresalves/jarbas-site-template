import Image from 'next/image'
import { getPayload } from '@/lib/payload'

export default async function AboutPage() {
  const payload = await getPayload()
  const { docs: team } = await payload.find({
    collection: 'team',
    sort: 'order',
    limit: 20,
    depth: 1,
  })

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Sobre Nós</h1>
      <div className="prose prose-lg max-w-none mb-16">
        <p>Conteúdo sobre a empresa. Edite esta página no admin ou crie uma Page com slug &quot;about&quot;.</p>
      </div>

      {team.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8">Nossa Equipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => {
              const photo = typeof member.photo === 'object' ? member.photo : null
              return (
                <div key={member.id} className="text-center">
                  {photo?.url && (
                    <Image src={photo.url} alt={photo.alt || member.name} width={200} height={200} className="rounded-full mx-auto mb-4 object-cover" />
                  )}
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  {member.role && <p className="text-gray-500 text-sm">{member.role}</p>}
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
