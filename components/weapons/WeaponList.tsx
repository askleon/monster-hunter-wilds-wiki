import React, { useCallback } from 'react';
import { Weapon, weaponTrees } from '@/lib/weapons';
import { WeaponComponent } from './WeaponComponent';
import { WeaponDetails } from './WeaponDetails';
import styles from './WeaponList.module.css';

interface WeaponListProps {
  weapons: Weapon[];
  selectedWeapon: Weapon | null;
  onWeaponSelect: (weapon: Weapon) => void;
}

export function WeaponList({ weapons, selectedWeapon, onWeaponSelect }: WeaponListProps) {
  // Group weapons by tree
  const groupedWeapons: Record<string, Weapon[]> = {};
  weapons.forEach(weapon => {
    if (!groupedWeapons[weapon.tree]) {
      groupedWeapons[weapon.tree] = [];
    }
    groupedWeapons[weapon.tree].push(weapon);
  });

  // Sort each group by rarity
  Object.keys(groupedWeapons).forEach(tree => {
    groupedWeapons[tree].sort((a, b) => a.rarity - b.rarity);
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
  const sortedTreeNames = Object.keys(groupedWeapons).sort((a, b) => {
    const orderA = treeOrderMap[a] ?? 999;
    const orderB = treeOrderMap[b] ?? 999;
    return orderA - orderB;
  });

  // Create a memoized handler for weapon selection
  const handleWeaponClick = useCallback((weapon: Weapon, e: React.MouseEvent) => {
    // Stop propagation to prevent the event from bubbling up
    e.stopPropagation();
    // Set the selected weapon immediately
    onWeaponSelect(weapon);
  }, [onWeaponSelect]);

  return (
    <div className={styles.weaponListContainer}>
      <div className={styles.listAndDetails}>
        <div className={styles.weaponList}>
          {sortedTreeNames.map(treeName => (
            <div key={`tree-${treeName}`} className={styles.treeSection}>
              <h3 className={styles.treeName}>{treeName}</h3>
              <ul className={styles.weaponsList}>
                {groupedWeapons[treeName].map(weapon => (
                  <li key={`weapon-${weapon.slug}`} className={styles.weaponItem}>
                    <WeaponComponent
                      weapon={weapon}
                      isSelected={selectedWeapon?.slug === weapon.slug}
                      onClick={(e) => handleWeaponClick(weapon, e)}
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
