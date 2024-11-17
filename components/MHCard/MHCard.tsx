'use client'

import React, { ReactNode } from 'react'
import styles from './MHCard.module.css'

type TitleVariant = 'main' | 'highlight' | 'info' | 'white' | 'gray'

interface MHCardProps {
  title: ReactNode
  titleVariant?: TitleVariant
  children: ReactNode
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
      {/* Corner decorations remain the same */}
      <div className={styles.cornerTL}>
        <div className={styles.horizontalLine} />
        <div className={styles.verticalLine} />
      </div>
      <div className={styles.cornerBR}>
        <div className={styles.horizontalLine} />
        <div className={styles.verticalLine} />
      </div>
      
      <div className={styles.contentContainer}>
        {/* Title can now be any React node */}
        <div className={`${styles.title} ${titleClasses[titleVariant]}`}>
          {title}
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
}