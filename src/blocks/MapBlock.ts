import type { Block } from 'payload'

export const MapBlock: Block = {
  slug: 'map',
  interfaceName: 'MapBlock',
  labels: {
    singular: 'Mapa',
    plural: 'Mapas',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Título',
    },
    {
      name: 'embedUrl',
      type: 'textarea',
      required: true,
      label: 'URL de Embed do Google Maps',
      admin: {
        description: 'Cole aqui a URL de incorporação do Google Maps',
      },
    },
    {
      name: 'height',
      type: 'number',
      defaultValue: 400,
      label: 'Altura (px)',
      admin: {
        description: 'Altura do mapa em pixels',
      },
    },
  ],
}
