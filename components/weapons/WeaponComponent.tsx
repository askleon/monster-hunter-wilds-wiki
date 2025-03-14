import React from 'react';
import { Weapon } from '@/lib/weapons';
import { getColorClass } from '@/lib/types';
import styles from './WeaponComponent.module.css';

interface WeaponComponentProps {
  weapon: Weapon;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
  displayMode: 'tree' | 'list';
}

export function WeaponComponent({ weapon, isSelected, onClick, displayMode }: WeaponComponentProps) {
  // Color mapping logic
  let elementTypeForColor = 'none';
  if (weapon.elementType) {
    elementTypeForColor = weapon.elementType.toLowerCase();

    const elementTypeMap: Record<string, string> = {
      'thunder': 'lightning',
      'dragon': 'dragon',
      'fire': 'fire',
      'water': 'water',
      'ice': 'ice',
      'poison': 'poison',
      'paralysis': 'paralysis',
      'sleep': 'sleep',
      'blast': 'blast',
    };

    elementTypeForColor = elementTypeMap[elementTypeForColor] || elementTypeForColor;
  }

  const colorClass = getColorClass(elementTypeForColor);
  const tooltipText = `${weapon.name}${weapon.elementType ? ` - ${weapon.elementType} ${weapon.elementValue}` : ''}`;

  const handleClick = (e: React.MouseEvent) => {
    // Stop event from propagating to parent elements
    e.stopPropagation();
    // Call the provided click handler with this event
    onClick(e);
  };

  return (
    <div
      className={`${styles.weaponComponent} ${styles[displayMode]} ${isSelected ? styles.selected : ''}`}
      onClick={handleClick}
      title={tooltipText}
    >
      <span className={styles.weaponName}>{weapon.name}</span>
      {weapon.elementType && weapon.elementValue && (
        <span className={`${styles.elementIndicator} ${colorClass}`}></span>
      )}
    </div>
  );
}
