'use client'

import { Clock } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import SettingsIcon from '@mui/icons-material/Settings'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid2,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'

import { DateField } from '@mui/x-date-pickers'
import dayjs, { type Dayjs } from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

import { z } from 'zod'

const ClockDeathInputVariantEnum = z.enum(['age', 'date'])
type ClockDeathInputVariantEnum = z.infer<typeof ClockDeathInputVariantEnum>

const formSchema = z
  .object({
    birthday: z
      .union([
        z.custom<Dayjs>(dayjs.isDayjs, 'Birthday must not be empty'),
        z.string().transform(dayjs),
      ])
      .refine((val) => val.isValid(), { message: 'Invalid date' })
      .refine((val) => val.isBefore(dayjs(), 'd'), { message: 'Too young!' }),
  })
  .and(
    z.discriminatedUnion('variant', [
      z.object({
        variant: ClockDeathInputVariantEnum.extract(['age']),
        meanDeathAge: z.coerce
          .number()
          .positive({
            message: 'Mean death age must be greater than 0',
          })
          .max(dayjs().year(), {
            message: 'Hello, Jesus. How are you doing today?',
          }),
      }),
      z.object({
        variant: ClockDeathInputVariantEnum.extract(['date']),
        meanDeathDate: z.custom<Dayjs>(
          dayjs.isDayjs,
          'Birthday must not be empty',
        ),
      }),
    ]),
  )

type FormSchema = z.infer<typeof formSchema>

