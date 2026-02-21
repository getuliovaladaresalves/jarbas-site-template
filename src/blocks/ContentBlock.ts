import type { Block } from 'payload'

export const ContentBlock: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  labels: {
    singular: 'Conteúdo',
    plural: 'Conteúdos',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Conteúdo',
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '1',
      label: 'Colunas',
      options: [
        { label: '1 Coluna', value: '1' },
        { label: '2 Colunas', value: '2' },
        { label: '3 Colunas', value: '3' },
      ],
    },
  ],
}
