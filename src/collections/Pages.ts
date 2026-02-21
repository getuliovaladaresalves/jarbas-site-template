import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { revalidatePage } from '@/hooks/revalidatePage'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { isPublished } from '@/access/isPublished'
import { blocks } from '@/blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Página', plural: 'Páginas' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },
  access: {
    read: isPublished,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    afterChange: [revalidatePage],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
    {
      name: 'layout',
      type: 'blocks',
      blocks,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Rascunho', value: 'draft' },
        { label: 'Publicado', value: 'published' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
