'use client'

import React from 'react';
import { getArmorSet, ArmorPiece } from '@/lib/armors';
import Link from 'next/link';
import { ArmorSkillSummary } from '@/components/armors/ArmorSkillSummary';
import { ArmorDefenseSummary } from '@/components/armors/ArmorDefenseSummary';
import { Card } from '@/components/Card';

const pieceTypes = ['Head', 'Chest', 'Arms', 'Waist', 'Legs'] as const;

function ArmorPieceCard({ piece }: { piece: ArmorPiece | undefined }) {
  if (!piece) {
    return (
      <Card
        title="Not Available"
        className="bg-secondary h-full"
        description={<p className="text-sm text-secondary">This armor piece is not available.</p>}
      />
    );
  }

  const description = (
    <div className="space-y-4">
      <p className="text-primary">Defense: {piece.defense || 0}</p>
      <div>
        <h4 className="font-semibold text-primary mb-2">Resistances:</h4>
        <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
          {[
            ['Fire', piece.fire],
            ['Water', piece.water],
            ['Thunder', piece.thunder],
            ['Ice', piece.ice],
            ['Dragon', piece.dragon],
          ].map(([element, value]) => (
            <li key={element} className={typeof value === 'number' && value > 0 ? 'text-accent' : typeof value === 'number' && value < 0 ? 'text-secondary' : 'text-primary'}>
              {element}: {value}
            </li>
          ))}
        </ul>
      </div>
      {piece.skills && (
        <div>
          <h4 className="font-semibold text-primary mb-2">Skills:</h4>
          <ul className="space-y-1">
            {piece.skills.map(skill => (
              <li key={`${skill.skillName}-${skill.skillLevel}`} className="text-primary">
                {skill.skillName} Lv. {skill.skillLevel}
              </li>
            ))}
          </ul>
        </div>
      )}
      {piece.materials && (
        <div>
          <h4 className="font-semibold text-primary mb-2">Materials:</h4>
          <p className="text-primary">{piece.materials}</p>
        </div>
      )}
    </div>
  );

  return description;
}

export default function ArmorSetPage({ params }: { params: { setId: string } }) {
  const armorSet = getArmorSet(decodeURIComponent(params.setId));

  if (!armorSet) {
    return <div className="container mx-auto p-4 text-primary">Armor set not found</div>;
  }

  const getSetBonus = () => {
    if (!armorSet.pieces[0].skills) return null;
    const setBonusSkill = armorSet.pieces[0].skills.find(skill =>
      skill.skillType === 'set-bonus'
    );
    return setBonusSkill?.skillName || null;
  };

  const setBonus = getSetBonus();

  return (
    <div className="container mx-auto p-4">
      <Link href="/armors" className="text-accent hover:underline mb-4 inline-block">
        &larr; Back to All Armor Sets
      </Link>
      <h1 className="text-3xl font-bold mb-4 text-primary">{armorSet.name}</h1>
      <div className="flex items-center mb-4">
        <p className="text-lg text-primary mr-4">Rarity: {armorSet.rarity}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card
          title="Skill Summary"
          className="bg-secondary"
          description={<ArmorSkillSummary armorSet={armorSet} />}
        />
        <Card
          title="Defense Summary"
          className="bg-secondary"
          description={<ArmorDefenseSummary armorSet={armorSet} />}
        />
      </div>
      {setBonus && (
        <Card
          title={`Set Bonus: ${setBonus}`}
          className="bg-secondary mb-6"
          description={
            <p className="text-sm text-secondary">
              This set bonus is activated when wearing multiple pieces of the {armorSet.name} set.
            </p>
          }
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {pieceTypes.map(type => {
          const piece = armorSet.pieces.find(p => p.type === type);
          return (
            <Card
              key={type}
              title={piece ? piece.name : `${type} (Not Available)`}
              className="bg-secondary h-full"
              description={<ArmorPieceCard piece={piece} />}
            />
          );
        })}
      </div>
    </div>
  );
}
