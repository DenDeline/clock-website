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
        display: activeMobileTab === 'clock' ? 'flex' : 'none',
        pt: {
          xs: 'env(safe-area-inset-top)',
          sm: 0,
        },
        pb: {
          xs: 'calc(104px + env(safe-area-inset-bottom))',
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
