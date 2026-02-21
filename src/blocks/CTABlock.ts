import type { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'cta',
  interfaceName: 'CTABlock',
  labels: {
    singular: 'Call to Action',
    plural: 'Calls to Action',
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
      name: 'ctaText',
      type: 'text',
      required: true,
      label: 'Texto do Botão',
    },
    {
      name: 'ctaLink',
      type: 'group',
      label: 'Link do Botão',
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
    {
      name: 'style',
      type: 'select',
      defaultValue: 'primary',
      label: 'Estilo',
      options: [
        { label: 'Primário', value: 'primary' },
        { label: 'Secundário', value: 'secondary' },
        { label: 'Outline', value: 'outline' },
      ],
    },
  ],
}
