import { dictionaries } from './dictionaries'
import { defaultLocale, type Locale } from './config'

export * from './config'

export type Dictionary = (typeof dictionaries)[typeof defaultLocale]

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
