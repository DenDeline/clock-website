import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Roboto } from 'next/font/google'
import PwaUpdatePrompt from './PwaUpdatePrompt'
import Providers from '../providers'
import WebVitals from '../web-vitals'
import { getBasePath } from '@/utils/base-path'
import { getDictionary, type Locale } from '@/i18n'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export default function AppRootLayout({
  children,
  lang,
  locale,
}: Readonly<{
  children: React.ReactNode
  lang: string
  locale: Locale
}>) {
  const isProduction = process.env.NODE_ENV === 'production'
  const dictionary = getDictionary(locale)

  return (
    <html lang={lang} prefix='og: https://ogp.me/ns#' suppressHydrationWarning>
      <body className={roboto.variable}>
        <InitColorSchemeScript attribute='data' />
        <WebVitals />
        <AppRouterCacheProvider>
          <Providers locale={locale}>{children}</Providers>
        </AppRouterCacheProvider>
        <PwaUpdatePrompt
          basePath={getBasePath()}
          messages={dictionary.app.pwa}
        />
      </body>
      {isProduction && <GoogleAnalytics gaId='G-1DG80KJHZQ' />}
    </html>
  )
}
