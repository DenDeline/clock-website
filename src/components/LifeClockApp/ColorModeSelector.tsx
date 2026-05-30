import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { useId } from 'react'

import type { ColorMode, LifeClockAppMessages } from './types'

export function ColorModeSelector({
  mode,
  messages,
  onModeChange,
}: Readonly<{
  mode?: ColorMode
  messages: LifeClockAppMessages
  onModeChange: (mode: ColorMode) => void
}>) {
  const colorModeInputId = useId()

  if (!mode) {
    return null
  }

  return (
    <FormControl margin='dense'>
      <FormLabel id={colorModeInputId}>{messages.colorMode.label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby={colorModeInputId}
        value={mode}
        onChange={(event) => {
          onModeChange(event.target.value as ColorMode)
        }}
      >
        <FormControlLabel
          value='system'
          control={<Radio />}
          label={messages.colorMode.system}
        />
        <FormControlLabel
          value='light'
          control={<Radio />}
          label={messages.colorMode.light}
        />
        <FormControlLabel
          value='dark'
          control={<Radio />}
          label={messages.colorMode.dark}
        />
      </RadioGroup>
    </FormControl>
  )
}
