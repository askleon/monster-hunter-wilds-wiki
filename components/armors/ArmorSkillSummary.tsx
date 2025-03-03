import React from 'react';
import { ArmorSet } from '@/lib/armors';
import { Skill, getSkillsByName } from '@/lib/skills';
import { SkillDisplay } from '../SkillDisplay';

export function ArmorSkillSummary({ armorSet }: { armorSet: ArmorSet }) {
  const skillSummary = React.useMemo(() => {
    // Sum up skill levels from all pieces
    const skillLevels = new Map<string, number>();
    armorSet.pieces.forEach(piece => {
      piece.skills?.forEach(skill => {
        const currentLevel = skillLevels.get(skill.skillName) || 0;
        skillLevels.set(skill.skillName, currentLevel + skill.skillLevel);
      });
    });

    // Get the full skill data for each skill
    const skillsData = getSkillsByName(Array.from(skillLevels.keys()));

    // Map each skill to its actual accumulated level
    return Array.from(skillLevels.entries())
      .map(([skillName, totalLevel]) => {
        const skillData = skillsData.find(s => s.name === skillName && s.level === totalLevel);
        if (skillData) {
          return {
            ...skillData,
            totalLevel
          };
        }
        return null;
      })
      .filter((skill): skill is Skill & { totalLevel: number } => skill !== null)
      .sort((a, b) => b.totalLevel - a.totalLevel);
  }, [armorSet]);

  if (skillSummary.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Set Skills</h3>
      <div className="divide-y divide-gray-200">
        {skillSummary.map(skill => (
          <SkillDisplay
            key={`${skill.name}-${skill.totalLevel}`}
            skill={skill}
            totalLevel={skill.totalLevel}
          />
        ))}
      </div>
    </div>
  );
}
