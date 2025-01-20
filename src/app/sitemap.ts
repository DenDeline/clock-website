import type { MetadataRoute } from 'next'
import { getAppUrl } from '@/utils/urls'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getAppUrl()?.toString() ?? '',
      lastModified: new Date(),
    },
  ]
}
