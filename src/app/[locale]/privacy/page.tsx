import PrivacyPage from '../../_components/PrivacyPage'
import { createPageMetadata } from '../../_lib/seo'
import { isLocale, nonDefaultLocales } from '@/i18n'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type LocalePageProps = {
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
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return createPageMetadata(locale, 'privacy')
}

export default async function Page({ params }: LocalePageProps) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return <PrivacyPage locale={locale} />
}
