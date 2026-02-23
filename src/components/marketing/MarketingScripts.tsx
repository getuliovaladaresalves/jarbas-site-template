import { getPayload } from '@/lib/payload'
import { GoogleAnalytics } from '@/components/seo/GoogleAnalytics'
import { MetaPixel } from './MetaPixel'
import { GoogleTagManager } from './GoogleTagManager'
import { GoogleAds } from './GoogleAds'
import { TikTokPixel } from './TikTokPixel'
import { ConsentBanner } from './ConsentBanner'

export async function MarketingScripts() {
  try {
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
        {marketingSettings.enableTiktok && marketingSettings.tiktokPixelId && (
          <TikTokPixel pixelId={marketingSettings.tiktokPixelId} />
        )}
        {marketingSettings.customHeadScripts && (
          <div dangerouslySetInnerHTML={{ __html: marketingSettings.customHeadScripts }} />
        )}
        {marketingSettings.customBodyScripts && (
          <div dangerouslySetInnerHTML={{ __html: marketingSettings.customBodyScripts }} />
        )}
        <ConsentBanner />
      </>
    )
  } catch {
    return <ConsentBanner />
  }
}
