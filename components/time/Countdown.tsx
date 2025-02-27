'use client'

import { useEffect, useState } from 'react'
import moment from 'moment-timezone'
import HunterClock from '../spinners/HunterClock'

export default function Countdown() {
  const [countdown, setCountdown] = useState('')
  const [progress, setProgress] = useState(0)

  const endTime = moment.tz('2025-02-28 00:00', 'America/New_York')
  const MAX_DAYS = 10 // Clock goes from 0 to 10 days

  useEffect(() => {
    const timer = setInterval(() => {
      const now = moment()
      const diff = moment.duration(endTime.diff(now))

      if (now.isAfter(endTime)) {
        setCountdown('The hunt has begun!')
        setProgress(100)
        clearInterval(timer)
        return
      }

      // Calculate days left with decimals for smoother movement
      const daysLeft = diff.asDays()

      // Convert remaining days to clock progress (0-100)
      // When 10 days left = 0%, When 0 days left = 100%
      const clockProgress = ((MAX_DAYS - daysLeft) / MAX_DAYS) * 100
      setProgress(Math.min(100, Math.max(0, clockProgress)))

      // Update countdown text
      const days = Math.floor(diff.asDays())
      const hours = diff.hours()
      const minutes = diff.minutes()
      const seconds = diff.seconds()

      let countdownText = ''
      if (days > 0) countdownText += `${days}d `
      if (hours > 0 || days > 0) countdownText += `${hours}h `
      if (minutes > 0 || hours > 0 || days > 0) countdownText += `${minutes}m `
      countdownText += `${seconds}s`

      setCountdown(countdownText)
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return (
    <div className="text-center text-2xl">
      <div className="text-green-400 font-bold">
        {countdown}
      </div>
      <div>
        <HunterClock
          progress={progress}
          size={120}
        />
        {progress < 100 && (
          <div className="font-bold">
            Until the hunt begins!
          </div>
        )}
      </div>
    </div>
  )
}
