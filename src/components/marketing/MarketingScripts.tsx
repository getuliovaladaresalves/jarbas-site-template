import { getPayload } from '@/lib/payload'
import { GoogleAnalytics } from '@/components/seo/GoogleAnalytics'
import { MetaPixel } from './MetaPixel'
import { GoogleTagManager } from './GoogleTagManager'
import { GoogleAds } from './GoogleAds'
import { ConsentBanner } from './ConsentBanner'

export async function MarketingScripts() {
  const payload = await getPayload()

  const [seoSettings, marketingSettings] = await Promise.all([
    payload.findGlobal({ slug: 'seo-settings' }),
    payload.findGlobal({ slug: 'marketing-settings' }),
  ])

  return (
    <>
      {seoSettings.googleAnalyticsId && (
        <GoogleAnalytics gaId={seoSettings.googleAnalyticsId} />
      )}
      {seoSettings.googleTagManagerId && (
        <GoogleTagManager gtmId={seoSettings.googleTagManagerId} />
      )}
      {marketingSettings.enableMetaPixel && marketingSettings.metaPixelId && (
        <MetaPixel pixelId={marketingSettings.metaPixelId} />
      )}
      {marketingSettings.enableGoogleAds && marketingSettings.googleAdsId && (
        <GoogleAds conversionId={marketingSettings.googleAdsId} />
      )}
      {marketingSettings.customHeadScripts && (
        <div dangerouslySetInnerHTML={{ __html: marketingSettings.customHeadScripts }} />
      )}
      <ConsentBanner />
    </>
  )
}
