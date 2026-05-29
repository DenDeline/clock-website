'use client'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { ruRU as pickersRuRU } from '@mui/x-date-pickers/locales'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { useMemo } from 'react'
import { createAppTheme } from '@/theme'
import type { Locale } from '@/i18n'
import 'dayjs/locale/ru'

const pickerLocaleByLocale: Record<
  Locale,
  {
    adapterLocale?: string
    localeText?: typeof pickersRuRU.components.MuiLocalizationProvider.defaultProps.localeText
  }
> = {
  en: {},
  ru: {
    adapterLocale: 'ru',
    localeText:
      pickersRuRU.components.MuiLocalizationProvider.defaultProps.localeText,
  },
}

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
        {children}
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default Providers
