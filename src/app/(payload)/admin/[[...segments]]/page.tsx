/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { AdminViewProps } from 'payload'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { importMap } from '../importMap'
import config from '@/payload.config'

export { generateMetadata } from '@payloadcms/next/views'

const Page = ({ params, searchParams }: AdminViewProps) =>
  DefaultTemplate({ config, importMap, params, searchParams })

export default Page
