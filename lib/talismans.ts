import { Skill } from './skills';

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

export const talismans: Talisman[] = [
  {
    id: 'hope-charm',
    name: 'Hope Charm',
    rarity: 1,
    skills: [
      {
        skill: {
          id: 'goodLuck',
          name: 'Good Luck',
          maxLevel: 3,
          description: 'Increases the chance of receiving more items at the end of a quest.',
          effects: [
            { level: 1, description: 'Slightly increases rewards' },
            { level: 2, description: 'Moderately increases rewards' },
            { level: 3, description: 'Greatly increases rewards' },
          ]
        },
        level: 1
      }
    ],
    slots: [1],
    description: 'A charm that brings hope to hunters. Preorder bonus for Monster Hunter Wilds.'
  },
  // Add more talismans here as they are revealed or as placeholders
];

export function getAllTalismans(): Talisman[] {
  return talismans;
}

export function getTalismanById(id: string): Talisman | undefined {
  return talismans.find(talisman => talisman.id === id);
}
