import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from '@mui/material'

import type { LifeClockAppMessages, MobileTab } from './types'

export function MobileNavigation({
  activeMobileTab,
  messages,
  onTabChange,
}: Readonly<{
  activeMobileTab: MobileTab
  messages: LifeClockAppMessages
  onTabChange: (tab: MobileTab) => void
}>) {
  return (
    <Box
      component='nav'
      aria-label={`${messages.tabs.clock} / ${messages.tabs.settings}`}
      sx={{
        position: 'fixed',
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        display: { xs: 'flex', sm: 'none' },
        justifyContent: 'center',
        px: 2,
        pt: 1,
        pb: 'max(10px, env(safe-area-inset-bottom))',
        pointerEvents: 'none',
        '&::before': {
          content: '""',
          position: 'absolute',
          right: 0,
          bottom: 0,
          left: 0,
          height: 'calc(28px + env(safe-area-inset-bottom))',
          background:
            'linear-gradient(to top, rgba(var(--mui-palette-background-defaultChannel) / 0.72), rgba(var(--mui-palette-background-defaultChannel) / 0))',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          'html[data-dark] &': {
            background:
              'linear-gradient(to top, rgba(18, 18, 18, 0.82), rgba(18, 18, 18, 0))',
          },
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: 'min(100%, 360px)',
          borderRadius: 999,
          border: '1px solid rgba(var(--mui-palette-dividerChannel) / 0.48)',
          backgroundColor:
            'rgba(var(--mui-palette-background-paperChannel) / 0.8)',
          boxShadow: '0 18px 48px rgba(15, 23, 42, 0.18)',
          backdropFilter: 'blur(18px) saturate(160%)',
          WebkitBackdropFilter: 'blur(18px) saturate(160%)',
          overflow: 'hidden',
          pointerEvents: 'auto',
          'html[data-dark] &': {
            borderColor: 'rgba(255, 255, 255, 0.16)',
            backgroundColor: 'rgba(18, 18, 18, 0.74)',
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.44)',
          },
        }}
      >
        <BottomNavigation
          showLabels
          value={activeMobileTab}
          onChange={(_, value: MobileTab) => {
            onTabChange(value)
          }}
          sx={{
            height: 64,
            gap: 0.5,
            px: 0.75,
            backgroundColor: 'transparent',
            '& .MuiBottomNavigationAction-root': {
              minWidth: 0,
              maxWidth: 'none',
              mx: 0.25,
              my: 0.75,
              borderRadius: 999,
              color: 'text.secondary',
              transition: (theme) =>
                theme.transitions.create(
                  ['background-color', 'color', 'transform'],
                  {
                    duration: theme.transitions.duration.shorter,
                  },
                ),
              '& .MuiSvgIcon-root': {
                fontSize: 22,
                transition: (theme) =>
                  theme.transitions.create(['color', 'transform'], {
                    duration: theme.transitions.duration.shorter,
                  }),
              },
              '& .MuiBottomNavigationAction-label': {
                mt: 0.25,
                fontSize: '0.72rem',
                fontWeight: 500,
                lineHeight: 1.15,
                whiteSpace: 'nowrap',
                letterSpacing: 0,
              },
              '&.Mui-selected.Mui-selected': {
                backgroundColor:
                  'rgba(var(--mui-palette-primary-mainChannel) / 0.14)',
                color: 'var(--mui-palette-primary-main)',
                transform: 'translateY(-1px)',
                '& .MuiSvgIcon-root': {
                  transform: 'scale(1.04)',
                },
              },
              'html[data-dark] &.Mui-selected.Mui-selected': {
                backgroundColor:
                  'rgba(var(--mui-palette-primary-mainChannel) / 0.16)',
              },
            },
          }}
        >
          <BottomNavigationAction
            label={messages.tabs.clock}
            value='clock'
            icon={<AccessTimeIcon />}
          />
          <BottomNavigationAction
            label={messages.tabs.settings}
            value='settings'
            icon={<SettingsIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}
