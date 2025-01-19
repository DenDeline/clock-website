'use client'

import { useEffect, useState } from 'react'
import dayjs, { type Dayjs } from 'dayjs'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { Clock } from '@/components'

const schema = z.object({
  birthday: z
    .union([z.custom<Dayjs>(dayjs.isDayjs, { message: 'Invalid date' }), z.string().transform(dayjs)])
    .refine((val) => val.isValid(), { message: 'Invalid date' })
    .refine((val) => val.isBefore(dayjs(), 'd'), { message: 'Too young!' }),
  meanDeathAge: z.coerce
    .number()
    .positive({
      message: 'Mean death age must be greater than 0',
    })
    .finite()
    .safe({
      message: 'Mean death age must be less than or equal to 9007199254740991',
    }),
})

type FormSchema = z.infer<typeof schema>

export default function Home() {
  const [birthday, setBirthday] = useState<Dayjs | null>(null)
  const [meanDeathAge, setMeanDeathAge] = useState<number>(76)

  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)

  const { control, handleSubmit, reset } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      birthday: birthday!,
      meanDeathAge,
    },
  })

  useEffect(() => {
    try {
      const config = JSON.parse(window.localStorage.getItem('config') || '{}')
      const result = schema.parse(config)

      setBirthday(result.birthday)
      setMeanDeathAge(result.meanDeathAge)

      reset({
        meanDeathAge: result.meanDeathAge,
        birthday: result.birthday,
      })
    } catch {
      window.localStorage.removeItem('config')
      setIsConfigDialogOpen(true)
    }
  }, [reset])

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    const config = {
      birthday: data.birthday.format('YYYY-MM-DD'),
      meanDeathAge: data.meanDeathAge,
    }

    window.localStorage.setItem('config', JSON.stringify(config))

    setBirthday(data.birthday)
    setMeanDeathAge(data.meanDeathAge)
    setIsConfigDialogOpen(false)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
      <Dialog
        open={isConfigDialogOpen}
        onSubmit={handleSubmit(onSubmit)}
        PaperProps={{
          component: 'form',
          noValidate: 'novalidate',
        }}
      >
        <DialogTitle>Welcome</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Visualize your life&apos;s journey through a unique 24-hour perspective.</Typography>
          <Controller
            name='birthday'
            control={control}
            render={({ field: { ref, ...fieldProps }, fieldState: { error } }) => (
              <DateField
                {...fieldProps}
                inputRef={ref}
                required
                label='Birthday'
                variant='standard'
                margin='dense'
                fullWidth
                format='DD/MM/YYYY'
                disableFuture
                slotProps={{
                  textField: {
                    error: !!error,
                    helperText: error?.message,
                  },
                }}
              />
            )}
          />
          <Controller
            name='meanDeathAge'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                required
                label='Mean death age'
                variant='standard'
                type='number'
                margin='dense'
                fullWidth
                sx={{ mb: 2 }}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Alert severity='info'>
            We use your birthday to calculate how far you are along your life&apos;s clock. The mean lifespan helps us
            estimate the full 24-hour cycle. This information is only stored on your device and is not shared.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button type='submit'>Save</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  )
}
