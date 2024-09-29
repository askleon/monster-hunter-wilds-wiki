import { Skill } from './skills';

export interface ArmorPiece {
  id: string;
  name: string;
  type: 'Head' | 'Chest' | 'Arms' | 'Waist' | 'Legs';
  rarity: number;
  defense: number;
  skills: { name: string; level: number }[]; // Keep this as is
  resistances: {
    fire: number;
    water: number;
    thunder: number;
    ice: number;
    dragon: number;
  };
  materials: { name: string; quantity: number }[];
}

export interface ArmorSet {
  id: string;
  name: string;
  tier: number; // Add this line
  pieces: ArmorPiece[];
  bonus?: { name: string; description: string; requiredPieces: number };
}

export const armorSets: ArmorSet[] = [
  {
    id: 'rathalos',
    name: 'Rathalos',
    tier: 6, // Add tier based on the rarity of the armor pieces
    pieces: [
      {
        id: 'rathalos-helm',
        name: 'Rathalos Helm',
        type: 'Head',
        rarity: 6,
        defense: 38,
        skills: [
          { name: 'Attack Boost', level: 2 },
          { name: 'Fire Attack', level: 1 },
        ],
        resistances: { fire: 3, water: 1, thunder: -2, ice: 1, dragon: -3 },
        materials: [
          { name: 'Rathalos Scale+', quantity: 3 },
          { name: 'Rathalos Carapace', quantity: 2 },
        ],
      },
      {
        id: 'rathalos-mail',
        name: 'Rathalos Mail',
        type: 'Chest',
        rarity: 6,
        defense: 38,
        skills: [
          { name: 'Weakness Exploit', level: 2 },
        ],
        resistances: { fire: 3, water: 1, thunder: -2, ice: 1, dragon: -3 },
        materials: [
          { name: 'Rathalos Plate', quantity: 1 },
          { name: 'Rathalos Carapace', quantity: 3 },
        ],
      },
      {
        id: 'rathalos-braces',
        name: 'Rathalos Braces',
        type: 'Arms',
        rarity: 6,
        defense: 38,
        skills: [
          { name: 'Attack Boost', level: 1 },
        ],
        resistances: { fire: 3, water: 1, thunder: -2, ice: 1, dragon: -3 },
        materials: [
          { name: 'Rathalos Wing', quantity: 2 },
          { name: 'Rathalos Webbing', quantity: 2 },
        ],
      },
      {
        id: 'rathalos-coil',
        name: 'Rathalos Coil',
        type: 'Waist',
        rarity: 6,
        defense: 38,
        skills: [
          { name: 'Fire Attack', level: 2 },
        ],
        resistances: { fire: 3, water: 1, thunder: -2, ice: 1, dragon: -3 },
        materials: [
          { name: 'Rathalos Medulla', quantity: 1 },
          { name: 'Rathalos Scale+', quantity: 2 },
        ],
      },
      {
        id: 'rathalos-greaves',
        name: 'Rathalos Greaves',
        type: 'Legs',
        rarity: 6,
        defense: 38,
        skills: [
          { name: 'Jump Master', level: 1 },
        ],
        resistances: { fire: 3, water: 1, thunder: -2, ice: 1, dragon: -3 },
        materials: [
          { name: 'Rathalos Tail', quantity: 1 },
          { name: 'Rathalos Carapace', quantity: 2 },
        ],
      },
    ],
    bonus: {
      name: 'Punishing Draw',
      description: 'Adds a small amount of stun power to draw attacks and slightly increases attack power.',
      requiredPieces: 4,
    },
  },
  {
    id: 'odogaron',
    name: 'Odogaron',
    tier: 6,
    pieces: [
      {
        id: 'odogaron-helm',
        name: 'Odogaron Helm',
        type: 'Head',
        rarity: 6,
        defense: 36,
        skills: [
          { name: 'Critical Eye', level: 2 },
        ],
        resistances: { fire: 2, water: 2, thunder: -2, ice: -3, dragon: 2 },
        materials: [
          { name: 'Odogaron Scale+', quantity: 3 },
          { name: 'Odogaron Claw+', quantity: 2 },
        ],
      },
      {
        id: 'odogaron-mail',
        name: 'Odogaron Mail',
        type: 'Chest',
        rarity: 6,
        defense: 36,
        skills: [
          { name: 'Speed Sharpening', level: 1 },
          { name: 'Critical Eye', level: 1 },
        ],
        resistances: { fire: 2, water: 2, thunder: -2, ice: -3, dragon: 2 },
        materials: [
          { name: 'Odogaron Plate', quantity: 1 },
          { name: 'Odogaron Scale+', quantity: 4 },
        ],
      },
      {
        id: 'odogaron-vambraces',
        name: 'Odogaron Vambraces',
        type: 'Arms',
        rarity: 6,
        defense: 36,
        skills: [
          { name: 'Constitution', level: 1 },
          { name: 'Critical Eye', level: 1 },
        ],
        resistances: { fire: 2, water: 2, thunder: -2, ice: -3, dragon: 2 },
        materials: [
          { name: 'Odogaron Claw+', quantity: 3 },
          { name: 'Odogaron Sinew+', quantity: 2 },
        ],
      },
      {
        id: 'odogaron-coil',
        name: 'Odogaron Coil',
        type: 'Waist',
        rarity: 6,
        defense: 36,
        skills: [
          { name: 'Speed Sharpening', level: 1 },
          { name: 'Critical Eye', level: 1 },
        ],
        resistances: { fire: 2, water: 2, thunder: -2, ice: -3, dragon: 2 },
        materials: [
          { name: 'Odogaron Tail', quantity: 1 },
          { name: 'Odogaron Scale+', quantity: 3 },
        ],
      },
      {
        id: 'odogaron-greaves',
        name: 'Odogaron Greaves',
        type: 'Legs',
        rarity: 6,
        defense: 36,
        skills: [
          { name: 'Constitution', level: 1 },
          { name: 'Critical Eye', level: 1 },
        ],
        resistances: { fire: 2, water: 2, thunder: -2, ice: -3, dragon: 2 },
        materials: [
          { name: 'Odogaron Sinew+', quantity: 3 },
          { name: 'Odogaron Scale+', quantity: 2 },
        ],
      },
    ],
    bonus: {
      name: 'Punishing Draw',
      description: 'Adds a small amount of stun power to draw attacks and slightly increases attack power.',
      requiredPieces: 4,
    },
  },
  {
    id: 'skull',
    name: 'Skull',
    tier: 5,
    pieces: [
      {
        id: 'skull-visage',
        name: 'Skull Visage',
        type: 'Head',
        rarity: 5,
        defense: 32,
        skills: [
          { name: 'Fortify', level: 1 },
        ],
        resistances: { fire: 3, water: -3, thunder: 3, ice: -3, dragon: 0 },
        materials: [
          { name: 'Monster Bone+', quantity: 5 },
          { name: 'Warped Bone', quantity: 3 },
        ],
      },
    ],
    // No set bonus for single piece sets
  },
  {
    id: 'grand-chaos',
    name: 'Grand Chaos',
    tier: 8,
    pieces: [
      {
        id: 'grand-chaos-hood',
        name: 'Grand Chaos Hood',
        type: 'Head',
        rarity: 8,
        defense: 64,
        skills: [
          { name: 'Critical Element', level: 1 },
          { name: 'Evade Window', level: 1 },
        ],
        resistances: { fire: 3, water: 3, thunder: 3, ice: 3, dragon: 3 },
        materials: [
          { name: 'Xeno\'jiiva Horn', quantity: 1 },
          { name: 'Xeno\'jiiva Shell', quantity: 3 },
        ],
      },
      {
        id: 'grand-chaos-robe',
        name: 'Grand Chaos Robe',
        type: 'Chest',
        rarity: 8,
        defense: 64,
        skills: [
          { name: 'Critical Element', level: 1 },
          { name: 'Focus', level: 2 },
        ],
        resistances: { fire: 3, water: 3, thunder: 3, ice: 3, dragon: 3 },
        materials: [
          { name: 'Xeno\'jiiva Wing', quantity: 2 },
          { name: 'Xeno\'jiiva Shell', quantity: 4 },
        ],
      },
    ],
    bonus: {
      name: 'True Critical Element',
      description: 'Greatly increases elemental damage when landing critical hits.',
      requiredPieces: 2,
    },
  },
];

export function getAllArmorSets(): ArmorSet[] {
  return armorSets;
}

export function getArmorSetById(id: string): ArmorSet | undefined {
  return armorSets.find(set => set.id === id);
}

export function getArmorPieceById(id: string): ArmorPiece | undefined {
  for (const set of armorSets) {
    const piece = set.pieces.find(p => p.id === id);
    if (piece) return piece;
  }
  return undefined;
}
