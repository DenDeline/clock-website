'use client'

import { useCallback, useState } from 'react'
import moment, { Moment } from 'moment'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid2,
  TextField,
} from '@mui/material'

import SettingsIcon from '@mui/icons-material/Settings'

import { DateField, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import { Clock } from '@/components'

export default function Home() {
  const [birthday, setBirthday] = useState<Moment | null>(() => {
    const rawBirthday = window.localStorage.getItem('birthday')
    if (rawBirthday) {
      return moment(rawBirthday)
    }
    return null
  })

  const [meanDeathAge, setMeanDeathAge] = useState<number>(() => {
    const rawMeanDeathAge = window.localStorage.getItem('meanDeathAge')
    if (rawMeanDeathAge) {
      return Number(rawMeanDeathAge)
    }
    return 76
  })

  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(() => !birthday)
  const [configBirthday, setConfigBirthday] = useState<Moment | null>(() => birthday)
  const [configMeanDeathAge, setConfigMeanDeathAge] = useState<string>(() => meanDeathAge.toString())

  const handleConfigSubmit = useCallback(() => {
    setIsConfigDialogOpen(false)

    localStorage.setItem('birthday', configBirthday!.format('YYYY-MM-DD'))
    setBirthday(configBirthday)
    localStorage.setItem('meanDeathAge', configMeanDeathAge!.toString())
    setMeanDeathAge(Number(configMeanDeathAge))
  }, [configBirthday, configMeanDeathAge])

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Fab
        color='primary'
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
        onClick={() => setIsConfigDialogOpen(true)}
      >
        <SettingsIcon />
      </Fab>
      <Grid2 container height='100vh' justifyContent='center' alignItems='center'>
        {birthday && <Clock birthday={birthday} meanDeathAge={meanDeathAge} />}
      </Grid2>
      <Dialog open={isConfigDialogOpen}>
        <DialogTitle>Welcome</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your birthday</DialogContentText>
          <DateField
            required
            label='Birthday'
            variant='standard'
            value={configBirthday}
            onChange={setConfigBirthday}
            margin='dense'
            fullWidth
            autoFocus
          />
          <TextField
            required
            label='Mean death age'
            variant='standard'
            type='number'
            value={configMeanDeathAge}
            onChange={(e) => setConfigMeanDeathAge(e.target.value)}
            margin='dense'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfigSubmit}>Ok</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  )
}
