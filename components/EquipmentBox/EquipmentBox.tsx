'use client'

import React from 'react'
import Image from 'next/image'
import styles from './EquipmentBox.module.css'

interface EquipmentBoxProps {
  imageUrl: string
  rarity?: number // 1-10 typically in MH games
  isSelected?: boolean
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export function EquipmentBox({ 
  imageUrl, 
  rarity = 1,
  isSelected = false,
  onClick,
  disabled = false,
  className = ''
}: EquipmentBoxProps) {
  return (
    <div 
      className={`
        ${styles.equipmentBox} 
        ${isSelected ? styles.selected : ''} 
        ${disabled ? styles.disabled : ''} 
        ${className}
      `}
      onClick={!disabled ? onClick : undefined}
      data-rarity={rarity}
    >
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt="Equipment"
          width={64}
          height={64}
          className={styles.image}
        />
      </div>
      <div className={styles.rarityBorder} />
    </div>
  )
} 