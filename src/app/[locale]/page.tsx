import HomePage from '../_components/HomePage'
import { createPageMetadata } from '../_lib/seo'
import { isNonDefaultLocale, nonDefaultLocales } from '@/i18n'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamicParams = false

export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params

  if (!isNonDefaultLocale(locale)) {
    notFound()
  }

  return createPageMetadata(locale, 'home')
}

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params

  if (!isNonDefaultLocale(locale)) {
    notFound()
  }

  return <HomePage locale={locale} />
}
