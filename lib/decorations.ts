import { Skill } from './skills';

export interface Decoration {
  id: string;
  name: string;
  rarity: number;
  slotSize: number;
  skill: {
    skill: Skill;
    level: number;
  };
  description: string;
}

export const decorations: Decoration[] = [
  {
    id: 'attack-jewel-1',
    name: 'Attack Jewel 1',
    rarity: 6,
    slotSize: 1,
    skill: {
      skill: {
        id: 'attackBoost',
        name: 'Attack Boost',
        maxLevel: 7,
        description: 'Increases attack power.',
        effects: [
          { level: 1, description: 'Attack +3' },
          { level: 7, description: 'Attack +21, Affinity +5%' },
        ]
      },
      level: 1
    },
    description: 'A decoration that boosts attack power.'
  },
  {
    id: 'expert-jewel-1',
    name: 'Expert Jewel 1',
    rarity: 6,
    slotSize: 1,
    skill: {
      skill: {
        id: 'criticalEye',
        name: 'Critical Eye',
        maxLevel: 7,
        description: 'Increases affinity.',
        effects: [
          { level: 1, description: 'Affinity +5%' },
          { level: 7, description: 'Affinity +40%' },
        ]
      },
      level: 1
    },
    description: 'A decoration that increases affinity.'
  },
  {
    id: 'vitality-jewel-1',
    name: 'Vitality Jewel 1',
    rarity: 6,
    slotSize: 1,
    skill: {
      skill: {
        id: 'healthBoost',
        name: 'Health Boost',
        maxLevel: 3,
        description: 'Increases health.',
        effects: [
          { level: 1, description: 'Health +15' },
          { level: 3, description: 'Health +50' },
        ]
      },
      level: 1
    },
    description: 'A decoration that increases maximum health.'
  }
];

export function getAllDecorations(): Decoration[] {
  return decorations;
}

export function getDecorationById(id: string): Decoration | undefined {
  return decorations.find(decoration => decoration.id === id);
}
