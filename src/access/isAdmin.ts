import type { Access } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
  if (!user) return false

  const roles = user.roles as string[] | undefined

  return roles?.includes('admin') || false
}
