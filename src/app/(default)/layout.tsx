import AppRootLayout from '../_components/AppRootLayout'
import { createRootMetadata } from '../_lib/seo'
import { defaultLocale, getDictionary } from '@/i18n'
import type { Viewport, Metadata } from 'next'

const dictionary = getDictionary(defaultLocale)

export const metadata: Metadata = createRootMetadata(defaultLocale)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function DefaultLocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AppRootLayout lang={dictionary.locale.htmlLang} locale={defaultLocale}>
      {children}
    </AppRootLayout>
  )
}
