import type { Field } from 'payload'

import { formatSlug } from '@/hooks/formatSlug'

export const slugField = (fieldToUse = 'title'): Field[] => [
  {
    name: 'slug',
    type: 'text',
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      description: `Auto-generated from ${fieldToUse}. You can override manually.`,
    },
    hooks: {
      beforeValidate: [formatSlug(fieldToUse)],
    },
  },
]
