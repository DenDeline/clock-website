'use client'

import { createTheme } from '@mui/material/styles'
import {
  jaJP as materialJaJP,
  ruRU as materialRuRU,
} from '@mui/material/locale'
import type { Locale } from '@/i18n'

const themeOptions = {
  cssVariables: {
    colorSchemeSelector: 'data',
  },
  colorSchemes: {
    dark: true,
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
} as const

export default createTheme(themeOptions)

export function createAppTheme(locale: Locale) {
  if (locale === 'ja') {
    return createTheme(themeOptions, materialJaJP)
  }

  if (locale === 'ru') {
    return createTheme(themeOptions, materialRuRU)
  }

  return createTheme(themeOptions)
}
