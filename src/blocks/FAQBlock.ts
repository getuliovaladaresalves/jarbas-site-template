import type { Block } from 'payload'

export const FAQBlock: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Perguntas',
      labels: {
        singular: 'Pergunta',
        plural: 'Perguntas',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Pergunta',
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          label: 'Resposta',
        },
      ],
    },
  ],
}
