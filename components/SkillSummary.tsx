import React from 'react';
import { Loadout } from './LoadoutBuilder';
import { Skill, getSkillsByName } from '@/lib/skills';
import { ArmorPiece } from '@/lib/armors';
import { SkillDisplay } from './SkillDisplay';

interface SkillSummaryProps {
  loadout: Loadout;
}

export function SkillSummary({ loadout }: SkillSummaryProps) {
  const skills = React.useMemo(() => {
    // Get all armor pieces from loadout
    const armorPieces: (ArmorPiece | null)[] = [
      loadout.head, loadout.chest, loadout.arms, loadout.waist, loadout.legs
    ];

    // Sum up skill levels from all pieces
    const skillLevels = new Map<string, number>();
    armorPieces.forEach(piece => {
      piece?.skills?.forEach(skill => {
        const currentLevel = skillLevels.get(skill.skillName) || 0;
        skillLevels.set(skill.skillName, currentLevel + skill.skillLevel);
      });
    });

    // Get the full skill data for each skill
    const skillsData = getSkillsByName(Array.from(skillLevels.keys()));

    // Group skills by name and find the one matching our total level
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
  }, [loadout]);

  if (skills.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-bold text-primary">Skills</h3>
      <div className="divide-y divide-gray-200">
        {skills.map(skill => (
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
