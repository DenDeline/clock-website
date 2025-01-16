import type { Metadata } from 'next'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

import theme from '@/app/theme'

export const metadata: Metadata = {
  title: 'Life clock',
  description: 'See your mean lifespan like a clock',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
