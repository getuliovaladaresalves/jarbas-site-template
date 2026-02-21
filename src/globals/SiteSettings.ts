import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => {
      const roles = (user?.roles as string[] | undefined) ?? []
      return roles.includes('admin')
    },
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      label: 'Site Name',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      label: 'Favicon',
    },
    {
      name: 'primaryColor',
      type: 'text',
      label: 'Primary Color',
      defaultValue: '#3b82f6',
    },
    {
      name: 'secondaryColor',
      type: 'text',
      label: 'Secondary Color',
      defaultValue: '#1e40af',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'WhatsApp', value: 'whatsapp' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Phone',
        },
        {
          name: 'email',
          type: 'text',
          label: 'Email',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Address',
        },
      ],
    },
    {
      name: 'businessHours',
      type: 'array',
      label: 'Business Hours',
      fields: [
        {
          name: 'day',
          type: 'text',
          required: true,
          label: 'Day',
        },
        {
          name: 'hours',
          type: 'text',
          required: true,
          label: 'Hours',
        },
      ],
    },
  ],
}
