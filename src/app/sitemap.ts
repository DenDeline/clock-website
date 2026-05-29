import type { MetadataRoute } from 'next'
import {
  defaultLocale,
  getLocalizedUrl,
  locales,
  type Locale,
  type RoutePath,
} from '@/i18n'
import { getAppUrl } from '@/utils/urls'

export const dynamic = 'force-static'

const lastModified = new Date('2026-05-29')
const routes: Array<{
  path: RoutePath
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}> = [
  {
    path: '/',
    changeFrequency: 'monthly',
    priority: 1,
  },
  {
    path: '/privacy',
    changeFrequency: 'yearly',
    priority: 0.4,
  },
]

function getLanguageAlternates(path: RoutePath, appUrl: URL) {
  const alternates = Object.fromEntries(
    locales.map((locale) => [locale, getLocalizedUrl(path, locale, appUrl)]),
  )

  return {
    ...alternates,
    'x-default': getLocalizedUrl(path, defaultLocale, appUrl),
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = getAppUrl()

  return locales.flatMap((locale: Locale) =>
    routes.map((route) => ({
      url: getLocalizedUrl(route.path, locale, appUrl),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: getLanguageAlternates(route.path, appUrl),
      },
    })),
  )
}
