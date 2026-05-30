import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SettingsIcon from '@mui/icons-material/Settings'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'

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
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        display: { xs: 'block', sm: 'none' },
        pb: 'env(safe-area-inset-bottom)',
      }}
    >
      <BottomNavigation
        showLabels
        value={activeMobileTab}
        onChange={(_, value: MobileTab) => {
          onTabChange(value)
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
  )
}
