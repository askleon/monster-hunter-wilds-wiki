import React from 'react';
import { ArmorSet } from '@/lib/armors';
import { Skill, getSkillById } from '@/lib/skills';
import { SkillDisplay } from './SkillDisplay';

export function ArmorSkillSummary({ armorSet }: { armorSet: ArmorSet }) {
  const skillSummary = React.useMemo(() => {
    const summary = armorSet.pieces.reduce((acc, piece) => {
      piece.skills.forEach(armorSkill => {
        const fullSkill = getSkillById(armorSkill.id);
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
    return Object.values(summary);
  }, [armorSet]);

  return <SkillDisplay skills={skillSummary} />;
}
