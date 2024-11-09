import './index.css'

import { addYearsToDate, formatClockValue } from '@/utils'

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

  public calculateLifeDelta(fraction = 1): number {
    return fraction * (this.meanDeathDay.valueOf() - this.birthday.valueOf())
  }

  public get meanLifeDurationMs(): number {
    if (!this._meanLifeDurationMs) {
      this._meanLifeDurationMs = this.calculateLifeDelta()
    }
    return this._meanLifeDurationMs
  }

  public getLifePercentage(): number {
    return (Date.now() - this.birthday.valueOf()) / this.meanLifeDurationMs
  }

  public getTime() {
    const lifePercentage = this.getLifePercentage()

    const daysRaw = lifePercentage
    const days = Math.trunc(daysRaw)
    const daysFractional = daysRaw - days

    const hoursInDay = 24
    const hoursRaw = daysFractional * hoursInDay
    const hours = Math.trunc(hoursRaw)
    const hoursFractional = hoursRaw - hours

    const minutesInHour = 60
    const minutesRaw = hoursFractional * minutesInHour
    const minutes = Math.trunc(minutesRaw)
    const minutesFractional = minutesRaw - minutes

    const secondsInMinute = 60
    const secondsRaw = minutesFractional * secondsInMinute
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

  public getAge() {
    const ageDifMs = Date.now() - this.birthday.valueOf()
    const ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }
}

function main() {
  const timerNode = document.getElementById('timer')

  if (!timerNode) {
    return
  }

  const lifeClock = new LifeClock()

  const watchAnimation = (displayDots = true) => {
    const { hours, minutes } = lifeClock.getTime()
    const separator = `<span style="visibility: ${displayDots ? 'visible' : 'hidden'}">:</span>`

    timerNode.innerHTML = formatClockValue(hours) + separator + formatClockValue(minutes)
    setTimeout(() => watchAnimation(!displayDots), 1000)
  }

  watchAnimation()
}

main()
