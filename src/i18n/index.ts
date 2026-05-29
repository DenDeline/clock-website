import { dictionaries } from './dictionaries'
import type { Locale } from './config'
import type { Dictionary } from './dictionaries/types'

export * from './config'
export type { Dictionary } from './dictionaries/types'

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary
}
