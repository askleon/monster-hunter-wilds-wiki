'use client';

import { useState } from 'react';
import { WeaponTree } from '@/app/components/weapons/WeaponTree';
import { WeaponList } from '@/app/components/weapons/WeaponList';
import { getWeaponTreeById, getWeaponTypeInfo, WeaponType } from '@/lib/weapons/weapons';

export default function WeaponTreePage({ params }: { params: { weaponType: string } }) {
  const [viewMode, setViewMode] = useState<'tree' | 'list'>('tree');

  const id = params.weaponType as WeaponType;
  const weaponInfo = getWeaponTypeInfo(id);
  const weaponTree = getWeaponTreeById(id);

  if (!weaponInfo || !weaponTree) {
    return <div>Weapon type not found.</div>;
  }

  const toggleView = () => {
    setViewMode(viewMode === 'tree' ? 'list' : 'tree');
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
          <WeaponTree weaponTree={weaponTree} />
        ) : (
          <WeaponList weaponTree={weaponTree} />
        )}
      </div>
    </div>
  );
}
