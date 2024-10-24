import React from 'react';
import { Skill } from '@/lib/skills';

interface SkillDisplayProps {
  skills: (Skill & { level: number })[];
}

export function SkillDisplay({ skills }: SkillDisplayProps) {
  return (
    <div className="space-y-2">
      {skills.map((skill) => (
        <div key={skill.id} className="flex items-center space-x-2">
          <span className="font-medium w-1/3 text-primary">{skill.name}</span>
          <span className="text-sm w-20 text-secondary">Lv. {skill.level}/{skill.maxLevel}</span>
          <div className="flex-grow flex items-center space-x-1">
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
        </div>
      ))}
    </div>
  );
}
