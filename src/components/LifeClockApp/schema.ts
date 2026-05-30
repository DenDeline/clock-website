import dayjs, { type Dayjs } from 'dayjs'
import { z } from 'zod'

import { DEFAULT_END_AGE, type LifeClockAppMessages } from './types'

export const EndDateInputVariantEnum = z.enum(['age', 'date'])

type EndDateFormData =
  | {
      variant: 'age'
      startDate: Dayjs
      endAge: number
    }
  | {
      variant: 'date'
      startDate: Dayjs
      endDate: Dayjs
    }

function createDayjsSchema(requiredMessage: string, invalidMessage: string) {
  return z
    .custom<Dayjs>(dayjs.isDayjs, requiredMessage)
    .refine((val) => val.isValid(), {
      message: invalidMessage,
    })
}

function createStoredDayjsSchema(
  requiredMessage: string,
  invalidMessage: string,
) {
  return z
    .union([z.custom<Dayjs>(dayjs.isDayjs, requiredMessage), z.string()])
    .transform((value) => (dayjs.isDayjs(value) ? value : dayjs(value)))
    .refine((val) => val.isValid(), {
      message: invalidMessage,
    })
}

function createStartDateSchema(messages: LifeClockAppMessages) {
  return createDayjsSchema(
    messages.validation.startDateRequired,
    messages.validation.invalidDate,
  ).refine((val) => !val.isAfter(dayjs(), 'day'), {
    message: messages.validation.startDateFuture,
  })
}

function createStoredStartDateSchema(messages: LifeClockAppMessages) {
  return createStoredDayjsSchema(
    messages.validation.startDateRequired,
    messages.validation.invalidDate,
  ).refine((val) => !val.isAfter(dayjs(), 'day'), {
    message: messages.validation.startDateFuture,
  })
}

export function createFormSchema(messages: LifeClockAppMessages) {
  const baseSchema = {
    useAmPm: z.boolean(),
    startDate: createStartDateSchema(messages),
  }

  return z.discriminatedUnion('variant', [
    z
      .object({
        ...baseSchema,
        variant: EndDateInputVariantEnum.extract(['age']),
        endAge: z.coerce.number<number>().positive({
          message: messages.validation.endAgePositive,
        }),
      })
      .refine((data) => getEndDateFromFormData(data).isAfter(data.startDate), {
        message: messages.validation.endDateAfterStart,
        path: ['endAge'],
      }),
    z
      .object({
        ...baseSchema,
        variant: EndDateInputVariantEnum.extract(['date']),
        endDate: createDayjsSchema(
          messages.validation.endDateRequired,
          messages.validation.invalidDate,
        ),
      })
      .refine((data) => data.endDate.isAfter(data.startDate), {
        message: messages.validation.endDateAfterStart,
        path: ['endDate'],
      }),
  ])
}

export function createConfigSchema(messages: LifeClockAppMessages) {
  return z
    .object({
      variant: EndDateInputVariantEnum,
      useAmPm: z.boolean().optional(),
      startDate: createStoredStartDateSchema(messages),
      endDate: createStoredDayjsSchema(
        messages.validation.endDateRequired,
        messages.validation.invalidDate,
      ),
    })
    .refine((data) => data.endDate.isAfter(data.startDate), {
      message: messages.validation.endDateAfterStart,
      path: ['endDate'],
    })
}

export type FormSchemaType = ReturnType<typeof createFormSchema>
export type FormInput = z.input<FormSchemaType>
export type FormSchema = z.output<FormSchemaType>

export function getEndDateFromFormData(data: EndDateFormData) {
  return data.variant === 'date'
    ? data.endDate
    : data.startDate.add(data.endAge, 'y')
}

export function createEmptyFormValues(useAmPm: boolean): FormInput {
  return {
    variant: EndDateInputVariantEnum.enum.age,
    useAmPm,
    startDate: null as unknown as Dayjs,
    endAge: DEFAULT_END_AGE,
  }
}
