'use client'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data',
  },
  colorSchemes: {
    dark: true,
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
})

export default theme
