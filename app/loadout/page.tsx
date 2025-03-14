'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Loadout } from '@/components/LoadoutBuilder';

export default function LoadoutListPage() {
  const [loadouts, setLoadouts] = useState<Record<string, Loadout>>({});
  const router = useRouter();

  useEffect(() => {
    const storedLoadouts = JSON.parse(localStorage.getItem('loadouts') || '{}');
    setLoadouts(storedLoadouts);
  }, []);

  const handleLoadoutClick = (name: string, loadout: Loadout) => {
    const params = new URLSearchParams();
    params.set('name', name);
    if (loadout.weapon) params.set('weapon', loadout.weapon.slug);
    if (loadout.head) params.set('head', loadout.head.id);
    if (loadout.chest) params.set('chest', loadout.chest.id);
    if (loadout.arms) params.set('arms', loadout.arms.id);
    if (loadout.waist) params.set('waist', loadout.waist.id);
    if (loadout.legs) params.set('legs', loadout.legs.id);
    router.push(`/loadout/edit?${params.toString()}`);
  };

  const handleDeleteLoadout = (name: string) => {
    const updatedLoadouts = { ...loadouts };
    delete updatedLoadouts[name];
    setLoadouts(updatedLoadouts);
    localStorage.setItem('loadouts', JSON.stringify(updatedLoadouts));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Saved Loadouts</h1>

      {Object.entries(loadouts).map(([name, loadout]) => (
        <Card
          key={name}
          title={name}
          className="bg-secondary cursor-pointer hover:bg-opacity-90 transition-colors"
          onClick={() => handleLoadoutClick(name, loadout)}
          description={
            <div>
              <p>Weapon: {loadout.weapon?.name || 'Not selected'}</p>
              <p>Armor: {loadout.head?.name || 'None'}, {loadout.chest?.name || 'None'}, {loadout.arms?.name || 'None'}, {loadout.waist?.name || 'None'}, {loadout.legs?.name || 'None'}</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteLoadout(name);
                  }}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          }
        />
      ))}

      <Link href="/loadout/new" className="block w-full text-center bg-accent text-white py-2 px-4 rounded hover:bg-opacity-90 transition-colors">
        Create New Loadout
      </Link>
    </div>
  );
}
