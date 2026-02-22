import type { Metadata } from 'next'

interface MetaFields {
  title?: string | null
  description?: string | null
  image?: {
    url?: string | null
    alt?: string | null
  } | null
}

const defaultTitle = 'Site'
const defaultDescription = ''

// Accepts any Payload document (typed or untyped) with optional meta/title fields
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const generatePageMeta = (doc: Record<string, any> | null | undefined): Metadata => {
  const meta = doc?.meta as MetaFields | undefined
  const title = meta?.title || (doc?.title as string | undefined) || defaultTitle
  const description = meta?.description || defaultDescription

  const ogImage = meta?.image?.url
    ? [
        {
          url: meta.image.url,
          alt: meta.image.alt || '',
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

export const generateMeta = generatePageMeta
