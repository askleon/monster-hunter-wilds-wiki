import React, { useState } from 'react';
import { WeaponTree, WeaponNode } from '@/lib/weapons/weapons';
import { WeaponComponent } from './WeaponComponent';
import { WeaponDetails } from './WeaponDetails';
import styles from './WeaponList.module.css';

interface WeaponListProps {
  weaponTree: WeaponTree;
}

export function WeaponList({ weaponTree }: WeaponListProps) {
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponNode | null>(null);

  // Group weapons by their treeName
  const groupedWeapons = weaponTree.weapons.reduce((acc, weapon) => {
    if (!acc[weapon.treeName]) {
      acc[weapon.treeName] = [];
    }
    acc[weapon.treeName].push(weapon);
    return acc;
  }, {} as Record<string, WeaponNode[]>);

  return (
    <div className={styles.weaponListContainer}>
      <h2 className={styles.title}>{weaponTree.name} Weapons</h2>
      <div className={styles.listAndDetails}>
        <div className={styles.weaponList}>
          {Object.entries(groupedWeapons).map(([treeName, weapons]) => (
            <div key={treeName} className={styles.treeSection}>
              <h3 className={styles.treeName}>{treeName}</h3>
              <ul>
                {weapons.map(weapon => (
                  <li key={weapon.id}>
                    <WeaponComponent
                      weapon={weapon}
                      isSelected={selectedWeapon?.id === weapon.id}
                      onClick={() => setSelectedWeapon(weapon)}
                      displayMode="list"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.detailsPane}>
          {selectedWeapon ? (
            <WeaponDetails weapon={selectedWeapon} />
          ) : (
            <div className={styles.noWeaponSelected}>Select a weapon to view details</div>
          )}
        </div>
      </div>
    </div>
  );
}
