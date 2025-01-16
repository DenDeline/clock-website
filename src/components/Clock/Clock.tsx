'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Typography } from '@mui/material'

import moment, { Moment } from 'moment'

import { formatClockValue } from '@/utils'

const timeConstants = {
  hoursInDay: 24,
  minutesInHour: 60,
  secondsInMinute: 60,
}

function getTime(lifePercentage: number) {
  const daysRaw = lifePercentage
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

interface ClockProps {
  birthday: Moment
  meanDeathAge: number
}

const Clock: React.FC<ClockProps> = ({ birthday, meanDeathAge }) => {
  const meanDeathDay = useMemo(() => moment(birthday).add(meanDeathAge, 'y'), [birthday, meanDeathAge])
  const meanLifeDurationMs = useMemo(() => meanDeathDay.diff(birthday), [birthday, meanDeathDay])

  const getLifePercentage = useCallback(
    () => moment().diff(birthday) / meanLifeDurationMs,
    [birthday, meanLifeDurationMs],
  )

  const [lifePercentage, setLifePercentage] = useState(getLifePercentage)

  const { hours, minutes } = getTime(lifePercentage)
  const clockHours = formatClockValue(hours)
  const clockMinutes = formatClockValue(minutes)

  const intervalRef = useRef<number>(undefined)
  useEffect(() => {
    setLifePercentage(getLifePercentage())

    intervalRef.current = window.setInterval(() => {
      setLifePercentage(getLifePercentage())
    }, 1000)

    return () => {
      window.clearInterval(intervalRef.current)
    }
  }, [getLifePercentage])

  return (
    <Typography variant='h1' fontWeight={700}>
      <span>{clockHours}</span>:<span>{clockMinutes}</span>
    </Typography>
  )
}

export default Clock
