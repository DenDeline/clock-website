import en from './en'

type WidenDictionaryValue<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? readonly WidenDictionaryValue<Item>[]
    : T extends object
      ? { readonly [Key in keyof T]: WidenDictionaryValue<T[Key]> }
      : T

export type Dictionary = WidenDictionaryValue<typeof en>
