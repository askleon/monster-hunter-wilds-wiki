'use client'
import React from 'react';
import { WeaponTree as WeaponTreeType, WeaponNode } from '@/lib/weapons';
import { WeaponComponent } from './WeaponComponent';
import { WeaponDetails } from './WeaponDetails';
import styles from './WeaponTree.module.css';

interface WeaponTreeProps {
  weaponTree: WeaponTreeType;
  selectedWeapon: WeaponNode | null;
  onWeaponSelect: (weapon: WeaponNode) => void;
}

export function WeaponTree({ weaponTree, selectedWeapon, onWeaponSelect }: WeaponTreeProps) {
  const maxRarity = Math.max(...weaponTree.weapons.map(w => w.rarity));

  const groupWeaponsByTreeAndRarity = (weapons: WeaponNode[]) => {
    return weapons.reduce((acc, weapon) => {
      if (!acc[weapon.treeName]) {
        acc[weapon.treeName] = {};
      }
      if (!acc[weapon.treeName][weapon.rarity]) {
        acc[weapon.treeName][weapon.rarity] = [];
      }
      acc[weapon.treeName][weapon.rarity].push(weapon);
      return acc;
    }, {} as Record<string, Record<number, WeaponNode[]>>);
  };

  const groupedWeapons = groupWeaponsByTreeAndRarity(weaponTree.weapons);

  return (
    <div className={styles.weaponTreeContainer}>
      <h2>{weaponTree.name}</h2>
      <div className={styles.treeAndDetails}>
        <div className={styles.tableWrapper}>
          <table className={styles.weaponTable}>
            <thead>
              <tr>
                <th className={styles.treeHeader}>Tree</th>
                {Array.from({ length: maxRarity }, (_, i) => (
                  <th key={i} className={styles.rarityHeader}>Rarity {i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedWeapons).map(([treeName, rarityGroups]) => (
                <tr key={treeName}>
                  <td className={styles.treeCell} title={treeName}>{treeName}</td>
                  {Array.from({ length: maxRarity }, (_, i) => {
                    const weapons = rarityGroups[i + 1] || [];
                    return (
                      <td key={i} className={styles.rarityCell}>
                        {weapons.map(weapon => (
                          <WeaponComponent
                            key={weapon.id}
                            weapon={weapon}
                            isSelected={selectedWeapon?.id === weapon.id}
                            onClick={() => onWeaponSelect(weapon)}
                            displayMode="tree"
                          />
                        ))}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
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
