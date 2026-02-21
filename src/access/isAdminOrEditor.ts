import type { Access } from 'payload'

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  if (!user) return false

  const roles = user.roles as string[] | undefined

  return roles?.includes('admin') || roles?.includes('editor') || false
}
