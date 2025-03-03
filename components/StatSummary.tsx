import React from 'react';
import { Loadout } from './LoadoutBuilder';
import { getColorClass } from '@/lib/types';
import { SharpnessBar } from './weapons/SharpnessBar';

interface StatSummaryProps {
  loadout: Loadout;
}

export function StatSummary({ loadout }: StatSummaryProps) {
  const armorPieces = [loadout.head, loadout.chest, loadout.arms, loadout.waist, loadout.legs];

  const totalDefense = armorPieces.reduce((sum, piece) => sum + (piece?.defense || 0), 0);

  const elementalResistances = {
    fire: armorPieces.reduce((sum, piece) => sum + (piece?.fire || 0), 0),
    water: armorPieces.reduce((sum, piece) => sum + (piece?.water || 0), 0),
    thunder: armorPieces.reduce((sum, piece) => sum + (piece?.thunder || 0), 0),
    ice: armorPieces.reduce((sum, piece) => sum + (piece?.ice || 0), 0),
    dragon: armorPieces.reduce((sum, piece) => sum + (piece?.dragon || 0), 0),
  };

  const renderResistance = (value: number) => {
    const color = value >= 0 ? 'text-green-500' : 'text-red-500';
    const sign = value >= 0 ? '+' : '';
    return <span className={color}>{sign}{value}</span>;
  };

  return (
    <div className="bg-secondary p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Stats Summary</h3>
      <div className="flex">
        <div className="flex-1 pr-4">
          <h4 className="font-semibold mb-1">Weapon Stats</h4>
          <ul className="space-y-1">
            <li className="flex justify-between">
              <span>Attack:</span>
              <span>{loadout.weapon?.attack || 0}</span>
            </li>
            <li className="flex justify-between">
              <span>Element/Status:</span>
              <span className={loadout.weapon?.elementOrStatus ? getColorClass(loadout.weapon.elementOrStatus.type) : ''}>
                {loadout.weapon?.elementOrStatus
                  ? `${loadout.weapon.elementOrStatus.type} (${loadout.weapon.elementOrStatus.value})`
                  : 'None'}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Affinity:</span>
              <span>{loadout.weapon?.affinity || 0}%</span>
            </li>
            <li>
              <span>Sharpness:</span>
              {loadout.weapon?.sharpness && (
                <div className="mt-1">
                  <SharpnessBar sharpness={loadout.weapon.sharpness} />
                </div>
              )}
            </li>
          </ul>
        </div>
        <div className="flex-1 pl-4 border-l border-gray-600">
          <h4 className="font-semibold mb-1">Armor Stats</h4>
          <ul className="space-y-1">
            <li className="flex justify-between">
              <span>Defense:</span>
              <span>{totalDefense}</span>
            </li>
            <li className="flex justify-between">
              <span>Fire Res:</span>
              {renderResistance(elementalResistances.fire)}
            </li>
            <li className="flex justify-between">
              <span>Water Res:</span>
              {renderResistance(elementalResistances.water)}
            </li>
            <li className="flex justify-between">
              <span>Thunder Res:</span>
              {renderResistance(elementalResistances.thunder)}
            </li>
            <li className="flex justify-between">
              <span>Ice Res:</span>
              {renderResistance(elementalResistances.ice)}
            </li>
            <li className="flex justify-between">
              <span>Dragon Res:</span>
              {renderResistance(elementalResistances.dragon)}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
