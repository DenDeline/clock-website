import GitHubIcon from '@mui/icons-material/GitHub'
import SettingsIcon from '@mui/icons-material/Settings'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Box, Fade, IconButton, Stack, Tooltip } from '@mui/material'

import type { LifeClockAppMessages } from './types'

export function DesktopControls({
  isInterfaceVisible,
  messages,
  onOpenSettings,
  onToggleInterface,
}: Readonly<{
  isInterfaceVisible: boolean
  messages: LifeClockAppMessages
  onOpenSettings: () => void
  onToggleInterface: () => void
}>) {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        display: { xs: 'none', sm: 'block' },
      }}
    >
      <Stack spacing={1}>
        <Fade in={isInterfaceVisible} appear={false}>
          <Tooltip
            title={messages.controls.settings}
            placement='left'
            arrow
            enterDelay={200}
            enterNextDelay={200}
          >
            <IconButton size='small' onClick={onOpenSettings}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Fade>
        <Fade in={isInterfaceVisible} appear={false}>
          <Tooltip
            title={messages.controls.sourceCode}
            placement='left'
            arrow
            enterDelay={200}
            enterNextDelay={200}
          >
            <IconButton
              aria-label={messages.controls.sourceCode}
              component='a'
              href='https://github.com/DenDeline/clock-website'
              rel='noopener noreferrer'
              size='small'
              target='_blank'
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Fade>
        <Tooltip
          title={
            isInterfaceVisible
              ? messages.controls.hideInterface
              : messages.controls.showInterface
          }
          placement='left'
          arrow
          enterDelay={200}
          enterNextDelay={200}
        >
          <IconButton
            aria-label={messages.controls.toggleInterface}
            size='small'
            onClick={onToggleInterface}
          >
            {isInterfaceVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  )
}
