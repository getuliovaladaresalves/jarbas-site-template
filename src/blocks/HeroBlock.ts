import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subtítulo',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagem de Fundo',
    },
    {
      name: 'ctaText',
      type: 'text',
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
      name: 'overlayOpacity',
      type: 'number',
      label: 'Opacidade do Overlay',
      min: 0,
      max: 100,
      defaultValue: 40,
      admin: {
        description: 'Opacidade do overlay escuro sobre a imagem (0-100)',
      },
    },
  ],
}
