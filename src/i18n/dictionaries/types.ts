import en from './en'

export type LinkTextPart = {
  readonly type: 'link'
  readonly href: string
  readonly text: string
}

export type PrivacySectionBody = string | readonly (string | LinkTextPart)[]

type WidenDictionaryValue<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? Item extends string | LinkTextPart
      ? PrivacySectionBody
      : readonly WidenDictionaryValue<Item>[]
    : T extends object
      ? { readonly [Key in keyof T]: WidenDictionaryValue<T[Key]> }
      : T

export type Dictionary = WidenDictionaryValue<typeof en>
