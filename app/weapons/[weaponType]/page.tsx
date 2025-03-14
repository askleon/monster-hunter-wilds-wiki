'use client';

import { useState, useEffect } from 'react';
import { WeaponTree } from '@/components/weapons/WeaponTree';
import { WeaponList } from '@/components/weapons/WeaponList';
import { weapons, weaponTypes, Weapon } from '@/lib/weapons';

export default function WeaponTypePage({ params }: { params: { weaponType: string } }) {
  const [viewMode, setViewMode] = useState<'tree' | 'list'>('tree');
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);

  const weaponTypeId = params.weaponType;
  const filteredWeapons = weapons.filter(w => w.type.toLowerCase() === weaponTypeId.toLowerCase());
  const weaponType = weaponTypes.find(type => type.id.toLowerCase() === weaponTypeId.toLowerCase());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const weapon = filteredWeapons.find(w => w.slug?.toLowerCase() === hash.toLowerCase());
        if (weapon) {
          setSelectedWeapon(weapon);
        }
      }
    }
  }, [filteredWeapons]);

  if (!weaponType || filteredWeapons.length === 0) {
    return <div>Weapon type not found.</div>;
  }

  const toggleView = () => {
    setViewMode(viewMode === 'tree' ? 'list' : 'tree');
  };

  const handleWeaponSelect = (weapon: Weapon) => {
    // First update the state
    setSelectedWeapon(weapon);

    // Then update the URL (if needed)
    if (weapon.slug) {
      // Use a timeout to ensure the state update happens first
      setTimeout(() => {
        window.history.replaceState(
          null,
          '',
          `/weapons/${weaponTypeId}#${weapon.slug?.toLowerCase() ?? ''}`
        );
      }, 0);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center p-4 bg-background">
        <h1 className="text-3xl font-bold text-primary">{weaponType.name}</h1>
        <button
          onClick={toggleView}
          className="px-4 py-2 bg-secondary text-primary rounded hover:bg-primary hover:text-secondary transition-colors"
        >
          Switch to {viewMode === 'tree' ? 'List' : 'Tree'} View
        </button>
      </div>
      <div className="flex-grow overflow-auto p-4">
        {viewMode === 'tree' ? (
          <WeaponTree
            weapons={filteredWeapons}
            selectedWeapon={selectedWeapon}
            onWeaponSelect={handleWeaponSelect}
          />
        ) : (
          <WeaponList
            weapons={filteredWeapons}
            selectedWeapon={selectedWeapon}
            onWeaponSelect={handleWeaponSelect}
          />
        )}
      </div>
    </div>
  );
}
