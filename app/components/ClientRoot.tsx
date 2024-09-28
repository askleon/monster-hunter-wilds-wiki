'use client'

import { ThemeProvider, useTheme } from './ThemeProvider'
import { Header } from './Header'
import Footer from './Footer'

function ThemedContent({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  return (
    <div className={`flex flex-col min-h-screen ${theme}`}>
      <Header />
      <main className="container mx-auto flex-grow p-4">{children}</main>
      <Footer />
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
