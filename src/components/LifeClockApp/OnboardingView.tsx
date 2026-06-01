import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { DateField } from '@mui/x-date-pickers'
import NextLink from 'next/link'
import type { SubmitEventHandler } from 'react'
import { Controller, type Control } from 'react-hook-form'

import { getLocalizedPath, type Locale } from '@/i18n/config'

import type { FormInput } from './schema'
import type { LifeClockAppMessages } from './types'

export function OnboardingView({
  control,
  locale,
  messages,
  onSubmit,
}: Readonly<{
  control: Control<FormInput>
  locale: Locale
  messages: LifeClockAppMessages
  onSubmit: SubmitEventHandler<HTMLFormElement>
}>) {
  return (
    <Box
      component='form'
      noValidate
      onSubmit={onSubmit}
      sx={{
        minHeight: 'var(--life-app-height, 100dvh)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        px: { xs: 3, sm: 6 },
        pt: {
          xs: 'calc(48px + env(safe-area-inset-top))',
          sm: 8,
        },
        pb: {
          xs: 'calc(48px + env(safe-area-inset-bottom))',
          sm: 8,
        },
        bgcolor: 'background.default',
        backgroundImage:
          'radial-gradient(circle at 50% 12%, rgba(25, 118, 210, 0.18), transparent 34%), linear-gradient(180deg, rgba(25, 118, 210, 0.08), transparent 46%)',
      }}
    >
      <Stack
        spacing={{ xs: 4, sm: 5 }}
        sx={{
          width: '100%',
          maxWidth: 720,
          mx: 'auto',
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography
            component='p'
            variant='overline'
            color='primary'
            sx={{ fontWeight: 700 }}
          >
            {messages.onboarding.eyebrow}
          </Typography>
          <Typography
            component='h1'
            variant='h1'
            sx={{
              mt: 1,
              fontSize: { xs: '3.25rem', sm: '5rem', md: '6.5rem' },
              lineHeight: 0.95,
              fontWeight: 800,
            }}
          >
            {messages.onboarding.title}
          </Typography>
          <Typography
            variant='h5'
            color='text.secondary'
            sx={{
              mt: 3,
              mx: 'auto',
              maxWidth: 600,
              fontSize: { xs: '1.1rem', sm: '1.35rem' },
              lineHeight: 1.45,
            }}
          >
            {messages.onboarding.body}
          </Typography>
        </Box>

        <Stack
          spacing={2}
          sx={{
            width: '100%',
            maxWidth: 420,
          }}
        >
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
                label={messages.onboarding.birthDate}
                variant='outlined'
                margin='none'
                fullWidth
                format={messages.dateFormat}
                disableFuture
                slotProps={{
                  textField: {
                    error: !!error,
                    helperText:
                      error?.message ?? messages.onboarding.storageNote,
                  },
                }}
              />
            )}
          />
          <Controller
            name='privacyAccepted'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl error={!!error} required>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value}
                      name={field.name}
                      onBlur={field.onBlur}
                      onChange={(event) => field.onChange(event.target.checked)}
                      slotProps={{
                        input: {
                          ref: field.ref,
                        },
                      }}
                    />
                  }
                  label={
                    <>
                      {messages.onboarding.privacyPrefix}{' '}
                      <Link
                        component={NextLink}
                        href={getLocalizedPath('/privacy', locale)}
                      >
                        {messages.onboarding.privacyLink}
                      </Link>
                    </>
                  }
                  sx={{
                    m: 0,
                    textAlign: 'left',
                  }}
                />
                {error ? (
                  <FormHelperText sx={{ ml: 4 }}>
                    {error.message}
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Button
            type='submit'
            variant='contained'
            size='large'
            endIcon={<PlayArrowIcon />}
            sx={{
              minHeight: 56,
              borderRadius: 2,
              fontWeight: 700,
            }}
          >
            {messages.onboarding.getStarted}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
