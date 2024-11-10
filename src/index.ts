import './index.css'

import { addYearsToDate, formatClockValue, easings } from '@/utils'

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

function main() {
  const timerNode = document.getElementById('timer')

  if (!timerNode) {
    return
  }

  const lifeClock = new LifeClock()

  const lifePercentage = lifeClock.getLifePercentage()

  let zero: number | null = null
  const durationMs = 10000

  const watchAppearAnimation: FrameRequestCallback = (timestamp: number) => {
    if (!zero) {
      zero = timestamp
    }

    const elapsedMs = timestamp - zero
    if (elapsedMs > durationMs) {
      return
    }

    const persAnimation = elapsedMs / durationMs

    const lifePercentageAnimation = lifePercentage * easings.easeInOutExpo(persAnimation)
    const { hours, minutes } = LifeClock.getTime(lifePercentageAnimation)
    const age = LifeClock.getAge(lifeClock.meanDeathAge, lifePercentageAnimation)

    timerNode.innerHTML = formatClockValue(hours) + ':' + formatClockValue(minutes) + ' ' + age

    requestAnimationFrame(watchAppearAnimation)
  }

  requestAnimationFrame(watchAppearAnimation)

  const watchAnimation = (displayDots = true) => {
    const { hours, minutes } = lifeClock.getCurrentTime()
    const age = lifeClock.getAge()

    const separator = `<span style="visibility: ${displayDots ? 'visible' : 'hidden'}">:</span>`

    timerNode.innerHTML = formatClockValue(hours) + separator + formatClockValue(minutes) + ' ' + age
    setTimeout(() => watchAnimation(!displayDots), 1000)
  }

  watchAnimation()
}

main()
