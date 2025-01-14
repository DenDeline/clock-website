'use client'

import { useMemo, useRef } from 'react'
import { Grid2, Typography } from '@mui/material'
import { addYearsToDate, formatClockValue } from '@/utils'

const timeConstants = {
  hoursInDay: 24,
  minutesInHour: 60,
  secondsInMinute: 60,
}

class LifeClock {
  private _birthday: Date = new Date('2002-08-20T00:00:00.000')
  private _meanDeathAge = 76
  private _meanDeathDay: Date | null = null
  private _meanLifeDurationMs: number | null = null

  constructor() {}

  public get meanDeathAge(): number {
    return this._meanDeathAge
  }

  public set meanDeathAge(value: number) {
    this._meanDeathAge = value
    this._meanDeathDay = null
    this._meanLifeDurationMs = null
  }

  public get birthday(): Date {
    return this._birthday
  }

  public set birthday(value: Date) {
    this._birthday = value
    this._meanDeathDay = null
    this._meanLifeDurationMs = null
  }

  public get meanDeathDay(): Date {
    if (!this._meanDeathDay) {
      this._meanDeathDay = addYearsToDate(this.birthday, this.meanDeathAge)
    }
    return this._meanDeathDay
  }

  public static getLifeDurationMs(birthDate: Date, deathDate: Date, lifePercentage = 1): number {
    return lifePercentage * (deathDate.getTime() - birthDate.getTime())
  }

  public get meanLifeDurationMs(): number {
    if (!this._meanLifeDurationMs) {
      this._meanLifeDurationMs = LifeClock.getLifeDurationMs(this.birthday, this.meanDeathDay)
    }
    return this._meanLifeDurationMs
  }

  public getLifePercentage(): number {
    return (Date.now() - this.birthday.valueOf()) / this.meanLifeDurationMs
  }

  public getCurrentTime() {
    const lifePercentage = this.getLifePercentage()
    return LifeClock.getTime(lifePercentage)
  }

  public static getTime(lifePercentage: number) {
    const daysRaw = lifePercentage
    const days = Math.trunc(daysRaw)
    const daysFractional = daysRaw - days

    const hoursRaw = daysFractional * timeConstants.hoursInDay
    const hours = Math.trunc(hoursRaw)
    const hoursFractional = hoursRaw - hours

    const minutesRaw = hoursFractional * timeConstants.minutesInHour
    const minutes = Math.trunc(minutesRaw)
    const minutesFractional = minutesRaw - minutes

    const secondsRaw = minutesFractional * timeConstants.secondsInMinute
    const seconds = Math.trunc(secondsRaw)
    const secondsFractional = secondsRaw - seconds

    return {
      lifePercentage,
      daysRaw,
      days,
      hoursRaw,
      hours,
      hoursFractional,
      minutesRaw,
      minutes,
      minutesFractional,
      secondsRaw,
      seconds,
      secondsFractional,
    }
  }

  public static getAge(meanDeathAge: number, lifePercentage: number) {
    return Math.trunc(meanDeathAge * lifePercentage)
  }

  public getAge() {
    return LifeClock.getAge(this.meanDeathAge, this.getLifePercentage())
  }
}

export default function Home() {
  const clock = useRef(new LifeClock())
  const ClockValues = useMemo(() => {
    const { hours, minutes } = clock.current.getCurrentTime()

    return (
      <Typography variant='h1' fontWeight={700}>
        <span>{formatClockValue(hours)}</span>:<span>{formatClockValue(minutes)}</span>
      </Typography>
    )
  }, [])

  return (
    <Grid2 container height='100vh' justifyContent='center' alignItems='center'>
      {ClockValues}
    </Grid2>
  )
}
