'use client'

import { Clock } from '@/components'
import type { Dictionary } from '@/i18n'
import { zodResolver } from '@hookform/resolvers/zod'
import GitHubIcon from '@mui/icons-material/GitHub'
import SettingsIcon from '@mui/icons-material/Settings'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useColorScheme } from '@mui/material/styles'

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
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'

import { DateField } from '@mui/x-date-pickers'
import dayjs, { type Dayjs } from 'dayjs'
import { useCallback, useEffect, useId, useMemo, useState } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

import { z } from 'zod'

const EndDateInputVariantEnum = z.enum(['age', 'date'])
type EndDateInputVariantEnum = z.infer<typeof EndDateInputVariantEnum>
type LifeClockAppMessages = Dictionary['app']

function createFormSchema(messages: LifeClockAppMessages) {
  return z
    .object({
      useAmPm: z.boolean(),
      startDate: z
        .custom<Dayjs>(dayjs.isDayjs, messages.validation.startDateRequired)
        .refine((val) => val.isValid(), {
          message: messages.validation.invalidDate,
        }),
    })
    .and(
      z.discriminatedUnion('variant', [
        z.object({
          variant: EndDateInputVariantEnum.extract(['age']),
          endAge: z.coerce.number<number>().positive({
            message: messages.validation.endAgePositive,
          }),
        }),
        z.object({
          variant: EndDateInputVariantEnum.extract(['date']),
          endDate: z
            .custom<Dayjs>(dayjs.isDayjs, messages.validation.endDateRequired)
            .refine((val) => val.isValid(), {
              message: messages.validation.invalidDate,
            }),
        }),
      ]),
    )
}

type FormSchemaType = ReturnType<typeof createFormSchema>
type FormInput = z.input<FormSchemaType>
type FormSchema = z.output<FormSchemaType>

function createConfigSchema(messages: LifeClockAppMessages) {
  return z.object({
    variant: EndDateInputVariantEnum,
    useAmPm: z.boolean().optional(),
    startDate: z
      .union([
        z.custom<Dayjs>(dayjs.isDayjs, messages.validation.startDateRequired),
        z.string().transform(dayjs),
      ])
      .refine((val) => val.isValid(), {
        message: messages.validation.invalidDate,
      }),
    endDate: z
      .union([
        z.custom<Dayjs>(dayjs.isDayjs, messages.validation.endDateRequired),
        z.string().transform(dayjs),
      ])
      .refine((val) => val.isValid(), {
        message: messages.validation.invalidDate,
      }),
  })
}

function getBrowserDefaultUseAmPm() {
  try {
    return (
      Intl.DateTimeFormat(undefined, { hour: 'numeric' }).resolvedOptions()
        .hour12 ?? false
    )
  } catch {
    return false
  }
}

