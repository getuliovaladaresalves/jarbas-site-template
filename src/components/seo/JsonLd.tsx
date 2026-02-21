'use client'

interface OrganizationData {
  name: string
  url: string
  logo?: string
  sameAs?: string[]
  contactPoint?: { telephone?: string; email?: string }
}

interface WebPageData {
  title: string
  description: string
  url: string
}

interface ArticleData {
  title: string
  description?: string
  url: string
  image?: string
  author?: string
  datePublished?: string
  dateModified?: string
}

interface BreadcrumbItem {
  name: string
  url: string
}

type JsonLdProps =
  | { type: 'Organization'; data: OrganizationData }
  | { type: 'WebPage'; data: WebPageData }
  | { type: 'Article'; data: ArticleData }
  | { type: 'BreadcrumbList'; data: { items: BreadcrumbItem[] } }

export function JsonLd(props: JsonLdProps) {
  let schema: Record<string, unknown> = {}

  switch (props.type) {
    case 'Organization':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: props.data.name,
        url: props.data.url,
        logo: props.data.logo,
        sameAs: props.data.sameAs,
        contactPoint: props.data.contactPoint
          ? {
              '@type': 'ContactPoint',
              telephone: props.data.contactPoint.telephone,
              email: props.data.contactPoint.email,
            }
          : undefined,
      }
      break
    case 'WebPage':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: props.data.title,
        description: props.data.description,
        url: props.data.url,
      }
      break
    case 'Article':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: props.data.title,
        description: props.data.description,
        url: props.data.url,
        image: props.data.image,
        author: props.data.author ? { '@type': 'Person', name: props.data.author } : undefined,
        datePublished: props.data.datePublished,
        dateModified: props.data.dateModified,
      }
      break
    case 'BreadcrumbList':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: props.data.items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }
      break
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
