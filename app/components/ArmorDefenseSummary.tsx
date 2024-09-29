import React from 'react';
import { ArmorSet } from '@/lib/armors';
import { ElementType, getColorClass } from '@/lib/types';

export function ArmorDefenseSummary({ armorSet }: { armorSet: ArmorSet }) {
  const totalDefense = armorSet.pieces.reduce((sum, piece) => sum + piece.defense, 0);
  const totalResistances = armorSet.pieces.reduce((acc, piece) => {
    Object.entries(piece.resistances).forEach(([element, value]) => {
      acc[element as ElementType] = (acc[element as ElementType] || 0) + value;
    });
    return acc;
  }, {} as Record<ElementType, number>);

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between font-semibold text-primary mb-2">
          <span>Stat</span>
          <span>Value</span>
        </div>
        <div className="flex justify-between text-primary">
          <span>Total Defense</span>
          <span>{totalDefense}</span>
        </div>
      </div>
      <div>
        <div className="flex justify-between font-semibold text-primary mb-2">
          <span>Element</span>
          <span>Resistance</span>
        </div>
        <ul className="space-y-1">
          {Object.entries(totalResistances).map(([element, value]) => (
            <li key={element} className="flex justify-between">
              <span className="text-primary">{element.charAt(0).toUpperCase() + element.slice(1)}</span>
              <span className={`${getColorClass(element as ElementType)} ${value > 0 ? 'font-bold' : ''}`}>
                {value > 0 ? '+' : ''}{value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
