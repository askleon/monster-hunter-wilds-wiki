import React from 'react';
import { ArmorSet } from '@/lib/armors';

export function ArmorSkillSummary({ armorSet }: { armorSet: ArmorSet }) {
  const skillSummary = armorSet.pieces.reduce((acc, piece) => {
    piece.skills.forEach(skill => {
      if (acc[skill.name]) {
        acc[skill.name] += skill.level;
      } else {
        acc[skill.name] = skill.level;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <div className="flex justify-between font-semibold text-primary mb-2">
        <span>Skill</span>
        <span>Level</span>
      </div>
      <ul className="space-y-1">
        {Object.entries(skillSummary).map(([skill, level]) => (
          <li key={skill} className="text-primary flex justify-between">
            <span>{skill}</span>
            <span>Lv. {level}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
