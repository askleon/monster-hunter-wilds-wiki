import React from 'react';
import { ArmorSet } from '@/lib/armors';
import { ElementType, getColorClass } from '@/lib/types';

export function ArmorDefenseSummary({ armorSet }: { armorSet: ArmorSet }) {
  const totalDefense = armorSet.pieces.reduce((sum, piece) =>
    sum + (piece.defense || 0), 0);

  const elementalResistances = {
    fire: armorSet.pieces.reduce((sum, piece) => sum + piece.fire, 0),
    water: armorSet.pieces.reduce((sum, piece) => sum + piece.water, 0),
    thunder: armorSet.pieces.reduce((sum, piece) => sum + piece.thunder, 0),
    ice: armorSet.pieces.reduce((sum, piece) => sum + piece.ice, 0),
    dragon: armorSet.pieces.reduce((sum, piece) => sum + piece.dragon, 0),
  };

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
          {Object.entries(elementalResistances).map(([element, value]) => (
            <li key={element} className="flex justify-between">
              <span className="text-primary">
                {element.charAt(0).toUpperCase() + element.slice(1)}
              </span>
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
