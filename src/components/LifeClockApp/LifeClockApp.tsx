'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useColorScheme } from '@mui/material/styles'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form'

import type { Locale } from '@/i18n'

import { ClockScreen } from './ClockScreen'
import { DesktopControls } from './DesktopControls'
import { MobileNavigation } from './MobileNavigation'
import { OnboardingView } from './OnboardingView'
import {
  createEmptyFormValues,
  createFormSchema,
  EndDateInputVariantEnum,
  getEndDateFromFormData,
  type FormInput,
  type FormSchema,
} from './schema'
import { SettingsForm } from './SettingsForm'
import { SettingsScreen } from './SettingsScreen'
import type {
  ColorMode,
  EndDateInputVariant,
  LifeClockAppMessages,
  MobileTab,
} from './types'
import { DEFAULT_END_AGE } from './types'
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
  const [activeMobileTab, setActiveMobileTab] = useState<MobileTab>('clock')
  const [isInterfaceVisible, setIsInterfaceVisible] = useState(true)
  const hasHydratedFormRef = useRef(false)
  const lastSavedConfigKeyRef = useRef<string | undefined>(undefined)
  const formSchema = useMemo(() => createFormSchema(messages), [messages])
  const {
    config,
    defaultUseAmPm,
    isConfigLoaded,
    isInitialized,
    saveConfigFromForm,
  } = useLifeClockConfig(messages)
  const { mode: colorSchemeMode, setMode: setColorSchemeMode } =
    useColorScheme()
  const currentColorMode = colorSchemeMode as ColorMode | undefined

  const { control, handleSubmit, reset, resetField, setValue } = useForm<
    FormInput,
    unknown,
    FormSchema
  >({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: createEmptyFormValues(false),
  })
  const formValues = useWatch({ control })

  useEffect(() => {
    if (!isConfigLoaded || hasHydratedFormRef.current) {
      return
    }

    reset(
      config
        ? createFormValuesFromConfig(config)
        : createEmptyFormValues(defaultUseAmPm),
    )
    hasHydratedFormRef.current = true
  }, [config, defaultUseAmPm, isConfigLoaded, reset])

  useEffect(() => {
    if (!isInitialized) {
      return
    }

    const parsedFormValues = formSchema.safeParse(formValues)

    if (!parsedFormValues.success) {
      return
    }

    const endDate = getEndDateFromFormData(parsedFormValues.data)
    const configKey = [
      parsedFormValues.data.variant,
      parsedFormValues.data.useAmPm,
      parsedFormValues.data.startDate.format('YYYY-MM-DD'),
      endDate.format('YYYY-MM-DD'),
    ].join('|')

    if (configKey === lastSavedConfigKeyRef.current) {
      return
    }

    lastSavedConfigKeyRef.current = configKey
    saveConfigFromForm(parsedFormValues.data)
  }, [formSchema, formValues, isInitialized, saveConfigFromForm])

  const handleVariantChange = useCallback(
    (variant: EndDateInputVariant) => {
      if (variant === EndDateInputVariantEnum.enum.age) {
        resetField('endDate')
        setValue('endAge', DEFAULT_END_AGE, {
          shouldDirty: true,
          shouldValidate: true,
        })
        return
      }

      if (config) {
        setValue('endDate', config.endDate, {
          shouldDirty: true,
          shouldValidate: true,
        })
      }
      resetField('endAge')
    },
    [config, resetField, setValue],
  )

  const handleColorModeChange = useCallback(
    (mode: ColorMode) => {
      setColorSchemeMode(mode)
    },
    [setColorSchemeMode],
  )

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    saveConfigFromForm(data)
    setActiveMobileTab('clock')
  }

  const submitForm = handleSubmit(onSubmit)
  const settingsFields = (
    <SettingsForm
      colorMode={currentColorMode}
      control={control}
      messages={messages}
      onColorModeChange={handleColorModeChange}
      onVariantChange={handleVariantChange}
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
      {activeMobileTab === 'clock' ? (
        <DesktopControls
          isInterfaceVisible={isInterfaceVisible}
          messages={messages}
          onOpenSettings={() => setActiveMobileTab('settings')}
          onToggleInterface={() => setIsInterfaceVisible((v) => !v)}
        />
      ) : null}
      <ClockScreen activeMobileTab={activeMobileTab} config={config} />
      <SettingsScreen
        activeMobileTab={activeMobileTab}
        fields={settingsFields}
        messages={messages}
        onBack={() => setActiveMobileTab('clock')}
      />
      <MobileNavigation
        activeMobileTab={activeMobileTab}
        messages={messages}
        onTabChange={setActiveMobileTab}
      />
    </>
  )
}
