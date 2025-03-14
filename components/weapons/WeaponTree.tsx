'use client'
import React from 'react';
import { Weapon, weaponTrees } from '@/lib/weapons';
import { WeaponComponent } from './WeaponComponent';
import { WeaponDetails } from './WeaponDetails';
import styles from './WeaponTree.module.css';

interface WeaponTreeProps {
  weapons: Weapon[];
  selectedWeapon: Weapon | null;
  onWeaponSelect: (weapon: Weapon) => void;
}

export function WeaponTree({ weapons, selectedWeapon, onWeaponSelect }: WeaponTreeProps) {
  const maxRarity = Math.max(...weapons.map(w => w.rarity));

  const weaponsByTree: Record<string, Weapon[]> = {};
  const trees = weaponTrees.filter(tree => tree.type === weapons[0].type);
  trees.forEach(tree => {
    weaponsByTree[tree.tree] = weapons.filter(w => w.tree === tree.tree);
  });

  // Get the weapon type from the first weapon (all weapons in the list should be the same type)
  const weaponType = weapons.length > 0 ? weapons[0].type : '';

  // Create a map of tree orders
  const treeOrderMap: Record<string, number> = {};
  weaponTrees.forEach(tree => {
    if (tree.type === weaponType) {
      treeOrderMap[tree.tree] = tree.order;
    }
  });

  // Sort tree names based on the order defined in weaponTrees
  const sortedTreeNames = Object.keys(weaponsByTree).sort((a, b) => {
    const orderA = treeOrderMap[a] ?? 999;
    const orderB = treeOrderMap[b] ?? 999;
    return orderA - orderB;
  });

  const handleWeaponClick = (weapon: Weapon, e: React.MouseEvent) => {
    // Stop propagation to prevent the event from bubbling up
    e.stopPropagation();
    // Set the selected weapon immediately
    onWeaponSelect(weapon);
  };

  return (
    <div className={styles.weaponTreeContainer}>
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
              {sortedTreeNames.map(treeName => (
                <tr key={`tree-${treeName}`}>
                  <td className={styles.treeCell} title={treeName}>{treeName}</td>
                  {Array.from({ length: maxRarity }, (_, rarityIndex) => {
                    const rarity = rarityIndex + 1;
                    const weaponsInCell = weaponsByTree[treeName].filter(w => w.rarity === rarity);

                    return (
                      <td key={`${treeName}-rarity-${rarity}`} className={styles.rarityCell}>
                        {weaponsInCell.map(weapon => (
                          <WeaponComponent
                            key={`weapon-${weapon.slug}`}
                            weapon={weapon}
                            isSelected={selectedWeapon?.slug === weapon.slug}
                            onClick={(e) => handleWeaponClick(weapon, e)}
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
