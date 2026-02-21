import type { Access } from 'payload'

export const isPublished: Access = ({ req: { user } }) => {
  if (user) {
    const roles = user.roles as string[] | undefined

    if (roles?.includes('admin') || roles?.includes('editor')) {
      return true
    }
  }

  return {
    status: {
      equals: 'published',
    },
  }
}
