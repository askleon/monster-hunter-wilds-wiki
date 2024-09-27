'use client'

import React from 'react';
import { getArmorSetById } from '@/lib/armors';
import Link from 'next/link';

export default function ArmorSetPage({ params }: { params: { setId: string } }) {
  const armorSet = getArmorSetById(params.setId);

  if (!armorSet) {
    return <div>Armor set not found</div>;
  }

  const pieceTypes = ['Head', 'Chest', 'Arms', 'Waist', 'Legs'] as const;

  return (
    <div className="container mx-auto p-4">
      <Link href="/armors" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to All Armor Sets
      </Link>
      <h1 className="text-3xl font-bold mb-4">{armorSet.name}</h1>
      {armorSet.bonus && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Set Bonus</h2>
          <p>{armorSet.bonus.name} ({armorSet.bonus.requiredPieces} pieces required)</p>
          <p className="text-sm text-gray-600">{armorSet.bonus.description}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {pieceTypes.map(type => {
          const piece = armorSet.pieces.find(p => p.type === type);
          return (
            <div key={type} className="border rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">{type}</h3>
              {piece ? (
                <div>
                  <p className="font-medium">{piece.name}</p>
                  <p>Defense: {piece.defense}</p>
                  <p>Rarity: {piece.rarity}</p>
                  <div className="mt-2">
                    <h4 className="font-semibold">Resistances:</h4>
                    <ul className="grid grid-cols-2 gap-x-2">
                      <li>Fire: {piece.resistances.fire}</li>
                      <li>Water: {piece.resistances.water}</li>
                      <li>Thunder: {piece.resistances.thunder}</li>
                      <li>Ice: {piece.resistances.ice}</li>
                      <li>Dragon: {piece.resistances.dragon}</li>
                    </ul>
                  </div>
                  <div className="mt-2">
                    <h4 className="font-semibold">Skills:</h4>
                    <ul>
                      {piece.skills.map((skill, index) => (
                        <li key={index}>{skill.name} Lv. {skill.level}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-2">
                    <h4 className="font-semibold">Materials:</h4>
                    <ul>
                      {piece.materials.map((material, index) => (
                        <li key={index}>{material.name} x{material.quantity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Not available</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
