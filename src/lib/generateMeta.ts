import type { Metadata } from 'next'

interface MetaDoc {
  meta?: {
    title?: string | null
    description?: string | null
    image?: {
      url?: string | null
      alt?: string | null
    } | null
  }
  title?: string | null
}

const defaultTitle = 'Site'
const defaultDescription = ''

export const generateMeta = (doc: MetaDoc | null | undefined): Metadata => {
  const title = doc?.meta?.title || doc?.title || defaultTitle
  const description = doc?.meta?.description || defaultDescription

  const ogImage = doc?.meta?.image?.url
    ? [
        {
          url: doc.meta.image.url,
          alt: doc.meta.image.alt || '',
        },
      ]
    : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage,
    },
  }
}
