'use client'

import { useEffect, useState } from 'react'
import { ThemeProvider, useTheme } from '@/components/ThemeProvider'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer'
import SearchDialog from '@/components/dialog/Search'

function ThemedContent({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for CMD+K (Mac) or CTRL+K (Windows)
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className={`flex flex-col min-h-screen ${theme}`}>
      <Header />
      <div className="py-2 px-4 text-center font-medium border-b w-full">
        <span className="inline-flex items-center gap-1">
          NOTICE: Under development. Data not final.
        </span>
      </div>
      <main className="container mx-auto flex-grow p-4">{children}</main>
      <Footer />
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
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
