import type { MetadataRoute } from 'next'

import { getAppUrl } from '@/utils/urls'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${getAppUrl()}sitemap.xml`,
  }
}
