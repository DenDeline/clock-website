import type { Dictionary } from '@/i18n'
import type { Dayjs } from 'dayjs'

export const DEFAULT_END_AGE = 76

export type LifeClockAppMessages = Dictionary['app']
export type ColorMode = 'system' | 'light' | 'dark'
export type MobileTab = 'clock' | 'settings'

export type LifeClockConfig = {
  variant: EndDateInputVariant
  useAmPm: boolean
  startDate: Dayjs
  endDate: Dayjs
}

export type EndDateInputVariant = 'age' | 'date'
