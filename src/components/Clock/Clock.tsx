'use client'

import { convertPercentageToTime, formatClockValue } from '@/utils/clock'
import { Typography } from '@mui/material'
import dayjs, { type Dayjs } from 'dayjs'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface ClockProps {
  startDate: Dayjs
  endDate: Dayjs
}

function Clock({ startDate, endDate }: ClockProps) {
  const durationMs = useMemo(
    () => endDate.diff(startDate),
    [endDate, startDate],
  )

  const getLifePercentage = useCallback(() => {
    const now = dayjs()

    if (startDate.isAfter(now)) {
      return 0
    }

    return now.diff(startDate) / durationMs
  }, [startDate, durationMs])

  const [lifePercentage, setLifePercentage] = useState(getLifePercentage)
  const [displayDots, setDisplayDots] = useState(true)

  const { hours, minutes } = convertPercentageToTime(lifePercentage)
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
