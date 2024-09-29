import React from 'react';
import { Loadout } from './LoadoutBuilder';
import { ArmorPiece } from '@/lib/armors';

interface StatSummaryProps {
  loadout: Loadout;
}

export function StatSummary({ loadout }: StatSummaryProps) {
  const calculateTotalDefense = () => {
    return ['head', 'chest', 'arms', 'waist', 'legs'].reduce((total, part) => {
      const piece = loadout[part as keyof Loadout];
      return total + ((piece as ArmorPiece)?.defense || 0);
    }, 0);
  };

  const getElementInfo = () => {
    const element = loadout.weapon?.stats.element;
    return element ? `${element.type} (${element.value})` : 'None';
  };

  const calculateTotalResistances = () => {
    const resistances = { fire: 0, water: 0, thunder: 0, ice: 0, dragon: 0 };
    ['head', 'chest', 'arms', 'waist', 'legs'].forEach((part) => {
      const piece = loadout[part as keyof Loadout] as ArmorPiece;
      if (piece && piece.resistances) {
        Object.entries(piece.resistances).forEach(([key, value]) => {
          resistances[key as keyof typeof resistances] += value;
        });
      }
    });
    return resistances;
  };

  const totalResistances = calculateTotalResistances();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Stat Summary</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2">Weapon Stats</h4>
          <ul className="space-y-1">
            <li className="flex justify-between">
              <span>Attack:</span>
              <span>{loadout.weapon?.stats.attack || 0}</span>
            </li>
            <li className="flex justify-between">
              <span>Element:</span>
              <span>{getElementInfo()}</span>
            </li>
            <li className="flex justify-between">
              <span>Affinity:</span>
              <span>{loadout.weapon?.stats.affinity || 0}%</span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Armor Stats</h4>
          <ul className="space-y-1">
            <li className="flex justify-between">
              <span>Defense:</span>
              <span>{calculateTotalDefense()}</span>
            </li>
            {Object.entries(totalResistances).map(([element, value]) => (
              <li key={element} className="flex justify-between">
                <span>{element.charAt(0).toUpperCase() + element.slice(1)} Res:</span>
                <span className={value > 0 ? 'text-green-500' : value < 0 ? 'text-red-500' : ''}>
                  {value > 0 ? '+' : ''}{value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
