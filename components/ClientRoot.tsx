'use client'

import { ThemeProvider, useTheme } from '@/components/ThemeProvider'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer'

function ThemedContent({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  return (
    <div className={`flex flex-col min-h-screen ${theme}`}>
      <Header />
      <div className=''>NOTICE: Under development. Data not final.</div>
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
