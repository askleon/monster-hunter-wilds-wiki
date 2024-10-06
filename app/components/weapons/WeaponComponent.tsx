import React from 'react';
import { WeaponNode } from '@/lib/weapons/weapons';
import { getColorClass } from '@/lib/types';
import styles from './WeaponComponent.module.css';

interface WeaponComponentProps {
  weapon: WeaponNode;
  isSelected: boolean;
  onClick: () => void;
  displayMode: 'tree' | 'list';
}

export function WeaponComponent({ weapon, isSelected, onClick, displayMode }: WeaponComponentProps) {
  const colorClass = weapon.elementOrStatus ? getColorClass(weapon.elementOrStatus.type) : getColorClass('none');

  return (
    <div
      className={`${styles.weaponComponent} ${styles[displayMode]} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      title={`${weapon.name}${weapon.elementOrStatus ? ` - ${weapon.elementOrStatus.type} ${weapon.elementOrStatus.value}` : ''}`}
    >
      <span className={styles.weaponName}>{weapon.name}</span>
      {displayMode === 'list' && (
        <span className={styles.weaponRarity}>R{weapon.rarity}</span>
      )}
      {weapon.elementOrStatus && (
        <span className={`${styles.elementIndicator} ${colorClass}`}></span>
      )}
      {weapon.canBuildDirectly && <span className={styles.directBuild}>*</span>}
    </div>
  );
}
