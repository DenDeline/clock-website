import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Roboto } from 'next/font/google'
import Providers from '../providers'
import WebVitals from '../web-vitals'
import type { Locale } from '@/i18n'

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

  return (
    <html lang={lang} prefix='og: https://ogp.me/ns#' suppressHydrationWarning>
      <body className={roboto.variable}>
        <InitColorSchemeScript defaultMode='system' />
        <WebVitals />
        <AppRouterCacheProvider>
          <Providers locale={locale}>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
      {isProduction && <GoogleAnalytics gaId='G-1DG80KJHZQ' />}
    </html>
  )
}
