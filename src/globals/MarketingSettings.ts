import type { GlobalConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'

export const MarketingSettings: GlobalConfig = {
  slug: 'marketing-settings',
  label: 'Marketing Settings',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'metaPixelId',
      type: 'text',
      label: 'Meta Pixel ID',
    },
    {
      name: 'googleAdsId',
      type: 'text',
      label: 'Google Ads ID',
      admin: {
        description: 'Conversion ID (AW-XXXXXXXXX)',
      },
    },
    {
      name: 'googleAdsLabel',
      type: 'text',
      label: 'Google Ads Label',
    },
    {
      name: 'tiktokPixelId',
      type: 'text',
      label: 'TikTok Pixel ID',
    },
    {
      name: 'customHeadScripts',
      type: 'code',
      label: 'Custom Head Scripts',
      admin: {
        language: 'html',
        description: 'Scripts injected in <head>',
      },
    },
    {
      name: 'customBodyScripts',
      type: 'code',
      label: 'Custom Body Scripts',
      admin: {
        language: 'html',
        description: 'Scripts injected before </body>',
      },
    },
    {
      name: 'enableMetaPixel',
      type: 'checkbox',
      label: 'Enable Meta Pixel',
      defaultValue: false,
    },
    {
      name: 'enableGoogleAds',
      type: 'checkbox',
      label: 'Enable Google Ads',
      defaultValue: false,
    },
    {
      name: 'enableTiktok',
      type: 'checkbox',
      label: 'Enable TikTok Pixel',
      defaultValue: false,
    },
  ],
}
