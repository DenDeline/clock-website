import { Box, Typography } from '@mui/material'
import type { FormEventHandler, ReactNode } from 'react'

import type { LifeClockAppMessages, MobileTab } from './types'

export function MobileSettingsView({
  activeMobileTab,
  fields,
  isInitialized,
  messages,
  onSubmit,
  settingsActions,
}: Readonly<{
  activeMobileTab: MobileTab
  fields: ReactNode
  isInitialized: boolean
  messages: LifeClockAppMessages
  onSubmit: FormEventHandler<HTMLFormElement>
  settingsActions: ReactNode
}>) {
  return (
    <Box
      component='form'
      noValidate
      onSubmit={onSubmit}
      sx={{
        display: {
          xs: activeMobileTab === 'settings' ? 'block' : 'none',
          sm: 'none',
        },
        minHeight: '100dvh',
        overflowY: 'auto',
        px: 3,
        pt: 'calc(32px + env(safe-area-inset-top))',
        pb: 'calc(120px + env(safe-area-inset-bottom))',
      }}
    >
      <Typography component='h1' variant='h5' gutterBottom>
        {isInitialized
          ? messages.dialog.settingsTitle
          : messages.dialog.welcomeTitle}
      </Typography>
      {fields}
      {settingsActions}
    </Box>
  )
}
