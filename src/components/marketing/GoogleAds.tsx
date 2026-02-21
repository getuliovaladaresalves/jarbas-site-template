'use client'

import Script from 'next/script'

export function GoogleAds({ conversionId }: { conversionId: string }) {
  if (!conversionId) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${conversionId}`} strategy="afterInteractive" />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${conversionId}');
        `}
      </Script>
    </>
  )
}

export function trackConversion(conversionId: string, conversionLabel: string, value?: number) {
  if (typeof window !== 'undefined' && (window as Record<string, unknown>).gtag) {
    ;(window as Record<string, (...args: unknown[]) => void>).gtag('event', 'conversion', {
      send_to: `${conversionId}/${conversionLabel}`,
      value,
    })
  }
}
