import AppRootLayout from '../_components/AppRootLayout'
import { createRootMetadata } from '../_lib/seo'
import { getDictionary, isNonDefaultLocale, nonDefaultLocales } from '@/i18n'
import { notFound } from 'next/navigation'
import type { Metadata, Viewport } from 'next'

export const dynamicParams = false
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params

  if (!isNonDefaultLocale(locale)) {
    notFound()
  }

  return createRootMetadata(locale)
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<LayoutProps<'/[locale]'>>) {
  const { locale } = await params

  if (!isNonDefaultLocale(locale)) {
    notFound()
  }

  const dictionary = getDictionary(locale)

  return (
    <AppRootLayout lang={dictionary.locale.htmlLang} locale={locale}>
      {children}
    </AppRootLayout>
  )
}
