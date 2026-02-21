import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Produto', plural: 'Produtos' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'stock', 'status'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'editor',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'description', type: 'richText' },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        { name: 'price', type: 'number', required: true, min: 0 },
        { name: 'compareAtPrice', type: 'number', min: 0 },
      ],
    },
    { name: 'sku', type: 'text', admin: { position: 'sidebar' } },
    { name: 'stock', type: 'number', defaultValue: 0, min: 0, admin: { position: 'sidebar' } },
    {
      name: 'images',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    { name: 'categories', type: 'relationship', relationTo: 'categories', hasMany: true },
    {
      name: 'variants',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'price', type: 'number', min: 0 },
        { name: 'sku', type: 'text' },
        { name: 'stock', type: 'number', defaultValue: 0, min: 0 },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Rascunho', value: 'draft' },
        { label: 'Publicado', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: { position: 'sidebar' },
    },
  ],
}
