import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  Switch,
  TextField,
} from '@mui/material'
import { DateField } from '@mui/x-date-pickers'
import type { ReactNode } from 'react'
import { Controller, type Control } from 'react-hook-form'

import { EndDateInputVariantEnum, type FormInput } from './schema'
import type {
  ColorMode,
  EndDateInputVariant,
  LifeClockAppMessages,
} from './types'

export function SettingsForm({
  colorMode,
  control,
  messages,
  onColorModeChange,
  onVariantChange,
}: Readonly<{
  colorMode?: ColorMode
  control: Control<FormInput>
  messages: LifeClockAppMessages
  onColorModeChange: (mode: ColorMode) => void
  onVariantChange: (variant: EndDateInputVariant) => void
}>) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 2, sm: 2.5 },
      }}
    >
      <SettingsSection>
        <Controller
          name='startDate'
          control={control}
          render={({
            field: { ref, ...fieldProps },
            fieldState: { error },
          }) => (
            <SettingsRow
              label={messages.form.startDate}
              control={
                <DateField
                  {...fieldProps}
                  inputRef={ref}
                  required
                  label={messages.form.startDate}
                  variant='standard'
                  margin='none'
                  format={messages.dateFormat}
                  disableFuture
                  sx={{ width: { xs: 148, sm: 180 } }}
                  slotProps={{
                    textField: {
                      error: !!error,
                      helperText: error?.message,
                      size: 'small',
                    },
                  }}
                />
              }
            />
          )}
        />
      </SettingsSection>

      <SettingsSection>
        <Controller
          control={control}
          name='variant'
          render={({ field, fieldState: { error } }) => (
            <>
              <ListItem
                sx={{
                  alignItems: 'center',
                  minHeight: 58,
                  px: { xs: 2, sm: 2.5 },
                  py: 0.75,
                }}
              >
                <ListItemText
                  primary={messages.form.endDate}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: '1rem',
                        fontWeight: 400,
                        letterSpacing: 0,
                      },
                    },
                  }}
                />
                <FormControl error={!!error}>
                  <RadioGroup
                    row
                    aria-label={messages.form.endDate}
                    name={field.name}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={(event) => {
                      const variant = event.target.value as EndDateInputVariant

                      field.onChange(variant)
                      onVariantChange(variant)
                    }}
                    sx={{
                      flexWrap: 'nowrap',
                      justifyContent: 'flex-end',
                      gap: { xs: 0.5, sm: 1 },
                    }}
                  >
                    <FormControlLabel
                      value={EndDateInputVariantEnum.enum.age}
                      control={<Radio size='small' />}
                      label={messages.form.age}
                      sx={{ mr: 0 }}
                    />
                    <FormControlLabel
                      value={EndDateInputVariantEnum.enum.date}
                      control={<Radio size='small' />}
                      label={messages.form.date}
                      sx={{ mr: 0 }}
                    />
                  </RadioGroup>
                  {error ? (
                    <FormHelperText>{error.message}</FormHelperText>
                  ) : null}
                </FormControl>
              </ListItem>
              <Divider component='li' sx={{ ml: { xs: 2, sm: 2.5 } }} />
              {field.value === 'age' ? (
                <Controller
                  key='end-age'
                  name='endAge'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <SettingsRow
                      label={messages.form.endAge}
                      control={
                        <TextField
                          {...field}
                          required
                          label={messages.form.endAge}
                          variant='standard'
                          type='number'
                          margin='none'
                          size='small'
                          sx={{ width: { xs: 112, sm: 144 } }}
                          error={!!error}
                          helperText={error?.message}
                        />
                      }
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
                    <SettingsRow
                      label={messages.form.endDate}
                      control={
                        <DateField
                          {...fieldProps}
                          inputRef={ref}
                          required
                          label={messages.form.endDate}
                          variant='standard'
                          margin='none'
                          format={messages.dateFormat}
                          sx={{ width: { xs: 148, sm: 180 } }}
                          slotProps={{
                            textField: {
                              error: !!error,
                              helperText: error?.message,
                              size: 'small',
                            },
                          }}
                        />
                      }
                    />
                  )}
                />
              )}
            </>
          )}
        />
      </SettingsSection>

      <SettingsSection>
        <Controller
          name='useAmPm'
          control={control}
          render={({ field }) => (
            <SettingsRow
              label={messages.form.useAmPm}
              control={
                <Switch
                  checked={field.value}
                  disabled={field.disabled}
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={(event) => field.onChange(event.target.checked)}
                  slotProps={{
                    input: {
                      'aria-label': messages.form.useAmPm,
                      ref: field.ref,
                    },
                  }}
                />
              }
            />
          )}
        />
      </SettingsSection>

      {colorMode ? (
        <SettingsSection>
          <ListItem
            sx={{
              alignItems: { xs: 'flex-start', sm: 'center' },
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 0.75, sm: 2 },
              minHeight: 58,
              px: { xs: 2, sm: 2.5 },
              py: 1,
            }}
          >
            <ListItemText
              primary={messages.colorMode.label}
              sx={{ my: 0 }}
              slotProps={{
                primary: {
                  sx: {
                    fontSize: '1rem',
                    fontWeight: 400,
                    letterSpacing: 0,
                  },
                },
              }}
            />
            <RadioGroup
              row
              aria-label={messages.colorMode.label}
              value={colorMode}
              onChange={(event) => {
                onColorModeChange(event.target.value as ColorMode)
              }}
              sx={{
                flexWrap: 'nowrap',
                justifyContent: 'flex-end',
                gap: { xs: 0.5, sm: 1 },
              }}
            >
              <FormControlLabel
                value='system'
                control={<Radio size='small' />}
                label={messages.colorMode.system}
                sx={{ mr: 0 }}
              />
              <FormControlLabel
                value='light'
                control={<Radio size='small' />}
                label={messages.colorMode.light}
                sx={{ mr: 0 }}
              />
              <FormControlLabel
                value='dark'
                control={<Radio size='small' />}
                label={messages.colorMode.dark}
                sx={{ mr: 0 }}
              />
            </RadioGroup>
          </ListItem>
        </SettingsSection>
      ) : null}
    </Box>
  )
}

function SettingsSection({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        bgcolor: 'background.paper',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <List disablePadding>{children}</List>
    </Paper>
  )
}

function SettingsRow({
  control,
  label,
}: Readonly<{
  control: ReactNode
  label: string
}>) {
  return (
    <ListItem
      sx={{
        alignItems: 'center',
        gap: 2,
        minHeight: 58,
        px: { xs: 2, sm: 2.5 },
        py: 0.75,
      }}
    >
      <ListItemText
        primary={label}
        sx={{
          my: 0,
          minWidth: 0,
        }}
        slotProps={{
          primary: {
            sx: {
              fontSize: '1rem',
              fontWeight: 400,
              letterSpacing: 0,
            },
          },
        }}
      />
      <Box
        sx={{
          flexShrink: 0,
          textAlign: 'right',
          '& .MuiFormHelperText-root': {
            maxWidth: { xs: 148, sm: 220 },
            mx: 0,
            textAlign: 'right',
          },
        }}
      >
        {control}
      </Box>
    </ListItem>
  )
}
