import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  labels: { singular: 'Cliente', plural: 'Clientes' },
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      if (user?.id) return { id: { equals: user.id } }
      return false
    },
    create: () => true,
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      if (user?.id) return { id: { equals: user.id } }
      return false
    },
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'phone', type: 'text' },
    {
      name: 'addresses',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Principal' },
        { name: 'street', type: 'text', required: true },
        { name: 'city', type: 'text', required: true },
        { name: 'state', type: 'text', required: true },
        { name: 'zip', type: 'text', required: true },
        { name: 'country', type: 'text', defaultValue: 'Brasil' },
        { name: 'isDefault', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
}
