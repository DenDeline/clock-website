'use client'

import { useCallback, useEffect, useState } from 'react'
import moment, { Moment } from 'moment'

import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid2,
  TextField,
  Typography,
} from '@mui/material'

import SettingsIcon from '@mui/icons-material/Settings'

import { DateField, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import { Clock } from '@/components'

export default function Home() {
  const [birthday, setBirthday] = useState<Moment | null>(null)
  const [meanDeathAge, setMeanDeathAge] = useState<number>(76)

  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [configBirthday, setConfigBirthday] = useState<Moment | null>(null)
  const [configMeanDeathAge, setConfigMeanDeathAge] = useState<string>('')

  useEffect(() => {
    const rawConfig = window.localStorage.getItem('config')
    if (!rawConfig) {
      setIsConfigDialogOpen(true)
      return
    }

    const config = JSON.parse(rawConfig)
    if (config?.birthday && config.meanDeathAge) {
      setBirthday(moment(config.birthday))
      setMeanDeathAge(Number(config.meanDeathAge))
    } else {
      setIsConfigDialogOpen(true)
    }
  }, [])

  const handleDialogEnter = useCallback(() => {
    setConfigBirthday(birthday)
    setConfigMeanDeathAge(meanDeathAge.toString())
  }, [birthday, meanDeathAge])

  const handleConfigSubmit = useCallback(() => {
    setIsConfigDialogOpen(false)

    setBirthday(configBirthday)
    setMeanDeathAge(Number(configMeanDeathAge))

    const config = {
      birthday: configBirthday!.format('YYYY-MM-DD'),
      meanDeathAge: configMeanDeathAge!.toString(),
    }

    window.localStorage.setItem('config', JSON.stringify(config))
  }, [configBirthday, configMeanDeathAge])

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Fab
        size='small'
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
        onClick={() => setIsConfigDialogOpen(true)}
      >
        <SettingsIcon />
      </Fab>
      <Grid2 container height='100dvh' justifyContent='center' alignItems='center'>
        {birthday && <Clock birthday={birthday} meanDeathAge={meanDeathAge} />}
      </Grid2>
      <Dialog open={isConfigDialogOpen} TransitionProps={{ onEnter: handleDialogEnter }}>
        <DialogTitle>Welcome</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Visualize your life&apos;s journey through a unique 24-hour perspective. By providing your details, you can
            see how your day represents your life, motivating you to make every moment count
          </Typography>
          <DateField
            required
            label='Birthday'
            variant='standard'
            value={configBirthday}
            onChange={setConfigBirthday}
            margin='dense'
            fullWidth
            format='DD/MM/YYYY'
          />
          <TextField
            required
            label='Mean death age'
            variant='standard'
            type='number'
            value={configMeanDeathAge}
            onChange={(e) => setConfigMeanDeathAge(e.target.value)}
            margin='dense'
            fullWidth
            sx={{ mb: 2 }}
          />
          <Alert severity='info'>
            We use your birthday to calculate how far you are along your life&apos;s clock. The mean lifespan helps us
            estimate the full 24-hour cycle. This information is only stored on your device and is not shared.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfigSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  )
}
