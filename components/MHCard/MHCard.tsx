'use client'

import React from 'react'
import styles from './MHCard.module.css'

type TitleVariant = 'main' | 'highlight' | 'info' | 'white' | 'gray'

interface MHCardProps {
  title: string
  titleVariant?: TitleVariant
  children: React.ReactNode
  className?: string
}

export function MHCard({ 
  title, 
  titleVariant = 'main',
  children,
  className = ''
}: MHCardProps) {
  const titleClasses = {
    main: 'mh-text-main',
    highlight: 'mh-text-highlight',
    info: 'mh-text-info',
    white: 'mh-text-white',
    gray: 'mh-text-gray'
  }

  return (
    <div className={`${styles.card} ${className}`}>
      {/* SVG Border Decorations */}
      <svg className={styles.cornerTL} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 0 L100 0 L0 100 Z" fill="rgba(0,0,0,0.3)" />
      </svg>
      <svg className={styles.cornerTR} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 0 L100 0 L100 100 Z" fill="rgba(0,0,0,0.3)" />
      </svg>
      <svg className={styles.cornerBL} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0 0 L0 100 L100 100 Z" fill="rgba(0,0,0,0.3)" />
      </svg>
      <svg className={styles.cornerBR} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M100 0 L0 100 L100 100 Z" fill="rgba(0,0,0,0.3)" />
      </svg>
      
      {/* Content Container */}
      <div className={styles.contentContainer}>
        <h3 className={`${styles.title} ${titleClasses[titleVariant]}`}>
          {title}
        </h3>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
}