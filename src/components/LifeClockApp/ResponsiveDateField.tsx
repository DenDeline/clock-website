'use client'

import { TextField, useMediaQuery, type TextFieldProps } from '@mui/material'
import { useTheme, type SxProps, type Theme } from '@mui/material/styles'
import { DateField } from '@mui/x-date-pickers'
import dayjs, { type Dayjs } from 'dayjs'
import type { Ref } from 'react'

type ResponsiveDateFieldProps = {
  autoFocus?: boolean
  disabled?: boolean
  disableFuture?: boolean
  error?: boolean
  format: string
  fullWidth?: boolean
  helperText?: React.ReactNode
  inputRef?: Ref<HTMLInputElement>
  label: React.ReactNode
  margin?: TextFieldProps['margin']
  name?: string
  onBlur?: () => void
  onChange: (value: Dayjs | null) => void
  required?: boolean
  sx?: SxProps<Theme>
  value?: Dayjs | null
  variant?: TextFieldProps['variant']
}

function formatNativeDateValue(value?: Dayjs | null) {
  if (!dayjs.isDayjs(value) || !value.isValid()) {
    return ''
  }

  return value.format('YYYY-MM-DD')
}

export function ResponsiveDateField({
  autoFocus,
  disabled,
  disableFuture,
  error,
  format,
  fullWidth,
  helperText,
  inputRef,
  label,
  margin,
  name,
  onBlur,
  onChange,
  required,
  sx,
  value,
  variant,
}: ResponsiveDateFieldProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
    noSsr: true,
  })

  if (isMobile) {
    return (
      <TextField
        inputRef={inputRef}
        autoFocus={autoFocus}
        disabled={disabled}
        error={error}
        fullWidth={fullWidth}
        helperText={helperText}
        label={label}
        margin={margin}
        name={name}
        onBlur={onBlur}
        onChange={(event) => {
          onChange(event.target.value ? dayjs(event.target.value) : null)
        }}
        required={required}
        slotProps={{
          htmlInput: {
            max: disableFuture ? dayjs().format('YYYY-MM-DD') : undefined,
          },
          inputLabel: { shrink: true },
        }}
        sx={sx}
        type='date'
        value={formatNativeDateValue(value)}
        variant={variant}
      />
    )
  }

  return (
    <DateField
      inputRef={inputRef}
      autoFocus={autoFocus}
      disabled={disabled}
      disableFuture={disableFuture}
      format={format}
      fullWidth={fullWidth}
      label={label}
      margin={margin}
      name={name}
      onChange={onChange}
      required={required}
      slotProps={{
        textField: {
          error,
          helperText,
          onBlur,
        },
      }}
      sx={sx}
      value={value}
      variant={variant}
    />
  )
}
