import {
  Alert,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { Controller, type Control } from 'react-hook-form'

import { EndDateInputVariantEnum, type FormInput } from './schema'
import { ColorModeSelector } from './ColorModeSelector'
import { ResponsiveDateField } from './ResponsiveDateField'
import type {
  ColorMode,
  EndDateInputVariant,
  LifeClockAppMessages,
} from './types'

export function SettingsForm({
  autoFocus,
  colorMode,
  control,
  endDateVariantInputId,
  messages,
  onColorModeChange,
  onVariantChange,
}: Readonly<{
  autoFocus: boolean
  colorMode?: ColorMode
  control: Control<FormInput>
  endDateVariantInputId: string
  messages: LifeClockAppMessages
  onColorModeChange: (mode: ColorMode) => void
  onVariantChange: (variant: EndDateInputVariant) => void
}>) {
  return (
    <>
      <Typography gutterBottom>{messages.dialog.intro}</Typography>
      <Controller
        name='startDate'
        control={control}
        render={({ field: { ref, ...fieldProps }, fieldState: { error } }) => (
          <ResponsiveDateField
            {...fieldProps}
            inputRef={ref}
            required
            label={messages.form.startDate}
            variant='standard'
            margin='dense'
            fullWidth
            format={messages.dateFormat}
            disableFuture
            autoFocus={autoFocus}
            error={!!error}
            helperText={error?.message}
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
                row
                aria-labelledby={endDateVariantInputId}
                name={field.name}
                value={field.value}
                onBlur={field.onBlur}
                onChange={(event) => {
                  const variant = event.target.value as EndDateInputVariant

                  field.onChange(variant)
                  onVariantChange(variant)
                }}
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
                key='end-age'
                name='endAge'
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
                key='end-date'
                name='endDate'
                control={control}
                render={({
                  field: { ref, ...fieldProps },
                  fieldState: { error },
                }) => (
                  <ResponsiveDateField
                    {...fieldProps}
                    inputRef={ref}
                    required
                    label={messages.form.endDate}
                    variant='standard'
                    margin='dense'
                    fullWidth
                    sx={{ mb: 2 }}
                    format={messages.dateFormat}
                    error={!!error}
                    helperText={error?.message}
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
      <ColorModeSelector
        mode={colorMode}
        messages={messages}
        onModeChange={onColorModeChange}
      />
      <Alert severity='info'>{messages.form.info}</Alert>
    </>
  )
}
