import en from './en'
import ja from './ja'
import ru from './ru'
import type { Locale } from '@/i18n'
import type { Dictionary } from '@/i18n'

export const dictionaries = {
  en,
  ja,
  ru,
} as const satisfies Record<Locale, Dictionary>
