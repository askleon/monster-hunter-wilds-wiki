import React from 'react';
import { WeaponTree, WeaponNode } from '@/lib/weapons/weapons';
import { WeaponComponent } from './WeaponComponent';
import { WeaponDetails } from './WeaponDetails';
import styles from './WeaponList.module.css';

interface WeaponListProps {
  weaponTree: WeaponTree;
  selectedWeapon: WeaponNode | null;
  onWeaponSelect: (weapon: WeaponNode) => void;
}

export function WeaponList({ weaponTree, selectedWeapon, onWeaponSelect }: WeaponListProps) {
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
      <div className={styles.listAndDetails}>
        <div className={styles.weaponList}>
          {Object.entries(groupedWeapons).map(([treeName, weapons]) => (
            <div key={treeName} className={styles.treeSection}>
              <h3 className={styles.treeName}>{treeName}</h3>
              <ul className={styles.weaponsList}>
                {weapons.map(weapon => (
                  <li key={weapon.id} className={styles.weaponItem}>
                    <WeaponComponent
                      weapon={weapon}
                      isSelected={selectedWeapon?.id === weapon.id}
                      onClick={() => onWeaponSelect(weapon)}
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
