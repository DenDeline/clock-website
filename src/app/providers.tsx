'use client'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'

import {
  jaJP as pickersJaJP,
  ruRU as pickersRuRU,
} from '@mui/x-date-pickers/locales'

import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material'
import { useMemo } from 'react'
import { createAppTheme } from '@/theme'
import type { Locale } from '@/i18n'

import 'dayjs/locale/ja'
import 'dayjs/locale/ru'

const pickerLocaleByLocale: Record<
  Locale,
  {
    adapterLocale?: string
    localeText?: typeof pickersRuRU.components.MuiLocalizationProvider.defaultProps.localeText
  }
> = {
  en: {},
  ja: {
    adapterLocale: 'ja',
    localeText:
      pickersJaJP.components.MuiLocalizationProvider.defaultProps.localeText,
  },
  ru: {
    adapterLocale: 'ru',
    localeText:
      pickersRuRU.components.MuiLocalizationProvider.defaultProps.localeText,
  },
}

const globalStyles = {
  ':root': {
    '--life-app-height': '100dvh',
  },
  html: {
    minHeight: '100%',
    height: '-webkit-fill-available',
  },
  body: {
    minHeight: '100%',
    overflowX: 'hidden',
  },
  '@supports (-webkit-touch-callout: none)': {
    ':root': {
      '--life-app-height': '-webkit-fill-available',
    },
    body: {
      minHeight: '-webkit-fill-available',
    },
  },
  '@media all and (display-mode: standalone)': {
    ':root': {
      '--life-app-height': '100vh',
    },
    body: {
      minHeight: '100vh',
    },
  },
} as const

function Providers({
  children,
  locale,
}: {
  children: React.ReactNode
  locale: Locale
}) {
  const pickerLocale = pickerLocaleByLocale[locale]
  const theme = useMemo(() => createAppTheme(locale), [locale])

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={pickerLocale.adapterLocale}
      localeText={pickerLocale.localeText}
    >
      <ThemeProvider theme={theme} defaultMode='system'>
        <CssBaseline enableColorScheme />
        <GlobalStyles styles={globalStyles} />
        {children}
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default Providers
