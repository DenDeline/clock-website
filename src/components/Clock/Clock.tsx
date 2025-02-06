'use client'

import { convertPercentageToTime, formatClockValue } from '@/utils/clock'
import { Typography } from '@mui/material'
import dayjs, { type Dayjs } from 'dayjs'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface ClockProps {
  birthday: Dayjs
  meanDeathAge: number
}

function Clock({ birthday, meanDeathAge }: ClockProps) {
  const meanLifeDurationMs = useMemo(() => {
    const meanDeathDay = dayjs(birthday).add(meanDeathAge, 'y')
    return meanDeathDay.diff(birthday)
  }, [birthday, meanDeathAge])

  const getLifePercentage = useCallback(
    () => dayjs().diff(birthday) / meanLifeDurationMs,
    [birthday, meanLifeDurationMs],
  )

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