function ColorModeSelector({
  messages,
}: Readonly<{
  messages: LifeClockAppMessages
}>) {
  const colorModeInputId = useId()
  const { mode, setMode } = useColorScheme()

  if (!mode) {
    return null
  }

  return (
    <FormControl margin='dense'>
      <FormLabel id={colorModeInputId}>{messages.colorMode.label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby={colorModeInputId}
        value={mode}
        onChange={(event) => {
          setMode(event.target.value as 'system' | 'light' | 'dark')
        }}
      >
        <FormControlLabel
          value='system'
          control={<Radio />}
          label={messages.colorMode.system}
        />
        <FormControlLabel
          value='light'
          control={<Radio />}
          label={messages.colorMode.light}
        />
        <FormControlLabel
          value='dark'
          control={<Radio />}
          label={messages.colorMode.dark}
        />
      </RadioGroup>
    </FormControl>
  )
}

export default function LifeClockApp({
  messages,
}: Readonly<{
  messages: LifeClockAppMessages
}>) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [isInterfaceVisible, setIsInterfaceVisible] = useState(true)

  const endDateVariantInputId = useId()
  const [endDateInputVariant, setEndDateInputVariant] =
    useState<EndDateInputVariantEnum>(EndDateInputVariantEnum.enum.age)

  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  const [useAmPm, setUseAmPm] = useState(false)
  const formSchema = useMemo(() => createFormSchema(messages), [messages])
  const configSchema = useMemo(() => createConfigSchema(messages), [messages])

  const { control, handleSubmit, reset, resetField } = useForm<
    FormInput,
    unknown,
    FormSchema
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variant: endDateInputVariant,
      useAmPm,
      startDate: null as unknown as Dayjs,
      endAge: 76,
      endDate: null as unknown as Dayjs,
    },
  })

  useEffect(() => {
    try {
      const config = JSON.parse(window.localStorage.getItem('config') || '{}')
      const result = configSchema.parse(config)
      const useAmPm = result.useAmPm ?? getBrowserDefaultUseAmPm()

      // Local storage is only available after mount, so the persisted config has
      // to hydrate the client state from this effect.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEndDateInputVariant(result.variant)
      setStartDate(result.startDate)
      setEndDate(result.endDate)
      setUseAmPm(useAmPm)

      reset({
        variant: result.variant,
        useAmPm,
        startDate: result.startDate,
        endAge: result.endDate.diff(result.startDate, 'y'),
        endDate: result.endDate,
      })

      setIsInitialized(true)
    } catch {
      const useAmPm = getBrowserDefaultUseAmPm()

      window.localStorage.removeItem('config')
      setUseAmPm(useAmPm)
      reset({
        variant: EndDateInputVariantEnum.enum.age,
        useAmPm,
        startDate: null as unknown as Dayjs,
        endAge: 76,
      })
      setIsConfigDialogOpen(true)
    }
  }, [configSchema, reset])

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    const endDate =
      data.variant === 'date'
        ? data.endDate
        : data.startDate.add(data.endAge, 'y')

    const config = {
      variant: data.variant,
      useAmPm: data.useAmPm,
      startDate: data.startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
    }

    window.localStorage.setItem('config', JSON.stringify(config))

    setEndDateInputVariant(data.variant)
    setStartDate(data.startDate)
    setEndDate(endDate)
    setUseAmPm(data.useAmPm)

    setIsConfigDialogOpen(false)
  }

  const handleDialogExited = useCallback(() => {
    setIsInitialized(true)

    reset({
      variant: endDateInputVariant,
      useAmPm,
      startDate: startDate!,
      endDate: endDate!,
      endAge: endDate!.diff(startDate, 'y'),
    })
  }, [startDate, endDate, endDateInputVariant, reset, useAmPm])

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
              title={messages.controls.settings}
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
          <Fade in={isInterfaceVisible} appear={false}>
            <Tooltip
              title={messages.controls.sourceCode}
              placement='left'
              arrow
              enterDelay={200}
              enterNextDelay={200}
            >
              <IconButton
                aria-label={messages.controls.sourceCode}
                component='a'
                href='https://github.com/DenDeline/clock-website'
                rel='noopener noreferrer'
                size='small'
                target='_blank'
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </Fade>
          <Tooltip
            title={
              isInterfaceVisible
                ? messages.controls.hideInterface
                : messages.controls.showInterface
            }
            placement='left'
            arrow
            enterDelay={200}
            enterNextDelay={200}
          >
            <IconButton
              aria-label={messages.controls.toggleInterface}
              size='small'
              onClick={() => setIsInterfaceVisible((v) => !v)}
            >
              {isInterfaceVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Grid
        container
        sx={{
          height: '100dvh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Fade in={Boolean(startDate && endDate)} mountOnEnter>
          <div>
            <Clock
              startDate={startDate!}
              endDate={endDate!}
              useAmPm={useAmPm}
            />
          </div>
        </Fade>
      </Grid>
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
        <DialogTitle>
          {isInitialized
            ? messages.dialog.settingsTitle
            : messages.dialog.welcomeTitle}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{messages.dialog.intro}</Typography>
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
                label={messages.form.startDate}
                variant='standard'
                margin='dense'
                fullWidth
                format={messages.dateFormat}
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
                    {messages.form.endDateQuestion}
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
                      label={messages.form.age}
                    />
                    <FormControlLabel
                      value={EndDateInputVariantEnum.enum.date}
                      control={<Radio />}
                      label={messages.form.date}
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
                        label={messages.form.endAge}
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
                        label={messages.form.endDate}
                        variant='standard'
                        margin='dense'
                        fullWidth
                        sx={{ mb: 2 }}
                        format={messages.dateFormat}
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
          <Controller
            name='useAmPm'
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value}
                    disabled={field.disabled}
                    name={field.name}
                    onBlur={field.onBlur}
                    onChange={(event) => field.onChange(event.target.checked)}
                  />
                }
                label={messages.form.useAmPm}
                sx={{ display: 'flex', mt: 1 }}
              />
            )}
          />
          <ColorModeSelector messages={messages} />
          <Alert severity='info'>{messages.form.info}</Alert>
        </DialogContent>
        <DialogActions>
          {isInitialized && (
            <Button onClick={() => setIsConfigDialogOpen(false)}>
              {messages.dialog.close}
            </Button>
          )}
          <Button type='submit'>{messages.dialog.save}</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
