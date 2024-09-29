import React from 'react';
import { Loadout } from './LoadoutBuilder';
import { Skill, getSkillById } from '@/lib/skills';
import { ArmorPiece } from '@/lib/armors';
import { SkillDisplay } from './SkillDisplay';

interface SkillSummaryProps {
  loadout: Loadout;
}

export function SkillSummary({ loadout }: SkillSummaryProps) {
  const skills = React.useMemo(() => {
    const skillMap: Record<string, Skill & { level: number }> = {};
    const armorPieces: (ArmorPiece | null)[] = [loadout.head, loadout.chest, loadout.arms, loadout.waist, loadout.legs];

    armorPieces.forEach((armorPiece) => {
      if (armorPiece && armorPiece.skills) {
        armorPiece.skills.forEach((armorSkill) => {
          const fullSkill = getSkillById(armorSkill.id);
          if (fullSkill) {
            if (skillMap[armorSkill.id]) {
              skillMap[armorSkill.id].level = Math.min(fullSkill.maxLevel, skillMap[armorSkill.id].level + armorSkill.level);
            } else {
              skillMap[armorSkill.id] = { ...fullSkill, level: Math.min(fullSkill.maxLevel, armorSkill.level) };
            }
          }
        });
      }
    });

    return Object.values(skillMap);
  }, [loadout]);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-bold text-primary">Skills</h3>
      <SkillDisplay skills={skills} />
    </div>
  );
}
