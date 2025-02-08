import theme from '@/theme'
import { getAppUrl } from '@/utils/urls'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Providers from './providers'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  metadataBase: getAppUrl(),
  title: 'Life clock',
  description: 'See your mean lifespan like a clock',
  openGraph: {
    siteName: 'Life clock',
    title: "Life clock - DenDeline's Pages",
    description: 'See your mean lifespan like a clock',
    locale: 'en_US',
    type: 'website',
    url: '/',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isProduction = process.env.NODE_ENV === 'production'

  return (
    <html lang='en' prefix='og: https://ogp.me/ns#'>
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <Providers>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </Providers>
        </AppRouterCacheProvider>
      </body>
      {isProduction && <GoogleAnalytics gaId='G-1DG80KJHZQ' />}
    </html>
  )
}
