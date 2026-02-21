import type { CollectionBeforeChangeHook } from 'payload'

export const populatePublishedAt: CollectionBeforeChangeHook = ({
  data,
  operation,
  originalDoc,
}) => {
  const isPublishing = data?.status === 'published'
  const wasNotPublished = originalDoc?.status !== 'published'
  const hasNoPublishedAt = !data?.publishedAt

  if (isPublishing && (operation === 'create' || wasNotPublished) && hasNoPublishedAt) {
    return {
      ...data,
      publishedAt: new Date().toISOString(),
    }
  }

  return data
}
