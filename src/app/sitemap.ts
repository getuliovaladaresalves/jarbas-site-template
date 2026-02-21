import type { MetadataRoute } from 'next'
import { getPayload } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const payload = await getPayload()

  const [pages, posts] = await Promise.all([
    payload.find({
      collection: 'pages',
      where: { status: { equals: 'published' } },
      limit: 1000,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      limit: 1000,
      select: { slug: true, updatedAt: true },
    }),
  ])

  const pageEntries: MetadataRoute.Sitemap = pages.docs.map((page) => ({
    url: page.slug === 'home' ? siteUrl : `${siteUrl}/${page.slug}`,
    lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: page.slug === 'home' ? 1.0 : 0.8,
  }))

  const postEntries: MetadataRoute.Sitemap = posts.docs.map((post) => ({
    url: `${siteUrl}/posts/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...pageEntries, ...postEntries]
}
