import type { GlobalConfig } from 'payload'

const linkGroup = {
  name: 'link',
  type: 'group' as const,
  label: 'Link',
  fields: [
    {
      name: 'type',
      type: 'select' as const,
      defaultValue: 'internal',
      options: [
        { label: 'Internal', value: 'internal' },
        { label: 'External', value: 'external' },
      ],
    },
    {
      name: 'url',
      type: 'text' as const,
      label: 'URL',
      admin: {
        condition: (_: unknown, siblingData: Record<string, unknown>) =>
          siblingData?.type === 'external',
      },
    },
    {
      name: 'reference',
      type: 'relationship' as const,
      relationTo: 'pages',
      label: 'Page',
      admin: {
        condition: (_: unknown, siblingData: Record<string, unknown>) =>
          siblingData?.type === 'internal',
      },
    },
    {
      name: 'newTab',
      type: 'checkbox' as const,
      label: 'Open in new tab',
    },
  ],
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
    update: ({ req: { user } }) => {
      const roles = (user?.roles as string[] | undefined) ?? []
      return roles.includes('admin') || roles.includes('editor')
    },
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Columns',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Column Title',
        },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Label',
            },
            linkGroup,
          ],
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: '© {year} Todos os direitos reservados.',
    },
    {
      name: 'showSocialLinks',
      type: 'checkbox',
      label: 'Show Social Links',
      defaultValue: true,
      admin: {
        description: 'Displays social links inherited from Site Settings.',
      },
    },
  ],
}
