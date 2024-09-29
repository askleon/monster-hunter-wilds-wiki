import React from 'react';
import { Loadout } from './LoadoutBuilder';
import { Skill, getSkillByName } from '@/lib/skills';
import { ArmorPiece } from '@/lib/armors';

interface SkillSummaryProps {
  loadout: Loadout;
}

export function SkillSummary({ loadout }: SkillSummaryProps) {
  const calculateSkills = (): (Skill & { level: number })[] => {
    const skillMap: Record<string, Skill & { level: number }> = {};

    const armorPieces: (ArmorPiece | null)[] = [loadout.head, loadout.chest, loadout.arms, loadout.waist, loadout.legs];

    armorPieces.forEach((armorPiece) => {
      if (armorPiece && armorPiece.skills) {
        armorPiece.skills.forEach((armorSkill) => {
          const fullSkill = getSkillByName(armorSkill.name);
          if (fullSkill) {
            if (skillMap[armorSkill.name]) {
              skillMap[armorSkill.name].level += armorSkill.level;
            } else {
              skillMap[armorSkill.name] = { ...fullSkill, level: armorSkill.level };
            }
          }
        });
      }
    });

    return Object.values(skillMap);
  };

  const skills = calculateSkills();

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-bold text-primary">Skills</h3>
      {skills.map((skill) => (
        <div key={skill.name} className="flex items-center space-x-2">
          <span className="font-medium w-1/3 text-primary">{skill.name}</span>
          <div className="flex-grow flex justify-end items-center space-x-1">
            {Array.from({ length: skill.maxLevel }).map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 border ${
                  index < skill.level
                    ? 'bg-skill-active border-skill-active'
                    : 'bg-skill-inactive border-skill-inactive'
                }`}
              />
            ))}
          </div>
          <span className="text-sm w-16 text-right text-secondary">Lv. {skill.level}/{skill.maxLevel}</span>
        </div>
      ))}
    </div>
  );
}
