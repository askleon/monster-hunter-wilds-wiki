'use client'

import React from 'react';
import Link from 'next/link';
import { getAllArmorSets } from '@/lib/armors';

export default function ArmorsPage() {
  const armorSets = getAllArmorSets();
  const pieceTypes = ['Head', 'Chest', 'Arms', 'Waist', 'Legs'] as const;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Armor Sets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {armorSets.map(set => (
          <Link href={`/armors/${set.id}`} key={set.id} className="block">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{set.name}</h2>
              <div className="flex justify-between mb-2">
                {pieceTypes.map(type => {
                  const piece = set.pieces.find(p => p.type === type);
                  return (
                    <div key={type} className="text-center w-10 flex flex-col items-center">
                      <div className="relative w-6 h-6 flex items-center justify-center">
                        <span className={`font-semibold ${!piece ? 'opacity-30' : ''}`}>{type[0]}</span>
                        {!piece && (
                          <span className="absolute inset-0 flex items-center justify-center text-red-500 font-bold">
                            X
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              {set.bonus && (
                <p className="text-sm text-gray-600 mt-2">
                  Set Bonus: {set.bonus.name} ({set.bonus.requiredPieces} pieces)
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
