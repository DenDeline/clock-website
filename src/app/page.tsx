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
import { useCallback, useEffect, useId, useState } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

import { z } from 'zod'

const ClockDeathInputVariantEnum = z.enum(['age', 'date'])
type ClockDeathInputVariantEnum = z.infer<typeof ClockDeathInputVariantEnum>

const formSchema = z
  .object({
    startDate: z
      .union([
        z.custom<Dayjs>(dayjs.isDayjs, 'Start date must not be empty'),
        z.string().transform(dayjs),
      ])
      .refine((val) => val.isValid(), { message: 'Invalid date' }),
  })
  .and(
    z.discriminatedUnion('variant', [
      z.object({
        variant: ClockDeathInputVariantEnum.extract(['age']),
        deadlineYears: z.coerce.number().positive({
          message: 'Deadline years must be greater than 0',
        }),
      }),
      z.object({
        variant: ClockDeathInputVariantEnum.extract(['date']),
        deadlineDate: z.custom<Dayjs>(
          dayjs.isDayjs,
          'Deadline date must not be empty',
        ),
      }),
    ]),
  )

type FormSchema = z.infer<typeof formSchema>

const configSchema = z.object({
  variant: ClockDeathInputVariantEnum,
  startDate: z
    .union([
      z.custom<Dayjs>(dayjs.isDayjs, 'Start date must not be empty'),
      z.string().transform(dayjs),
    ])
    .refine((val) => val.isValid(), { message: 'Invalid date' }),
  durationMs: z.coerce.number(),
})

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false)

  const [deadlineInputVariant, setDeadlineInputVariant] =
    useState<ClockDeathInputVariantEnum>(ClockDeathInputVariantEnum.enum.age)
  const deadlineInputVariantControlId = useId()
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [durationMs, setDurationMs] = useState<number>(0)

  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [isInterfaceVisible, setIsInterfaceVisible] = useState(true)

  const { control, handleSubmit, reset, resetField } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variant: deadlineInputVariant,
      startDate: startDate!,
      deadlineYears: 76,
      deadlineDate: null!,
    },
  })

  useEffect(() => {
    try {
      const config = JSON.parse(window.localStorage.getItem('config') || '{}')
      const result = configSchema.parse(config)

      setStartDate(result.startDate)
      setDeadlineInputVariant(result.variant)
      setDurationMs(result.durationMs)

      const deadlineDate = result.startDate.add(result.durationMs)

      reset({
        variant: result.variant,
        startDate: result.startDate,
        deadlineYears: deadlineDate.diff(result.startDate, 'y'),
        deadlineDate: deadlineDate,
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
        ? data.deadlineDate
        : data.startDate.add(data.deadlineYears, 'y')
    ).diff(data.startDate)

    const config = {
      variant: data.variant,
      startDate: data.startDate.format('YYYY-MM-DD'),
      durationMs: newDurationMs,
    }

    window.localStorage.setItem('config', JSON.stringify(config))

    setDeadlineInputVariant(data.variant)
    setStartDate(data.startDate)
    setDurationMs(newDurationMs)

    setIsConfigDialogOpen(false)
  }

  const handleDialogExited = useCallback(() => {
    setIsInitialized(true)
    const deadlineDate = startDate!.add(durationMs)

    reset({
      variant: deadlineInputVariant,
      startDate: startDate!,
      deadlineYears: deadlineDate.diff(startDate, 'y'),
      deadlineDate,
    })
  }, [startDate, durationMs, deadlineInputVariant, reset])

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
        {startDate && <Clock startDate={startDate} durationMs={durationMs} />}
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
            name='startDate'
            control={control}
            render={({
              field: { ref, ...fieldProps },
              fieldState: { error },
            }) => (
              <DateField
                {...fieldProps}
                inputRef={ref}
                required
                label='Start date'
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
                  <FormLabel id={deadlineInputVariantControlId}>
                    Deadline input format
                  </FormLabel>
                  <RadioGroup
                    {...field}
                    onTransitionEnd={() => {
                      resetField('deadlineDate')
                      resetField('deadlineYears')
                    }}
                    row
                    aria-labelledby={deadlineInputVariantControlId}
                  >
                    <FormControlLabel
                      value={ClockDeathInputVariantEnum.enum.age}
                      control={<Radio />}
                      label='Years'
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
                    name={'deadlineYears'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        required
                        label='Deadline years span'
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
                    name={'deadlineDate'}
                    control={control}
                    render={({
                      field: { ref, ...fieldProps },
                      fieldState: { error },
                    }) => (
                      <DateField
                        {...fieldProps}
                        inputRef={ref}
                        required
                        label='Deadline date'
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
