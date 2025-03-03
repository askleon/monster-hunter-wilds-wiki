import { Skill } from '@/lib/skills';

interface SkillDisplayProps {
  skill: Skill;
  totalLevel: number;
  className?: string;
}

export function SkillDisplay({ skill, totalLevel, className = '' }: SkillDisplayProps) {
  return (
    <div className={`p-4 ${className}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-primary">{skill.name}</h3>
        <span className="text-accent">Lv. {totalLevel}</span>
      </div>
      {skill.description && (
        <p className="text-secondary mt-1">{skill.description}</p>
      )}
      {skill.effect && (
        <p className="text-accent mt-2">
          {skill.effect}
        </p>
      )}
    </div>
  );
}
