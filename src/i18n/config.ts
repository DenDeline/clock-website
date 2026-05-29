import type { Route } from 'next'

export const defaultLocale = 'en' as const
export const locales = [defaultLocale, 'ru'] as const

export type Locale = (typeof locales)[number]
export type NonDefaultLocale = Exclude<Locale, typeof defaultLocale>
export type RoutePath = Extract<Route, '/' | '/privacy'>

export const nonDefaultLocales = locales.filter(
  (locale) => locale !== defaultLocale,
) as readonly NonDefaultLocale[]

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function isNonDefaultLocale(value: string): value is NonDefaultLocale {
  return nonDefaultLocales.includes(value as NonDefaultLocale)
}

export function getLocalizedPath(path: RoutePath, locale: Locale): Route {
  const prefix = locale === defaultLocale ? '' : `/${locale}`

  if (path === '/') {
    return (prefix || '/') as Route
  }

  return `${prefix}${path}` as Route
}

export function getLocalizedUrl(
  path: RoutePath,
  locale: Locale,
  baseUrl: URL,
): string {
  return new URL(getLocalizedPath(path, locale), baseUrl).toString()
}
