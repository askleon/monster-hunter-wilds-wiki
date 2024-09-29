import React from 'react';
import { WeaponNode, WeaponTree } from '@/lib/weapons';
import styles from './WeaponList.module.css';

interface WeaponListProps {
  weaponTree: WeaponTree;
}

export function WeaponList({ weaponTree }: WeaponListProps) {
  const getAllWeapons = (node: WeaponNode): WeaponNode[] => {
    let weapons = [node];
    if (node.upgrade) {
      weapons = weapons.concat(getAllWeapons(node.upgrade));
    }
    if (node.branches) {
      node.branches.forEach(branch => {
        weapons = weapons.concat(getAllWeapons(branch));
      });
    }
    return weapons;
  };

  const allWeapons = weaponTree.baseWeapons.flatMap(getAllWeapons);

  return (
    <div className={styles.weaponListContainer}>
      <h2 className={styles.title}>{weaponTree.name} Weapons</h2>
      <ul className={styles.weaponList}>
        {allWeapons.map((weapon) => (
          <li key={weapon.id} className={styles.weaponItem}>
            <h3 className={styles.weaponName}>{weapon.name}</h3>
            <p className={styles.weaponDescription}>{weapon.description}</p>
            <div className={styles.weaponStats}>
              <p>Attack: {weapon.stats.attack}</p>
              <p>Affinity: {weapon.stats.affinity}%</p>
              {weapon.stats.element && (
                <p>{weapon.stats.element.type}: {weapon.stats.element.value}</p>
              )}
              {weapon.stats.status && (
                <p>{weapon.stats.status.type}: {weapon.stats.status.value}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
