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

const EndDateInputVariantEnum = z.enum(['age', 'date'])
type EndDateInputVariantEnum = z.infer<typeof EndDateInputVariantEnum>

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
        variant: EndDateInputVariantEnum.extract(['age']),
        endAge: z.coerce.number().positive({
          message: 'End age must be greater than 0',
        }),
      }),
      z.object({
        variant: EndDateInputVariantEnum.extract(['date']),
        endDate: z
          .custom<Dayjs>(dayjs.isDayjs, 'End date date must not be empty')
          .refine((val) => val.isValid(), { message: 'Invalid date' }),
      }),
    ]),
  )

type FormSchema = z.infer<typeof formSchema>

const configSchema = z.object({
  variant: EndDateInputVariantEnum,
  startDate: z
    .union([
      z.custom<Dayjs>(dayjs.isDayjs, 'Start date must not be empty'),
      z.string().transform(dayjs),
    ])
    .refine((val) => val.isValid(), { message: 'Invalid date' }),
  endDate: z
    .union([
      z.custom<Dayjs>(dayjs.isDayjs, 'End date must not be empty'),
      z.string().transform(dayjs),
    ])
    .refine((val) => val.isValid(), { message: 'Invalid date' }),
})

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [isInterfaceVisible, setIsInterfaceVisible] = useState(true)

  const endDateVariantInputId = useId()
  const [endDateInputVariant, setEndDateInputVariant] =
    useState<EndDateInputVariantEnum>(EndDateInputVariantEnum.enum.age)

  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)

  const { control, handleSubmit, reset, resetField } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variant: endDateInputVariant,
      startDate: startDate!,
      endAge: 76,
      endDate: endDate!,
    },
  })

  useEffect(() => {
    try {
      const config = JSON.parse(window.localStorage.getItem('config') || '{}')
      const result = configSchema.parse(config)

      setEndDateInputVariant(result.variant)
      setStartDate(result.startDate)
      setEndDate(result.endDate)

      reset({
        variant: result.variant,
        startDate: result.startDate,
        endAge: result.endDate.diff(result.startDate, 'y'),
        endDate: result.endDate,
      })

      setIsInitialized(true)
    } catch {
      window.localStorage.removeItem('config')
      setIsConfigDialogOpen(true)
    }
  }, [reset])

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    const endDate =
      data.variant === 'date'
        ? data.endDate
        : data.startDate.add(data.endAge, 'y')

    const config = {
      variant: data.variant,
      startDate: data.startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
    }

    window.localStorage.setItem('config', JSON.stringify(config))

    setEndDateInputVariant(data.variant)
    setStartDate(data.startDate)
    setEndDate(endDate)

    setIsConfigDialogOpen(false)
  }

  const handleDialogExited = useCallback(() => {
    setIsInitialized(true)

    reset({
      variant: endDateInputVariant,
      startDate: startDate!,
      endDate: endDate!,
      endAge: endDate!.diff(startDate, 'y'),
    })
  }, [startDate, endDate, endDateInputVariant, reset])

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
        {startDate && endDate && (
          <Clock startDate={startDate} endDate={endDate} />
        )}
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
                  <FormLabel id={endDateVariantInputId}>
                    How should the end date be calculated?
                  </FormLabel>
                  <RadioGroup
                    {...field}
                    onTransitionEnd={() => {
                      resetField('endDate')
                      resetField('endAge')
                    }}
                    row
                    aria-labelledby={endDateVariantInputId}
                  >
                    <FormControlLabel
                      value={EndDateInputVariantEnum.enum.age}
                      control={<Radio />}
                      label='Age'
                    />
                    <FormControlLabel
                      value={EndDateInputVariantEnum.enum.date}
                      control={<Radio />}
                      label='Date'
                    />
                  </RadioGroup>
                  <FormHelperText>{error?.message}</FormHelperText>
                </FormControl>
                {field.value === 'age' ? (
                  <Controller
                    key={'.01'}
                    name={'endAge'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        required
                        label='End age'
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
                    name={'endDate'}
                    control={control}
                    render={({
                      field: { ref, ...fieldProps },
                      fieldState: { error },
                    }) => (
                      <DateField
                        {...fieldProps}
                        inputRef={ref}
                        required
                        label='End date'
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
