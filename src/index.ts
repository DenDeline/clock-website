import './index.css'

class LifeClock {
  private _birthday: Date = new Date('2002-08-20T00:00:00.000')
  private _maybeMaxBirthday: Date | null = null
  private _lifeDelta: number | null = null
  private readonly _lifeMeanAge = 76
  private readonly _timerNode: HTMLElement;

  constructor(timerNode: HTMLElement) {
    this._timerNode = timerNode;
  }

  public get birthday(): Date {
    return this._birthday
  }

  // public set birthday(value: Date) {
  //   this._birthday = value
  //   this._maybeMaxBirthday = null
  //   this._lifeDelta = null
  // }

  public get maybeMaxBirthday(): Date {
    if (!this._maybeMaxBirthday) {
      this._maybeMaxBirthday = LifeClock.addYearsToDate(this.birthday, this._lifeMeanAge)
    }
    return this._maybeMaxBirthday
  }

  public calculateLifeDelta (fraction = 1): number {
    return fraction * (this.maybeMaxBirthday.valueOf() - this.birthday.valueOf())
  }

  public get lifeDelta(): number {
    if(!this._lifeDelta) {
      this._lifeDelta = this.calculateLifeDelta()
    }
    return this._lifeDelta
  }

  public getLifePercentage(): number {
    return (Date.now() - this.birthday.valueOf()) / this.lifeDelta
  }

  public getCurrentLifeValues(){
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

    return {
      lifePercentage,
      daysRaw,
      days,
      hoursRaw,
      hours,
      hoursFractional,
      minutesRaw,
      minutes,
      minutesFractional
    }
  }

  public static addYearsToDate(date: Date, yearsOffset: number): Date {
    const newDate = new Date(date)
    newDate.setFullYear(date.getFullYear() + yearsOffset)
    return newDate
  }

  public static formatClockValue(num: number): string {
    return ('0' + num).slice(-2)
  }

  // public getAge  () {
  //   const ageDifMs = Date.now() - this.birthday.valueOf()
  //   const ageDate = new Date(ageDifMs)
  //   return Math.abs(ageDate.getUTCFullYear() - 1970)
  // }

  public watchAnimation (displayDots = true): void {
    const { hours, minutes } = this.getCurrentLifeValues()
    this._timerNode.innerText = LifeClock.formatClockValue(hours) + (displayDots ? ":" : " ") + LifeClock.formatClockValue(minutes)
    setTimeout(() => this.watchAnimation(!displayDots), 1000)
  }
}


function main() {
  const timerNode = document.getElementById('timer')

  if (!timerNode) {
    return
  }

  const lifeClock = new LifeClock(timerNode)
  lifeClock.watchAnimation()
}

main()
