import {
  defaultLocale,
  getDictionary,
  getLocalizedPath,
  getLocalizedUrl,
  locales,
  type Locale,
  type RoutePath,
} from '@/i18n'
import { withBasePath } from '@/utils/base-path'
import { getAppUrl } from '@/utils/urls'
import type { Metadata } from 'next'

const ogImagePath = '/opengraph-image'

type PageKey = 'home' | 'privacy'
type LanguageAlternates = Record<Locale, string> & {
  'x-default': string
}

const routePaths: Record<PageKey, RoutePath> = {
  home: '/',
  privacy: '/privacy',
}

function createLanguageAlternates(path: RoutePath): LanguageAlternates {
  const appUrl = getAppUrl()
  const alternates = locales.reduce(
    (acc, locale) => ({
      ...acc,
      [locale]: getLocalizedUrl(path, locale, appUrl),
    }),
    {} as Record<Locale, string>,
  )

  return {
    ...alternates,
    'x-default': getLocalizedUrl(path, defaultLocale, appUrl),
  }
}

export function createRootMetadata(locale: Locale): Metadata {
  const dictionary = getDictionary(locale)

  return {
    metadataBase: getAppUrl(),
    title: {
      default: dictionary.site.name,
      template: `%s | ${dictionary.site.name}`,
    },
    description: dictionary.site.description,
    applicationName: dictionary.site.name,
    authors: [{ name: dictionary.site.author, url: dictionary.site.authorUrl }],
    creator: dictionary.site.author,
    publisher: dictionary.site.author,
    category: dictionary.site.category,
    icons: {
      apple: withBasePath('/apple-touch-icon.png'),
    },
    openGraph: {
      siteName: dictionary.site.name,
      locale: dictionary.locale.openGraph,
      type: 'website',
    },
  }
}

export function createPageMetadata(locale: Locale, pageKey: PageKey): Metadata {
  const dictionary = getDictionary(locale)
  const page = dictionary.routes[pageKey]
  const path = routePaths[pageKey]
  const localizedPath = getLocalizedPath(path, locale)
  const ogImage = new URL(ogImagePath, getAppUrl()).toString()

  return {
    metadataBase: getAppUrl(),
    title: {
      absolute: page.title,
    },
    description: page.description,
    alternates: {
      canonical: localizedPath,
      languages: createLanguageAlternates(path),
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: localizedPath,
      siteName: dictionary.site.name,
      locale: dictionary.locale.openGraph,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: dictionary.site.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [ogImage],
    },
  }
}
