'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Theme = 'light' | 'dark' | 'monster-hunter'

const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
    }>({
      theme: 'light',
      toggleTheme: () => {},
    })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null
    
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // If no saved theme, check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      // Remove all theme classes first
      document.documentElement.classList.remove('light', 'dark', 'monster-hunter')
      // Add new theme class
      document.documentElement.classList.add(theme)
      // Store in localStorage
      localStorage.setItem('theme', theme)
      // Force a repaint using void operator
      document.documentElement.style.display = 'none'
      void document.documentElement.offsetHeight
      document.documentElement.style.display = ''
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prevTheme => {
      switch (prevTheme) {
      case 'light':
        return 'dark'
      case 'dark':
        return 'monster-hunter'
      case 'monster-hunter':
        return 'light'
      default:
        return 'light'
      }
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
