import type { Block } from 'payload'

export const BannerBlock: Block = {
  slug: 'banner',
  interfaceName: 'BannerBlock',
  labels: {
    singular: 'Banner Promocional',
    plural: 'Banners Promocionais',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagem',
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
      name: 'backgroundColor',
      type: 'text',
      label: 'Cor de Fundo',
      admin: {
        description: 'Cor hexadecimal (ex: #1a1a2e)',
      },
    },
    {
      name: 'textColor',
      type: 'text',
      label: 'Cor do Texto',
      admin: {
        description: 'Cor hexadecimal (ex: #ffffff)',
      },
    },
  ],
}
