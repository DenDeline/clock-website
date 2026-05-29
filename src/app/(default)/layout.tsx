import AppRootLayout from '../_components/AppRootLayout'
import { createRootMetadata } from '../_lib/seo'
import { defaultLocale, getDictionary } from '@/i18n'

const dictionary = getDictionary(defaultLocale)

export const metadata = createRootMetadata(defaultLocale)

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
