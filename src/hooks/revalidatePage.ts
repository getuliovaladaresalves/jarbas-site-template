import type { CollectionAfterChangeHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidatePage: CollectionAfterChangeHook = ({
  doc,
  collection,
  req: { payload },
}) => {
  const slug = doc.slug as string | undefined
  const collectionSlug = collection.slug

  payload.logger.info(
    `Revalidating ${collectionSlug}: ${slug ?? doc.id}`,
  )

  if (collectionSlug === 'pages') {
    const pagePath = slug === 'home' ? '/' : `/${slug}`
    revalidatePath(pagePath)
    revalidateTag('pages')
  }

  if (collectionSlug === 'posts') {
    revalidatePath(`/posts/${slug}`)
    revalidatePath('/posts')
    revalidateTag('posts')
  }

  revalidateTag(collectionSlug)

  return doc
}
