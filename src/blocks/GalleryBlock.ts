import type { Block } from 'payload'

export const GalleryBlock: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: {
    singular: 'Galeria',
    plural: 'Galerias',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Título',
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Imagens',
      labels: {
        singular: 'Imagem',
        plural: 'Imagens',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Imagem',
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Legenda',
        },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      label: 'Colunas',
      options: [
        { label: '2 Colunas', value: '2' },
        { label: '3 Colunas', value: '3' },
        { label: '4 Colunas', value: '4' },
      ],
    },
  ],
}
