import type { GlobalConfig } from 'payload'

export const SEOSettings: GlobalConfig = {
  slug: 'seo-settings',
  label: 'SEO Settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => {
      const roles = (user?.roles as string[] | undefined) ?? []
      return roles.includes('admin')
    },
  },
  fields: [
    {
      name: 'googleAnalyticsId',
      type: 'text',
      label: 'Google Analytics ID',
      admin: {
        description: 'GA4 Measurement ID (G-XXXXXXXXXX)',
      },
    },
    {
      name: 'googleSearchConsoleId',
      type: 'text',
      label: 'Google Search Console ID',
      admin: {
        description: 'Verification meta tag content',
      },
    },
    {
      name: 'googleTagManagerId',
      type: 'text',
      label: 'Google Tag Manager ID',
      admin: {
        description: 'GTM Container ID (GTM-XXXXXXX)',
      },
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Default OG Image',
    },
    {
      name: 'sitemapExclude',
      type: 'array',
      label: 'Sitemap Exclusions',
      fields: [
        {
          name: 'path',
          type: 'text',
          required: true,
          label: 'Path',
          admin: {
            description: 'Path to exclude e.g. /admin',
          },
        },
      ],
    },
    {
      name: 'robotsCustomRules',
      type: 'textarea',
      label: 'Custom Robots Rules',
    },
  ],
}
