'use client'

import React from 'react';
import { getArmorSetById, ArmorPiece } from '@/lib/armors';
import Link from 'next/link';

const pieceTypes = ['Head', 'Chest', 'Arms', 'Waist', 'Legs'] as const;

function ArmorPieceCard({ piece }: { piece: ArmorPiece | undefined }) {
  if (!piece) {
    return (
      <div className="border rounded-lg shadow-color p-4 bg-secondary">
        <p className="text-sm text-secondary">Not available</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg shadow-color p-4 bg-primary">
      <h3 className="text-lg font-semibold mb-2 text-primary">{piece.name}</h3>
      <p className="text-primary">Defense: {piece.defense}</p>
      <div className="mt-2">
        <h4 className="font-semibold text-primary">Resistances:</h4>
        <ul className="grid grid-cols-2 gap-x-2">
          {Object.entries(piece.resistances).map(([element, value]) => (
            <li key={element} className={value > 0 ? 'text-accent' : value < 0 ? 'text-secondary' : 'text-primary'}>
              {element.charAt(0).toUpperCase() + element.slice(1)}: {value}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-2">
        <h4 className="font-semibold text-primary">Skills:</h4>
        <ul>
          {piece.skills.map((skill, index) => (
            <li key={index} className="text-primary">{skill.name} Lv. {skill.level}</li>
          ))}
        </ul>
      </div>
      <div className="mt-2">
        <h4 className="font-semibold text-primary">Materials:</h4>
        <ul>
          {piece.materials.map((material, index) => (
            <li key={index} className="text-primary">{material.name} x{material.quantity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ArmorSetPage({ params }: { params: { setId: string } }) {
  const armorSet = getArmorSetById(params.setId);

  if (!armorSet) {
    return <div className="container mx-auto p-4 text-primary">Armor set not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/armors" className="text-accent hover:underline mb-4 inline-block">
        &larr; Back to All Armor Sets
      </Link>
      <h1 className="text-3xl font-bold mb-4 text-primary">{armorSet.name}</h1>
      <div className="flex items-center mb-4">
        <p className="text-lg text-primary mr-4">Rarity: {armorSet.tier}</p>
      </div>
      {armorSet.bonus && (
        <div className="mb-6 p-4 bg-secondary rounded-lg">
          <h2 className="text-xl font-semibold text-primary">Set Bonus: {armorSet.bonus.name}</h2>
          <p className="text-sm text-secondary">{armorSet.bonus.description}</p>
          <p className="mt-2 text-primary">Required pieces: {armorSet.bonus.requiredPieces}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {pieceTypes.map(type => (
          <ArmorPieceCard key={type} piece={armorSet.pieces.find(p => p.type === type)} />
        ))}
      </div>
    </div>
  );
}
