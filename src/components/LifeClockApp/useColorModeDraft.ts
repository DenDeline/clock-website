import { useColorScheme } from '@mui/material/styles'
import { useCallback, useState } from 'react'

import type { ColorMode } from './types'

export function useColorModeDraft() {
  const { mode, setMode } = useColorScheme()
  const currentColorMode = mode as ColorMode | undefined
  const [originalColorMode, setOriginalColorMode] = useState<ColorMode>()
  const [stagedColorMode, setStagedColorMode] = useState<ColorMode>()

  const startColorModeDraft = useCallback(() => {
    if (currentColorMode) {
      setOriginalColorMode(currentColorMode)
      setStagedColorMode(currentColorMode)
    }
  }, [currentColorMode])

  const cancelColorModeDraft = useCallback(() => {
    const colorMode = originalColorMode ?? currentColorMode

    if (colorMode) {
      setMode(colorMode)
      setStagedColorMode(colorMode)
    }
  }, [currentColorMode, originalColorMode, setMode])

  const changeColorModeDraft = useCallback(
    (colorMode: ColorMode) => {
      setOriginalColorMode((value) => value ?? currentColorMode ?? colorMode)
      setStagedColorMode(colorMode)
      setMode(colorMode)
    },
    [currentColorMode, setMode],
  )

  const commitColorModeDraft = useCallback(() => {
    setOriginalColorMode(stagedColorMode ?? currentColorMode)
  }, [currentColorMode, stagedColorMode])

  return {
    currentColorMode,
    stagedColorMode,
    startColorModeDraft,
    cancelColorModeDraft,
    changeColorModeDraft,
    commitColorModeDraft,
  }
}
