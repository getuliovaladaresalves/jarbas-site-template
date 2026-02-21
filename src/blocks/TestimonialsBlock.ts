import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: {
    singular: 'Depoimentos',
    plural: 'Depoimentos',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'testimonials',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Depoimentos',
      labels: {
        singular: 'Depoimento',
        plural: 'Depoimentos',
      },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          label: 'Depoimento',
        },
        {
          name: 'author',
          type: 'text',
          required: true,
          label: 'Autor',
        },
        {
          name: 'role',
          type: 'text',
          label: 'Cargo / Função',
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          label: 'Foto',
        },
        {
          name: 'rating',
          type: 'number',
          label: 'Avaliação',
          min: 1,
          max: 5,
          admin: {
            description: 'Nota de 1 a 5 estrelas',
          },
        },
      ],
    },
  ],
}
