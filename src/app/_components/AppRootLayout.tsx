import theme from '@/theme'
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Roboto } from 'next/font/google'
import Providers from '../providers'
import WebVitals from '../web-vitals'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export default function AppRootLayout({
  children,
  lang,
}: Readonly<{
  children: React.ReactNode
  lang: string
}>) {
  const isProduction = process.env.NODE_ENV === 'production'

  return (
    <html lang={lang} prefix='og: https://ogp.me/ns#' suppressHydrationWarning>
      <body className={roboto.variable}>
        <InitColorSchemeScript defaultMode='system' />
        <WebVitals />
        <AppRouterCacheProvider>
          <Providers>
            <ThemeProvider theme={theme} defaultMode='system'>
              <CssBaseline enableColorScheme />
              {children}
            </ThemeProvider>
          </Providers>
        </AppRouterCacheProvider>
      </body>
      {isProduction && <GoogleAnalytics gaId='G-1DG80KJHZQ' />}
    </html>
  )
}
