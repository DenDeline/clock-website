export const defaultLocale = 'en' as const
export const locales = [defaultLocale] as const

export type Locale = (typeof locales)[number]
export type RoutePath = '/' | '/privacy'

export const nonDefaultLocales = locales.filter(
  (locale) => locale !== defaultLocale,
)

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function getLocalizedPath(path: RoutePath, locale: Locale): string {
  const prefix = locale === defaultLocale ? '' : `/${locale}`

  if (path === '/') {
    return prefix || '/'
  }

  return `${prefix}${path}`
}

export function getLocalizedUrl(
  path: RoutePath,
  locale: Locale,
  baseUrl: URL,
): string {
  return new URL(getLocalizedPath(path, locale), baseUrl).toString()
}
