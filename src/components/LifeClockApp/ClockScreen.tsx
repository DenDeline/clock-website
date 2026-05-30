import Clock from '@/components/Clock'
import { Fade, Grid } from '@mui/material'

import type { LifeClockConfig, MobileTab } from './types'

export function ClockScreen({
  activeMobileTab,
  config,
}: Readonly<{
  activeMobileTab: MobileTab
  config: LifeClockConfig | null
}>) {
  return (
    <Grid
      container
      sx={{
        height: '100dvh',
        display: {
          xs: activeMobileTab === 'clock' ? 'flex' : 'none',
          sm: 'flex',
        },
        pb: {
          xs: 'calc(80px + env(safe-area-inset-bottom))',
          sm: 0,
        },
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Fade in={Boolean(config)} mountOnEnter>
        <div>
          {config && (
            <Clock
              startDate={config.startDate}
              endDate={config.endDate}
              useAmPm={config.useAmPm}
            />
          )}
        </div>
      </Fade>
    </Grid>
  )
}