const configSchema = z.object({
  variant: ClockDeathInputVariantEnum,
  birthday: z
    .union([
      z.custom<Dayjs>(dayjs.isDayjs, 'Birthday must not be empty'),
      z.string().transform(dayjs),
    ])
    .refine((val) => val.isValid(), { message: 'Invalid date' })
    .refine((val) => val.isBefore(dayjs(), 'd'), { message: 'Too young!' }),
  durationMs: z.coerce.number(),
})

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false)

  const [inputVariant, setInputVariant] = useState<ClockDeathInputVariantEnum>(
    ClockDeathInputVariantEnum.enum.age,
  )
  const [birthday, setBirthday] = useState<Dayjs | null>(null)
  const [durationMs, setDurationMs] = useState<number>(0)

  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [isInterfaceVisible, setIsInterfaceVisible] = useState(true)

  const { control, handleSubmit, reset, resetField } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variant: inputVariant,
      birthday: birthday!,
      meanDeathAge: 76,
      meanDeathDate: null!,
    },
  })

  useEffect(() => {
    try {
      const config = JSON.parse(window.localStorage.getItem('config') || '{}')
      const result = configSchema.parse(config)

      setBirthday(result.birthday)
      setInputVariant(result.variant)
      setDurationMs(result.durationMs)

      const meanDeathDate = result.birthday.add(result.durationMs)

      reset({
        variant: result.variant,
        birthday: result.birthday,
        meanDeathAge: meanDeathDate.diff(result.birthday, 'y'),
        meanDeathDate: meanDeathDate,
      })

      setIsInitialized(true)
    } catch {
      window.localStorage.removeItem('config')
      setIsConfigDialogOpen(true)
    }
  }, [reset])

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    const newDurationMs = (
      data.variant === 'date'
        ? data.meanDeathDate
        : data.birthday.add(data.meanDeathAge, 'y')
    ).diff(data.birthday)

    const config = {
      variant: data.variant,
      birthday: data.birthday.format('YYYY-MM-DD'),
      durationMs: newDurationMs,
    }

    window.localStorage.setItem('config', JSON.stringify(config))

    setInputVariant(data.variant)
    setBirthday(data.birthday)
    setDurationMs(newDurationMs)

    setIsConfigDialogOpen(false)
  }

  const handleDialogExited = useCallback(() => {
    setIsInitialized(true)
    const meanDeathDate = birthday!.add(durationMs)

    reset({
      variant: inputVariant,
      birthday: birthday!,
      meanDeathAge: meanDeathDate.diff(birthday, 'y'),
      meanDeathDate: meanDeathDate,
    })
  }, [birthday, durationMs, inputVariant, reset])

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
      >
        <Stack spacing={1}>
          <Fade in={isInterfaceVisible} appear={false}>
            <Tooltip
              title={'Settings'}
              placement='left'
              arrow
              enterDelay={200}
              enterNextDelay={200}
            >
              <IconButton
                size='small'
                onClick={() => setIsConfigDialogOpen(true)}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Fade>
          <Tooltip
            title={isInterfaceVisible ? 'Hide interface' : 'Show interface'}
            placement='left'
            arrow
            enterDelay={200}
            enterNextDelay={200}
          >
            <IconButton
              aria-label='settings'
              size='small'
              onClick={() => setIsInterfaceVisible((v) => !v)}
            >
              {isInterfaceVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Grid2
        container
        height='100dvh'
        justifyContent='center'
        alignItems='center'
      >
        {birthday && <Clock birthday={birthday} durationMs={durationMs} />}
      </Grid2>
      <Dialog
        open={isConfigDialogOpen}
        onSubmit={handleSubmit(onSubmit)}
        slotProps={{
          paper: {
            component: 'form',
            noValidate: true,
          },
          transition: {
            onExited: handleDialogExited,
          },
        }}
        onClose={isInitialized ? () => setIsConfigDialogOpen(false) : undefined}
      >
        <DialogTitle>{isInitialized ? 'Settings' : 'Welcome'}</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Visualize your life&apos;s journey through a unique 24-hour
            perspective.
          </Typography>
          <Controller
            name='birthday'
            control={control}
            render={({
              field: { ref, ...fieldProps },
              fieldState: { error },
            }) => (
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
                autoFocus={!isInitialized}
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
            control={control}
            name='variant'
            render={({ field, fieldState: { error } }) => (
              <>
                <FormControl error={!!error} margin='dense'>
                  <FormLabel id='demo-row-radio-buttons-group-label'>
                    Death duration input type
                  </FormLabel>
                  <RadioGroup
                    {...field}
                    onTransitionEnd={() => {
                      resetField('meanDeathDate')
                      resetField('meanDeathAge')
                    }}
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                  >
                    <FormControlLabel
                      value={ClockDeathInputVariantEnum.enum.age}
                      control={<Radio />}
                      label='Age'
                    />
                    <FormControlLabel
                      value={ClockDeathInputVariantEnum.enum.date}
                      control={<Radio />}
                      label='Date'
                    />
                  </RadioGroup>
                  <FormHelperText>{error?.message}</FormHelperText>
                </FormControl>
                {field.value === 'age' ? (
                  <Controller
                    key={'.01'}
                    name={'meanDeathAge'}
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
                ) : (
                  <Controller
                    key={'.02'}
                    name={'meanDeathDate'}
                    control={control}
                    render={({
                      field: { ref, ...fieldProps },
                      fieldState: { error },
                    }) => (
                      <DateField
                        {...fieldProps}
                        inputRef={ref}
                        required
                        label='Mean death date'
                        variant='standard'
                        margin='dense'
                        fullWidth
                        sx={{ mb: 2 }}
                        format='DD/MM/YYYY'
                        slotProps={{
                          textField: {
                            error: !!error,
                            helperText: error?.message,
                          },
                        }}
                      />
                    )}
                  />
                )}
              </>
            )}
          />
          <Alert severity='info'>
            We use your birthday to calculate how far you are along your
            life&apos;s clock. The mean lifespan helps us estimate the full
            24-hour cycle. This information is only stored on your device and is
            not shared.
          </Alert>
        </DialogContent>
        <DialogActions>
          {isInitialized && (
            <Button onClick={() => setIsConfigDialogOpen(false)}>Close</Button>
          )}
          <Button type='submit'>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
