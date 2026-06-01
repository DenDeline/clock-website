import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import type { ReactNode } from 'react'

import type { LifeClockAppMessages, MobileTab } from './types'

export function SettingsScreen({
  activeMobileTab,
  fields,
  messages,
  onBack,
}: Readonly<{
  activeMobileTab: MobileTab
  fields: ReactNode
  messages: LifeClockAppMessages
  onBack: () => void
}>) {
  return (
    <Box
      component='section'
      aria-labelledby='life-settings-title'
      sx={{
        display: activeMobileTab === 'settings' ? 'block' : 'none',
        minHeight: 'var(--life-app-height, 100dvh)',
        overflowY: 'auto',
        bgcolor: 'background.default',
        px: { xs: 2, sm: 4 },
        pt: {
          xs: 'calc(28px + env(safe-area-inset-top))',
          sm: 'calc(40px + env(safe-area-inset-top))',
        },
        pb: {
          xs: 'calc(112px + env(safe-area-inset-bottom))',
          sm: 'calc(48px + env(safe-area-inset-bottom))',
        },
      }}
    >
      <Stack
        spacing={{ xs: 2.5, sm: 3 }}
        sx={{
          width: '100%',
          maxWidth: 720,
          mx: 'auto',
        }}
      >
        <Stack
          direction='row'
          spacing={1.5}
          sx={{
            alignItems: 'center',
            minHeight: 48,
          }}
        >
          <Tooltip
            title={messages.tabs.clock}
            placement='bottom'
            arrow
            enterDelay={200}
            enterNextDelay={200}
          >
            <IconButton
              aria-label={messages.tabs.clock}
              onClick={onBack}
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Typography
            id='life-settings-title'
            component='h1'
            variant='h3'
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem' },
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: 0,
            }}
          >
            {messages.tabs.settings}
          </Typography>
        </Stack>
        {fields}
      </Stack>
    </Box>
  )
}
