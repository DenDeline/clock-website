import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  createConfigSchema,
  type FormInput,
  type FormSchema,
  getEndDateFromFormData,
} from './schema'
import {
  clearStoredConfig,
  getBrowserDefaultUseAmPm,
  getStoredConfig,
  saveStoredConfig,
} from './storage'
import type { LifeClockAppMessages, LifeClockConfig } from './types'

export function createFormValuesFromConfig(config: LifeClockConfig): FormInput {
  const baseValues = {
    useAmPm: config.useAmPm,
    startDate: config.startDate,
    privacyAccepted: true,
  }

  if (config.variant === 'date') {
    return {
      ...baseValues,
      variant: config.variant,
      endDate: config.endDate,
    }
  }

  return {
    ...baseValues,
    variant: config.variant,
    endAge: config.endDate.diff(config.startDate, 'y'),
  }
}

export function useLifeClockConfig(messages: LifeClockAppMessages) {
  const [isConfigLoaded, setIsConfigLoaded] = useState(false)
  const [config, setConfig] = useState<LifeClockConfig | null>(null)
  const [defaultUseAmPm, setDefaultUseAmPm] = useState(false)
  const configSchema = useMemo(() => createConfigSchema(messages), [messages])

  useEffect(() => {
    const browserUseAmPm = getBrowserDefaultUseAmPm()

    // Local storage is only available after mount, so the persisted config has
    // to hydrate the client state from this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDefaultUseAmPm(browserUseAmPm)

    try {
      const storedConfig = JSON.parse(getStoredConfig() || '{}')
      const parsedConfig = configSchema.parse(storedConfig)

      setConfig({
        variant: parsedConfig.variant,
        useAmPm: parsedConfig.useAmPm ?? browserUseAmPm,
        startDate: parsedConfig.startDate,
        endDate: parsedConfig.endDate,
      })
    } catch {
      clearStoredConfig()
      setConfig(null)
    }

    setIsConfigLoaded(true)
  }, [configSchema])

  const saveConfigFromForm = useCallback((data: FormSchema) => {
    const endDate = getEndDateFromFormData(data)
    const nextConfig = {
      variant: data.variant,
      useAmPm: data.useAmPm,
      startDate: data.startDate,
      endDate,
    }

    saveStoredConfig({
      variant: nextConfig.variant,
      useAmPm: nextConfig.useAmPm,
      startDate: nextConfig.startDate.format('YYYY-MM-DD'),
      endDate: nextConfig.endDate.format('YYYY-MM-DD'),
    })

    setConfig(nextConfig)

    return nextConfig
  }, [])

  return {
    isConfigLoaded,
    isInitialized: Boolean(config),
    config,
    defaultUseAmPm,
    saveConfigFromForm,
  }
}
