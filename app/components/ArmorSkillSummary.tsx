import React from 'react';
import { ArmorSet } from '@/lib/armors';
import { Skill, getSkillById } from '@/lib/skills';

export function ArmorSkillSummary({ armorSet }: { armorSet: ArmorSet }) {
  const skillSummary = React.useMemo(() => {
    console.log('ArmorSet:', armorSet); // Debug log
    const summary = armorSet.pieces.reduce((acc, piece) => {
      console.log('Piece:', piece); // Debug log
      piece.skills.forEach(armorSkill => {
        console.log('ArmorSkill:', armorSkill); // Debug log
        const fullSkill = getSkillById(armorSkill.id);
        console.log('FullSkill:', fullSkill); // Debug log
        if (fullSkill) {
          if (acc[armorSkill.id]) {
            acc[armorSkill.id].level = Math.min(fullSkill.maxLevel, acc[armorSkill.id].level + armorSkill.level);
          } else {
            acc[armorSkill.id] = { ...fullSkill, level: Math.min(fullSkill.maxLevel, armorSkill.level) };
          }
        }
      });
      return acc;
    }, {} as Record<string, Skill & { level: number }>);
    return summary;
  }, [armorSet]);

  return (
    <div>
      <div className="flex justify-between font-semibold text-primary mb-2">
        <span>Skill</span>
        <span>Level</span>
      </div>
      <ul className="space-y-1">
        {Object.values(skillSummary).map((skill) => (
          <li key={skill.id} className="text-primary flex justify-between">
            <span>{skill.name}</span>
            <span>Lv. {skill.level}/{skill.maxLevel}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
