import en from './en'
import ru from './ru'
import type { Locale } from '../config'
import type { Dictionary } from './types'

export const dictionaries = {
  en,
  ru,
} as const satisfies Record<Locale, Dictionary>
