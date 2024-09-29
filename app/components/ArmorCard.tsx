import React from 'react';
import Link from 'next/link';
import { ArmorSet } from '@/lib/armors';

interface ArmorCardProps {
  armorSet: ArmorSet;
}

export function ArmorCard({ armorSet }: ArmorCardProps) {
  const pieceTypes = ['Head', 'Chest', 'Arms', 'Waist', 'Legs'] as const;

  const getSetBonus = () => {
    const setBonusSkill = armorSet.pieces[0].skills.find(skill => skill.name.includes('Mastery'));
    return setBonusSkill ? setBonusSkill.name : null;
  };

  return (
    <Link href={`/armor/${armorSet.id}`} className="block p-4 border-color rounded-lg hover:shadow-color transition-shadow bg-secondary">
      <h3 className="text-lg font-semibold mb-2 text-primary">{armorSet.name}</h3>
      <div className="grid grid-cols-5 gap-2 mb-2">
        {pieceTypes.map(type => {
          const piece = armorSet.pieces.find(p => p.type === type);
          return (
            <div key={type} className={`text-center ${piece ? 'text-accent' : 'text-secondary'}`}>
              {type.charAt(0)}
            </div>
          );
        })}
      </div>
      <p className="text-sm text-primary">Rarity: {armorSet.pieces[0]?.rarity}</p>
      {getSetBonus() && (
        <p className="mt-2 text-sm text-primary">Set Bonus: {getSetBonus()}</p>
      )}
    </Link>
  );
}
