import type { Block } from 'payload'

export const FeaturesBlock: Block = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
  labels: {
    singular: 'Features',
    plural: 'Features',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Features',
      labels: {
        singular: 'Feature',
        plural: 'Features',
      },
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Ícone',
          admin: {
            description: 'Nome do ícone (ex: shield, zap, heart)',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Título',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descrição',
        },
        {
          name: 'link',
          type: 'group',
          label: 'Link',
          fields: [
            {
              name: 'type',
              type: 'select',
              defaultValue: 'external',
              options: [
                { label: 'Interno', value: 'internal' },
                { label: 'Externo', value: 'external' },
              ],
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'external',
              },
            },
            {
              name: 'reference',
              type: 'relationship',
              relationTo: 'pages',
              label: 'Página',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'internal',
              },
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Abrir em nova aba',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
