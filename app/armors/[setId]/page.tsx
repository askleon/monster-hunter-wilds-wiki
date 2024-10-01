'use client'

import React from 'react';
import { getArmorSetById, ArmorPiece } from '@/lib/armors';
import { getSkillById } from '@/lib/skills';
import Link from 'next/link';
import { ArmorSkillSummary } from '@/app/components/ArmorSkillSummary';
import { ArmorDefenseSummary } from '@/app/components/ArmorDefenseSummary';
import { Card } from '@/app/components/Card';
import { SkillDisplay } from '@/app/components/SkillDisplay';

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

  const skills = piece.skills.map(skill => {
    const fullSkill = getSkillById(skill.id);
    return fullSkill ? { ...fullSkill, level: skill.level } : { id: skill.id, name: skill.id, maxLevel: skill.level, level: skill.level, description: '', effects: [] };
  });

  const description = (
    <div className="space-y-4">
      <p className="text-primary">Defense: {piece.defense}</p>
      <div>
        <h4 className="font-semibold text-primary mb-2">Resistances:</h4>
        <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
          {Object.entries(piece.resistances).map(([element, value]) => (
            <li key={element} className={value > 0 ? 'text-accent' : value < 0 ? 'text-secondary' : 'text-primary'}>
              {element.charAt(0).toUpperCase() + element.slice(1)}: {value}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-primary mb-2">Skills:</h4>
        <SkillDisplay skills={skills} />
      </div>
      <div>
        <h4 className="font-semibold text-primary mb-2">Materials:</h4>
        <ul className="space-y-1">
          {piece.materials.map((material, index) => (
            <li key={index} className="text-primary">{material.name} x{material.quantity}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  return description;
}

export default function ArmorSetPage({ params }: { params: { setId: string } }) {
  const armorSet = getArmorSetById(params.setId);

  if (!armorSet) {
    return <div className="container mx-auto p-4 text-primary">Armor set not found</div>;
  }

  const getSetBonus = () => {
    const setBonusSkill = armorSet.pieces[0].skills.find(skill => {
      const fullSkill = getSkillById(skill.id);
      return fullSkill && fullSkill.name.includes('Mastery');
    });
    return setBonusSkill ? getSkillById(setBonusSkill.id)?.name : null;
  };

  const setBonus = getSetBonus();

  return (
    <div className="container mx-auto p-4">
      <Link href="/armors" className="text-accent hover:underline mb-4 inline-block">
        &larr; Back to All Armor Sets
      </Link>
      <h1 className="text-3xl font-bold mb-4 text-primary">{armorSet.name}</h1>
      <div className="flex items-center mb-4">
        <p className="text-lg text-primary mr-4">Rarity: {armorSet.tier}</p>
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
