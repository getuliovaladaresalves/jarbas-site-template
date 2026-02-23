import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import sharp from 'sharp'

import { Pages } from '@/collections/Pages'
import { Posts } from '@/collections/Posts'
import { Media } from '@/collections/Media'
import { Users } from '@/collections/Users'
import { Categories } from '@/collections/Categories'

import { SiteSettings } from '@/globals/SiteSettings'
import { Header } from '@/globals/Header'
import { Footer } from '@/globals/Footer'
import { SEOSettings } from '@/globals/SEOSettings'
import { MarketingSettings } from '@/globals/MarketingSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Pages, Posts, Media, Users, Categories],

  globals: [SiteSettings, Header, Footer, SEOSettings, MarketingSettings],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: process.env.DATABASE_URI
    ? postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI,
        },
      })
    : sqliteAdapter({
        client: {
          url: `file:${path.resolve(dirname, '..', 'data', 'dev.db')}`,
        },
      }),

  sharp,

  plugins: [
    seoPlugin({
      collections: ['pages', 'posts'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) =>
        `${(doc as Record<string, unknown>).title ?? ''} | Site`,
      generateDescription: ({ doc }) =>
        (doc as Record<string, unknown>).excerpt as string ?? '',
    }),
    redirectsPlugin({
      collections: ['pages', 'posts'],
    }),
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        select: true,
        email: true,
        state: false,
        country: false,
        checkbox: true,
        number: true,
        message: true,
        payment: false,
      },
    }),
  ],
})
