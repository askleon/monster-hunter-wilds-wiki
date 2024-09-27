import React from 'react';
import Link from 'next/link';
import { ArmorSet } from '@/lib/armors';

interface ArmorCardProps {
  armorSet: ArmorSet;
}

export function ArmorCard({ armorSet }: ArmorCardProps) {
  const pieceTypes = ['Head', 'Chest', 'Arms', 'Waist', 'Legs'] as const;

  return (
    <Link href={`/armor/${armorSet.id}`} className="block p-4 border rounded-lg hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold mb-2">{armorSet.name}</h3>
      <div className="grid grid-cols-5 gap-2 mb-2">
        {pieceTypes.map(type => {
          const piece = armorSet.pieces.find(p => p.type === type);
          return (
            <div key={type} className={`text-center ${piece ? 'text-green-600' : 'text-gray-400'}`}>
              {type.charAt(0)}
            </div>
          );
        })}
      </div>
      <p className="text-sm">Rarity: {armorSet.pieces[0]?.rarity}</p>
      {armorSet.bonus && (
        <p className="mt-2 text-sm">Set Bonus: {armorSet.bonus.name}</p>
      )}
    </Link>
  );
}
