import React from 'react';
import { Weapon } from '@/lib/weapons';
import { getColorClass } from '@/lib/types';
// import { SharpnessBar } from './SharpnessBar';
import styles from './WeaponDetails.module.css';

interface WeaponDetailsProps {
  weapon: Weapon;
}

export function WeaponDetails({ weapon }: WeaponDetailsProps) {
  // Element type color mapping
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

  return (
    <div className={styles.weaponDetails}>
      <h3>{weapon.name}</h3>
      <p>Rarity: {weapon.rarity}</p>
      <p>Attack: {weapon.attack}</p>

      {/* <SharpnessBar sharpness={(weapon as any).sharpness} /> */}

      {/* Element/status display */}
      {weapon.elementType && weapon.elementValue && (
        <p className={getColorClass(elementTypeForColor)}>
          {weapon.elementType.charAt(0).toUpperCase() + weapon.elementType.slice(1)}: {weapon.elementValue}
        </p>
      )}

      {weapon.affinity !== undefined && <p>Affinity: {weapon.affinity}%</p>}
      {weapon.defenseBonus !== undefined && <p>Defense bonus: {weapon.defenseBonus}</p>}

      {/* Conditionally render slots if they exist */}
      {/* {(weapon as any).slots && <p>Slots: {(weapon as any).slots.map((slot: any) => `${slot}`).join(', ')}</p>} */}

      {/* Materials section */}
      {weapon.materials && weapon.materials.length > 0 && (
        <div className={styles.creationMethods}>
          <h4>Required Materials:</h4>
          <ul className={styles.materialsList}>
            {weapon.materials.map((material, index) => (
              <li key={index}>{material.material} x{material.quantity}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Skills section */}
      {weapon.skills && weapon.skills.length > 0 && (
        <div className={styles.skillsSection}>
          <h4>Skills:</h4>
          <ul className={styles.skillsList}>
            {weapon.skills.map((skill, index) => (
              <li key={index}>{skill.skill} Lv.{skill.level}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
