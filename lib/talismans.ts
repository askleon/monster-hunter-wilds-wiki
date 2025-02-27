import { Skill } from './skills';
import talismanData from '../data/talismans.json';

export interface Talisman {
  id: string;
  name: string;
  rarity: number;
  skills: {
    skill: Skill;
    level: number;
  }[];
  slots: number[];
  description: string;
}

export const talismans: Talisman[] = talismanData;

export function getAllTalismans(): Talisman[] {
  return talismans;
}

export function getTalismanById(id: string): Talisman | undefined {
  return talismans.find(talisman => talisman.id === id);
}
