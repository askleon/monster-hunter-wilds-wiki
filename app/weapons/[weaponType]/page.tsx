'use client';

import { useState, useEffect } from 'react';
import { WeaponTree } from '@/components/weapons/WeaponTree';
import { WeaponList } from '@/components/weapons/WeaponList';
import { getWeaponTreeById, getWeaponTypeInfo, WeaponType, WeaponNode } from '@/lib/weapons';
import { useRouter } from 'next/navigation';

export default function WeaponTreePage({ params }: { params: { weaponType: string } }) {
  const [viewMode, setViewMode] = useState<'tree' | 'list'>('tree');
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponNode | null>(null);
  const router = useRouter();

  const id = params.weaponType as WeaponType;
  const weaponInfo = getWeaponTypeInfo(id);
  const weaponTree = getWeaponTreeById(id);

  useEffect(() => {
    if (typeof window !== 'undefined' && weaponTree) {
      const hash = window.location.hash.slice(1);
      const weapon = weaponTree.weapons.find(w => w.id.toLowerCase() === hash.toLowerCase());
      if (weapon) {
        setSelectedWeapon(weapon);
      }
    }
  }, [weaponTree]);

  if (!weaponInfo || !weaponTree) {
    return <div>Weapon type not found.</div>;
  }

  const toggleView = () => {
    setViewMode(viewMode === 'tree' ? 'list' : 'tree');
  };

  const handleWeaponSelect = (weapon: WeaponNode) => {
    setSelectedWeapon(weapon);
    router.push(`/weapons/${id}#${weapon.id.toLowerCase()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center p-4 bg-background">
        <h1 className="text-3xl font-bold text-primary">{weaponInfo.name}</h1>
        <button
          onClick={toggleView}
          className="px-4 py-2 bg-secondary text-primary rounded hover:bg-primary hover:text-secondary transition-colors"
        >
          Switch to {viewMode === 'tree' ? 'List' : 'Tree'} View
        </button>
      </div>
      <div className="flex-grow overflow-auto p-4">
        {viewMode === 'tree' ? (
          <WeaponTree weaponTree={weaponTree} selectedWeapon={selectedWeapon} onWeaponSelect={handleWeaponSelect} />
        ) : (
          <WeaponList weaponTree={weaponTree} selectedWeapon={selectedWeapon} onWeaponSelect={handleWeaponSelect} />
        )}
      </div>
    </div>
  );
}
