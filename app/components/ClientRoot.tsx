'use client'

import { ThemeProvider, useTheme } from './ThemeProvider'
import { Header } from './Header'

function ThemedContent({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  return (
    <div className={`flex flex-col min-h-screen ${theme}`}>
      <Header />
      <main className="container mx-auto flex-grow p-4">{children}</main>
      <footer className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-4 text-center">
      </footer>
    </div>
  )
}

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ThemedContent>{children}</ThemedContent>
    </ThemeProvider>
  )
}