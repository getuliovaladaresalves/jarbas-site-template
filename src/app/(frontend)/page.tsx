import { getPayload } from '@/lib/payload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'

export default async function HomePage() {
  const payload = await getPayload()

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  const page = docs[0]

  if (!page) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao seu site</h1>
        <p className="text-lg text-gray-600 mb-8">
          Acesse <a href="/admin" className="text-blue-600 underline">/admin</a> para criar sua primeira página com slug &quot;home&quot;.
        </p>
      </div>
    )
  }

  return <RenderBlocks blocks={page.layout ?? []} />
}
