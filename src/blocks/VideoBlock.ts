import type { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'video',
  interfaceName: 'VideoBlock',
  labels: {
    singular: 'Vídeo',
    plural: 'Vídeos',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Título',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'URL do Vídeo',
      admin: {
        description: 'URL do YouTube ou Vimeo',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Legenda',
    },
  ],
}
