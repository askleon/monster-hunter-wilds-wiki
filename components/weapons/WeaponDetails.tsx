import React from 'react';
import { WeaponNode, Material } from '@/lib/weapons';
import { getColorClass } from '@/lib/types';
import { SharpnessBar } from './SharpnessBar';
import styles from './WeaponDetails.module.css';

interface WeaponDetailsProps {
  weapon: WeaponNode;
}

export function WeaponDetails({ weapon }: WeaponDetailsProps) {
  return (
    <div className={styles.weaponDetails}>
      <h3>{weapon.name}</h3>
      <p>Rarity: {weapon.rarity}</p>
      <p>Attack: {weapon.attack}</p>
      <SharpnessBar sharpness={weapon.sharpness} />
      {weapon.elementOrStatus && (
        <p className={getColorClass(weapon.elementOrStatus.type)}>
          {weapon.elementOrStatus.type.charAt(0).toUpperCase() + weapon.elementOrStatus.type.slice(1)}: {weapon.elementOrStatus.value}
        </p>
      )}
      {weapon.affinity !== undefined && <p>Affinity: {weapon.affinity}%</p>}
      {weapon.defense !== undefined && <p>Defense bonus: {weapon.defense}</p>}
      <p>Slots: {weapon.slots.map(slot => `${slot}`).join(', ')}</p>

      <div className={styles.creationMethods}>
        {weapon.upgradedFrom && (
          <div className={styles.upgradePath}>
            <h4>Upgrade from: {weapon.upgradedFrom}</h4>
            <MaterialsList materials={weapon.creationMaterials.upgrade || []} />
          </div>
        )}

        {weapon.canBuildDirectly && weapon.creationMaterials.craft && (
          <div className={styles.craftPath}>
            <h4>Craft Directly:</h4>
            <MaterialsList materials={weapon.creationMaterials.craft} />
          </div>
        )}
      </div>
    </div>
  );
}

interface MaterialsListProps {
  materials: Material[];
}

function MaterialsList({ materials }: MaterialsListProps) {
  return (
    <ul className={styles.materialsList}>
      {materials.map((material, index) => (
        <li key={index}>{material.name} x{material.quantity}</li>
      ))}
    </ul>
  );
}
