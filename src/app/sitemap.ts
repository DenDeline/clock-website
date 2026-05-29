import type { MetadataRoute } from 'next'
import { getAppUrl } from '@/utils/urls'

export const dynamic = 'force-static'

const lastModified = new Date('2026-05-29')

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = getAppUrl()

  return [
    {
      url: appUrl.toString(),
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: new URL('/privacy', appUrl).toString(),
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ]
}
