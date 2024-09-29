import React from 'react';
import { ArmorSet } from '@/lib/armors';
import { Skill, getSkillByName } from '@/lib/skills';

export function ArmorSkillSummary({ armorSet }: { armorSet: ArmorSet }) {
  const skillSummary = armorSet.pieces.reduce((acc, piece) => {
    piece.skills.forEach(armorSkill => {
      const fullSkill = getSkillByName(armorSkill.name);
      if (fullSkill) {
        if (acc[armorSkill.name]) {
          acc[armorSkill.name].level += armorSkill.level;
        } else {
          acc[armorSkill.name] = { ...fullSkill, level: armorSkill.level };
        }
      }
    });
    return acc;
  }, {} as Record<string, Skill & { level: number }>);

  return (
    <div>
      <div className="flex justify-between font-semibold text-primary mb-2">
        <span>Skill</span>
        <span>Level</span>
      </div>
      <ul className="space-y-1">
        {Object.values(skillSummary).map((skill) => (
          <li key={skill.name} className="text-primary flex justify-between">
            <span>{skill.name}</span>
            <span>Lv. {skill.level}/{skill.maxLevel}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
