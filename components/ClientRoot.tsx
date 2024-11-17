'use client'

import { ThemeProvider, useTheme } from '@/components/ThemeProvider'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer'

interface PageBackgroundProps {
  pattern?: boolean
  image?: string
  children: React.ReactNode
}

function PageBackground({ pattern, image, children }: PageBackgroundProps) {
  const backgroundClasses = [
    'min-h-screen w-full',
    pattern ? 'mh-background-pattern' : '',
    image ? 'bg-cover bg-center bg-no-repeat' : '',
  ].filter(Boolean).join(' ')

  const style = image ? { backgroundImage: `url(${image})` } : undefined

  return (
    <div className={backgroundClasses} style={style}>
      {children}
    </div>
  )
}

function ThemedContent({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  
  return (
    <div className={`${theme} flex flex-col min-h-screen`}>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PageBackground pattern>
        <ThemedContent>{children}</ThemedContent>
      </PageBackground>
    </ThemeProvider>
  )
}
