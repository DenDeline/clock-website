'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useCallback, useEffect, useId, useMemo, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import type { Locale } from '@/i18n'

import { ClockScreen } from './ClockScreen'
import { DesktopControls } from './DesktopControls'
import { MobileNavigation } from './MobileNavigation'
import { MobileSettingsView } from './MobileSettingsView'
import { OnboardingView } from './OnboardingView'
import {
  createEmptyFormValues,
  createFormSchema,
  EndDateInputVariantEnum,
  type FormInput,
  type FormSchema,
} from './schema'
import { SettingsActions } from './SettingsActions'
import { SettingsForm } from './SettingsForm'
import type {
  EndDateInputVariant,
  LifeClockAppMessages,
  MobileTab,
} from './types'
import { DEFAULT_END_AGE } from './types'
import { useColorModeDraft } from './useColorModeDraft'
import {
  createFormValuesFromConfig,
  useLifeClockConfig,
} from './useLifeClockConfig'

export default function LifeClockApp({
  locale,
  messages,
}: Readonly<{
  locale: Locale
  messages: LifeClockAppMessages
}>) {
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [activeMobileTab, setActiveMobileTab] = useState<MobileTab>('clock')
  const [isInterfaceVisible, setIsInterfaceVisible] = useState(true)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
    noSsr: true,
  })
  const endDateVariantInputId = useId()
  const formSchema = useMemo(() => createFormSchema(messages), [messages])
  const {
    config,
    defaultUseAmPm,
    isConfigLoaded,
    isInitialized,
    saveConfigFromForm,
  } = useLifeClockConfig(messages)
  const {
    currentColorMode,
    stagedColorMode,
    cancelColorModeDraft,
    changeColorModeDraft,
    commitColorModeDraft,
    startColorModeDraft,
  } = useColorModeDraft()

  const { control, handleSubmit, reset, resetField } = useForm<
    FormInput,
    unknown,
    FormSchema
  >({
    resolver: zodResolver(formSchema),
    defaultValues: createEmptyFormValues(false),
  })

  useEffect(() => {
    if (!isConfigLoaded) {
      return
    }

    reset(
      config
        ? createFormValuesFromConfig(config)
        : createEmptyFormValues(defaultUseAmPm),
    )
  }, [config, defaultUseAmPm, isConfigLoaded, reset])

  const handleVariantChange = useCallback(
    (variant: EndDateInputVariant) => {
      if (variant === EndDateInputVariantEnum.enum.age) {
        resetField('endDate')
        resetField('endAge', { defaultValue: DEFAULT_END_AGE })
        return
      }

      resetField('endAge', { defaultValue: DEFAULT_END_AGE })
    },
    [resetField],
  )

  const handleOpenConfigDialog = useCallback(() => {
    startColorModeDraft()
    setIsConfigDialogOpen(true)
  }, [startColorModeDraft])

  const handleCloseConfigDialog = useCallback(() => {
    cancelColorModeDraft()
    setIsConfigDialogOpen(false)
  }, [cancelColorModeDraft])

  const handleDialogExited = useCallback(() => {
    if (!config) {
      return
    }

    reset(createFormValuesFromConfig(config))
  }, [config, reset])

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    saveConfigFromForm(data)
    commitColorModeDraft()
    setActiveMobileTab('clock')
    setIsConfigDialogOpen(false)
  }

  const submitForm = handleSubmit(onSubmit)
  const settingsFields = (autoFocus: boolean) => (
    <SettingsForm
      autoFocus={autoFocus}
      colorMode={stagedColorMode ?? currentColorMode}
      control={control}
      endDateVariantInputId={endDateVariantInputId}
      messages={messages}
      onColorModeChange={changeColorModeDraft}
      onVariantChange={handleVariantChange}
    />
  )
  const settingsActions = (includeClose: boolean) => (
    <SettingsActions
      includeClose={includeClose}
      messages={messages}
      onClose={handleCloseConfigDialog}
    />
  )

  if (!isConfigLoaded) {
    return null
  }

  if (!isInitialized) {
    return (
      <OnboardingView
        control={control}
        locale={locale}
        messages={messages}
        onSubmit={submitForm}
      />
    )
  }

  return (
    <>
      <DesktopControls
        isInterfaceVisible={isInterfaceVisible}
        messages={messages}
        onOpenSettings={handleOpenConfigDialog}
        onToggleInterface={() => setIsInterfaceVisible((v) => !v)}
      />
      <ClockScreen activeMobileTab={activeMobileTab} config={config} />
      <MobileSettingsView
        activeMobileTab={activeMobileTab}
        fields={settingsFields(false)}
        isInitialized={isInitialized}
        messages={messages}
        onSubmit={submitForm}
        settingsActions={settingsActions(false)}
      />
      <MobileNavigation
        activeMobileTab={activeMobileTab}
        messages={messages}
        onTabChange={setActiveMobileTab}
      />
      <Dialog
        open={isConfigDialogOpen}
        onSubmit={submitForm}
        slotProps={{
          paper: {
            component: 'form',
            noValidate: true,
          },
          transition: {
            onExited: handleDialogExited,
          },
        }}
        onClose={isInitialized ? handleCloseConfigDialog : undefined}
      >
        <DialogTitle>
          {isInitialized
            ? messages.dialog.settingsTitle
            : messages.dialog.welcomeTitle}
        </DialogTitle>
        <DialogContent dividers>
          {settingsFields(!isInitialized && !isMobile)}
        </DialogContent>
        {settingsActions(isInitialized)}
      </Dialog>
    </>
  )
}
