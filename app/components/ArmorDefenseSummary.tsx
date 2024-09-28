import React from 'react';
import { ArmorSet } from '@/lib/armors';

export function ArmorDefenseSummary({ armorSet }: { armorSet: ArmorSet }) {
  const totalDefense = armorSet.pieces.reduce((sum, piece) => sum + piece.defense, 0);
  const totalResistances = armorSet.pieces.reduce((acc, piece) => {
    Object.entries(piece.resistances).forEach(([element, value]) => {
      acc[element] = (acc[element] || 0) + value;
    });
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <p className="text-primary mb-2">Total Defense: {totalDefense}</p>
      <h4 className="font-semibold text-primary mb-1">Total Resistances:</h4>
      <ul className="grid grid-cols-2 gap-2">
        {Object.entries(totalResistances).map(([element, value]) => (
          <li key={element} className={value > 0 ? 'text-accent' : value < 0 ? 'text-secondary' : 'text-primary'}>
            {element.charAt(0).toUpperCase() + element.slice(1)}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
