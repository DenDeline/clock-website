import PrivacyPage from '../../_components/PrivacyPage'
import { createPageMetadata } from '../../_lib/seo'
import { isNonDefaultLocale, nonDefaultLocales } from '@/i18n'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamicParams = false

export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/privacy'>): Promise<Metadata> {
  const { locale } = await params

  if (!isNonDefaultLocale(locale)) {
    notFound()
  }

  return createPageMetadata(locale, 'privacy')
}

export default async function Page({ params }: PageProps<'/[locale]/privacy'>) {
  const { locale } = await params

  if (!isNonDefaultLocale(locale)) {
    notFound()
  }

  return <PrivacyPage locale={locale} />
}
