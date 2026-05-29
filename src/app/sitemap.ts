import type { MetadataRoute } from 'next'
import { getAppUrl } from '@/utils/urls'

export const dynamic = 'force-static'

const lastModified = new Date('2026-05-29')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getAppUrl().toString(),
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
