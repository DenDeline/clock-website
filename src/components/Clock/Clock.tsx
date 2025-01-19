'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Typography } from '@mui/material'

import dayjs, { type Dayjs } from 'dayjs'

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
  birthday: Dayjs
  meanDeathAge: number
}

const Clock: React.FC<ClockProps> = ({ birthday, meanDeathAge }) => {
  const meanDeathDay = useMemo(() => dayjs(birthday).add(meanDeathAge, 'y'), [birthday, meanDeathAge])
  const meanLifeDurationMs = useMemo(() => meanDeathDay.diff(birthday), [birthday, meanDeathDay])

  const getLifePercentage = useCallback(
    () => dayjs().diff(birthday) / meanLifeDurationMs,
    [birthday, meanLifeDurationMs],
  )

  const [lifePercentage, setLifePercentage] = useState(getLifePercentage)
  const [displayDots, setDisplayDots] = useState(true)

  const { hours, minutes } = getTime(lifePercentage)
  const clockHours = formatClockValue(hours)
  const clockMinutes = formatClockValue(minutes)

  const intervalRef = useRef<number>(undefined)
  useEffect(() => {
    setLifePercentage(getLifePercentage())

    intervalRef.current = window.setInterval(() => {
      setLifePercentage(getLifePercentage())
      setDisplayDots((v) => !v)
    }, 1000)

    return () => {
      window.clearInterval(intervalRef.current)
    }
  }, [getLifePercentage])

  return (
    <Typography variant='h1' fontWeight={700}>
      <span>{clockHours}</span>
      <span style={{ visibility: displayDots ? 'visible' : 'hidden' }}>:</span>
      <span>{clockMinutes}</span>
    </Typography>
  )
}

export default Clock
