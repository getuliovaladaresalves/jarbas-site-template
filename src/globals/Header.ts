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

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: () => true,
    update: ({ req: { user } }) => {
      const roles = (user?.roles as string[] | undefined) ?? []
      return roles.includes('admin') || roles.includes('editor')
    },
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      admin: {
        description: 'Overrides the logo from Site Settings if set.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        linkGroup,
        {
          name: 'children',
          type: 'array',
          label: 'Submenu Items',
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
      name: 'ctaButton',
      type: 'group',
      label: 'CTA Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
        },
        linkGroup,
        {
          name: 'show',
          type: 'checkbox',
          label: 'Show CTA Button',
          defaultValue: false,
        },
      ],
    },
  ],
}
