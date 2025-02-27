import skillData from '../data/skills/skills.json';
import setBonusesData from '../data/skills/setBonuses.json';

export interface Skill {
  id: string;
  name: string;
  maxLevel: number;
  description: string;
  effects: SkillEffect[];
}

interface SkillEffect {
  level: number;
  description: string;
}

export interface SetBonus {
  id: string;
  name: string;
  skills: SetBonusSkill[];
}

interface SetBonusSkill {
  skillId: string;
  requiredPieces: number;
}

export const skills: Array<Skill> = skillData;

export const setBonuses: Array<SetBonus> = setBonusesData;

export function getSkillById(id: string): Skill | undefined {
  return skills.find(skill => skill.id === id);
}

export function getSetBonusById(id: string): SetBonus | undefined {
  return setBonuses.find(setBonus => setBonus.id === id);
}

export function getAllSkills(): Skill[] {
  return Object.values(skills);
}

export function getAllSetBonuses(): SetBonus[] {
  return Object.values(setBonuses);
}
