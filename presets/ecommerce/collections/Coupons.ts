import type { CollectionConfig } from 'payload'

export const Coupons: CollectionConfig = {
  slug: 'coupons',
  labels: { singular: 'Cupom', plural: 'Cupons' },
  admin: {
    useAsTitle: 'code',
    defaultColumns: ['code', 'type', 'value', 'active'],
  },
  access: {
    read: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'code', type: 'text', required: true, unique: true },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Porcentagem', value: 'percentage' },
        { label: 'Valor Fixo', value: 'fixed' },
      ],
      required: true,
    },
    { name: 'value', type: 'number', required: true, min: 0 },
    { name: 'minOrder', type: 'number', min: 0, admin: { description: 'Valor mínimo do pedido (R$)' } },
    { name: 'maxUses', type: 'number', min: 0 },
    { name: 'usedCount', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'validFrom', type: 'date' },
    { name: 'validUntil', type: 'date' },
    { name: 'active', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}
