const timeConstants = {
  hoursInDay: 24,
  minutesInHour: 60,
  secondsInMinute: 60,
}

export function convertPercentageToTime(percentage: number) {
  const daysRaw = percentage
  const days = Math.trunc(daysRaw)
  const daysFractional = daysRaw - days

  const hoursRaw = daysFractional * timeConstants.hoursInDay
  const hours = Math.trunc(hoursRaw)
  const hoursFractional = hoursRaw - hours

  const minutesRaw = hoursFractional * timeConstants.minutesInHour
  const minutes = Math.trunc(minutesRaw)

  return {
    days,
    hours,
    minutes,
  }
}

export function formatClockValue(num: number): string {
  return ('0' + num).slice(-2)
}
