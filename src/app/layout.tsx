import theme from '@/theme'
import { getAppUrl } from '@/utils/urls'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
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
  title: {
    default: 'Life Clock',
    template: '%s | Life Clock',
  },
  description:
    'A reflective life clock that visualizes your lifespan as a 24-hour clock.',
  applicationName: 'Life Clock',
  authors: [{ name: 'DenDeline', url: 'https://dendeline.com' }],
  creator: 'DenDeline',
  publisher: 'DenDeline',
  category: 'lifestyle',
  openGraph: {
    siteName: 'Life Clock',
    locale: 'en_US',
    type: 'website',
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
