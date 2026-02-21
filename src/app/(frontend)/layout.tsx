import React from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MarketingScripts } from '@/components/marketing/MarketingScripts'
import { getPayload } from '@/lib/payload'

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const payload = await getPayload()

  const [siteSettings, header, footer] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'footer' }),
  ])

  return (
    <>
      <MarketingScripts />
      <Header data={header} siteSettings={siteSettings} />
      <main className="min-h-screen">{children}</main>
      <Footer data={footer} siteSettings={siteSettings} />
    </>
  )
}
