'use client'

import { useState, useEffect } from 'react'
import { useTheme } from './ThemeProvider'

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">🌙</button>
  }

  const getThemeIcon = () => {
    switch (theme) {
    case 'light':
      return '🌞'
    case 'dark':
      return '🌙'
    case 'monster-hunter':
      return '🐉'
    default:
      return '💻'
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 monster-hunter:bg-[#584b3d]"
    >
      {getThemeIcon()}
    </button>
  )
}
