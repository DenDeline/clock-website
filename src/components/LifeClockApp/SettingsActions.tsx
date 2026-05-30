import { Button, DialogActions } from '@mui/material'

import type { LifeClockAppMessages } from './types'

export function SettingsActions({
  includeClose,
  messages,
  onClose,
}: Readonly<{
  includeClose: boolean
  messages: LifeClockAppMessages
  onClose: () => void
}>) {
  return (
    <DialogActions sx={includeClose ? undefined : { px: 0 }}>
      {includeClose && (
        <Button onClick={onClose}>{messages.dialog.close}</Button>
      )}
      <Button type='submit'>{messages.dialog.save}</Button>
    </DialogActions>
  )
}
