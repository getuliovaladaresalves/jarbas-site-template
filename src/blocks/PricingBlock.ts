import type { Block } from 'payload'

export const PricingBlock: Block = {
  slug: 'pricing',
  interfaceName: 'PricingBlock',
  labels: {
    singular: 'Tabela de Preços',
    plural: 'Tabelas de Preços',
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
      name: 'plans',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Planos',
      labels: {
        singular: 'Plano',
        plural: 'Planos',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Nome do Plano',
        },
        {
          name: 'price',
          type: 'text',
          required: true,
          label: 'Preço',
          admin: {
            description: 'Ex: R$ 99,90',
          },
        },
        {
          name: 'period',
          type: 'text',
          label: 'Período',
          admin: {
            description: 'Ex: /mês, /ano',
          },
        },
        {
          name: 'features',
          type: 'array',
          label: 'Recursos',
          labels: {
            singular: 'Recurso',
            plural: 'Recursos',
          },
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
              label: 'Recurso',
            },
          ],
        },
        {
          name: 'ctaText',
          type: 'text',
          label: 'Texto do Botão',
          defaultValue: 'Contratar',
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
          name: 'highlighted',
          type: 'checkbox',
          label: 'Destacado',
          defaultValue: false,
          admin: {
            description: 'Destacar este plano como recomendado',
          },
        },
      ],
    },
  ],
}
