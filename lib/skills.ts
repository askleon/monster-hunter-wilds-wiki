import skillData from '../data/skills/skills.json';

export interface Skill {
  name: string;
  description: string | null;
  level: number;
  effect: string | null;
}

export const skills: Array<Skill> = skillData;

export function getSkill(name: string): Skill | undefined {
  return skills.find(skill => skill.name === name);
}

export function getAllSkills(): Skill[] {
  return Object.values(skills);
}

export function getSkillsByName(names: string[]): Skill[] {
  return skills.filter(skill => names.includes(skill.name));
}
