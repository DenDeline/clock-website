import AppRootLayout from '../_components/AppRootLayout'
import { createRootMetadata } from '../_lib/seo'
import { getDictionary, isLocale, nonDefaultLocales } from '@/i18n'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type LocaleParams = {
  params: Promise<{
    locale: string
  }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return createRootMetadata(locale)
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<
  LocaleParams & {
    children: React.ReactNode
  }
>) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const dictionary = getDictionary(locale)

  return (
    <AppRootLayout lang={dictionary.locale.htmlLang}>{children}</AppRootLayout>
  )
}
