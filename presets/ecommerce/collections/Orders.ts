import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: { singular: 'Pedido', plural: 'Pedidos' },
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'status', 'total', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      if (user?.id) return { customer: { equals: user.id } }
      return false
    },
    create: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'orderNumber', type: 'text', required: true, unique: true, admin: { readOnly: true } },
    { name: 'customer', type: 'relationship', relationTo: 'users' },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pendente', value: 'pending' },
        { label: 'Pago', value: 'paid' },
        { label: 'Enviado', value: 'shipped' },
        { label: 'Entregue', value: 'delivered' },
        { label: 'Cancelado', value: 'cancelled' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'product', type: 'relationship', relationTo: 'products', required: true },
        { name: 'quantity', type: 'number', required: true, min: 1 },
        { name: 'price', type: 'number', required: true, min: 0 },
      ],
    },
    { name: 'total', type: 'number', required: true, min: 0 },
    { name: 'paymentMethod', type: 'text' },
    { name: 'paymentId', type: 'text' },
    {
      name: 'shippingAddress',
      type: 'group',
      fields: [
        { name: 'street', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'state', type: 'text' },
        { name: 'zip', type: 'text' },
        { name: 'country', type: 'text', defaultValue: 'Brasil' },
      ],
    },
  ],
}
