import { Skill } from './skills';

export interface ArmorPiece {
  id: string;
  name: string;
  type: 'Head' | 'Chest' | 'Arms' | 'Waist' | 'Legs';
  rarity: number;
  defense: number;
  skills: { id: string; level: number }[];
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
  tier: number;
  pieces: ArmorPiece[];
}

export const armorSets: ArmorSet[] = [
  {
    id: 'pukei-pukei',
    name: 'Pukei-Pukei',
    tier: 3,
    pieces: [
      {
        id: 'pukei-hood',
        name: 'Pukei Hood',
        type: 'Head',
        rarity: 3,
        defense: 18,
        skills: [
          { id: 'poisonResistance', level: 1 },
          { id: 'botanist', level: 1 },
        ],
        resistances: { fire: 0, water: 3, thunder: -3, ice: 0, dragon: 1 },
        materials: [
          { name: 'Pukei-Pukei Scale', quantity: 3 },
          { name: 'Pukei-Pukei Feather', quantity: 1 },
        ],
      },
      {
        id: 'pukei-mail',
        name: 'Pukei Mail',
        type: 'Chest',
        rarity: 3,
        defense: 18,
        skills: [
          { id: 'poisonAttack', level: 1 },
          { id: 'itemProlonger', level: 1 },
        ],
        resistances: { fire: 0, water: 3, thunder: -3, ice: 0, dragon: 1 },
        materials: [
          { name: 'Pukei-Pukei Carapace', quantity: 4 },
          { name: 'Pukei-Pukei Sac', quantity: 1 },
        ],
      },
      {
        id: 'pukei-vambraces',
        name: 'Pukei Vambraces',
        type: 'Arms',
        rarity: 3,
        defense: 18,
        skills: [
          { id: 'poisonAttack', level: 1 },
          { id: 'sporepuffExpert', level: 1 },
        ],
        resistances: { fire: 0, water: 3, thunder: -3, ice: 0, dragon: 1 },
        materials: [
          { name: 'Pukei-Pukei Quill', quantity: 2 },
          { name: 'Pukei-Pukei Scale', quantity: 2 },
        ],
      },
      {
        id: 'pukei-coil',
        name: 'Pukei Coil',
        type: 'Waist',
        rarity: 3,
        defense: 18,
        skills: [
          { id: 'poisonResistance', level: 1 },
          { id: 'itemProlonger', level: 1 },
        ],
        resistances: { fire: 0, water: 3, thunder: -3, ice: 0, dragon: 1 },
        materials: [
          { name: 'Pukei-Pukei Shell', quantity: 3 },
          { name: 'Pukei-Pukei Tail', quantity: 1 },
        ],
      },
      {
        id: 'pukei-greaves',
        name: 'Pukei Greaves',
        type: 'Legs',
        rarity: 3,
        defense: 18,
        skills: [
          { id: 'botanist', level: 1 },
          { id: 'sporepuffExpert', level: 1 },
        ],
        resistances: { fire: 0, water: 3, thunder: -3, ice: 0, dragon: 1 },
        materials: [
          { name: 'Pukei-Pukei Webbing', quantity: 2 },
          { name: 'Pukei-Pukei Scale', quantity: 2 },
        ],
      },
    ],
  },
  {
    id: 'rathalos',
    name: 'Rathalos',
    tier: 6,
    pieces: [
      {
        id: 'rathalos-helm',
        name: 'Rathalos Helm',
        type: 'Head',
        rarity: 6,
        defense: 38,
        skills: [
          { id: 'attackBoost', level: 2 },
          { id: 'fireAttack', level: 1 },
          { id: 'rathalosMastery', level: 1 },
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
          { id: 'weaknessExploit', level: 2 },
          { id: 'rathalosMastery', level: 1 },
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
          { id: 'attackBoost', level: 1 },
          { id: 'rathalosMastery', level: 1 },
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
          { id: 'fireAttack', level: 2 },
          { id: 'rathalosMastery', level: 1 },
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
          { id: 'jumpMaster', level: 1 },
          { id: 'rathalosMastery', level: 1 },
        ],
        resistances: { fire: 3, water: 1, thunder: -2, ice: 1, dragon: -3 },
        materials: [
          { name: 'Rathalos Tail', quantity: 1 },
          { name: 'Rathalos Carapace', quantity: 2 },
        ],
      },
    ],
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
          { id: 'criticalEye', level: 2 },
          { id: 'odogaronMastery', level: 1 },
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
          { id: 'speedSharpening', level: 1 },
          { id: 'criticalEye', level: 1 },
          { id: 'odogaronMastery', level: 1 },
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
          { id: 'constitution', level: 1 },
          { id: 'criticalEye', level: 1 },
          { id: 'odogaronMastery', level: 1 },
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
          { id: 'speedSharpening', level: 1 },
          { id: 'criticalEye', level: 1 },
          { id: 'odogaronMastery', level: 1 },
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
          { id: 'constitution', level: 1 },
          { id: 'criticalEye', level: 1 },
          { id: 'odogaronMastery', level: 1 },
        ],
        resistances: { fire: 2, water: 2, thunder: -2, ice: -3, dragon: 2 },
        materials: [
          { name: 'Odogaron Sinew+', quantity: 3 },
          { name: 'Odogaron Scale+', quantity: 2 },
        ],
      },
    ],
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
          { id: 'fortify', level: 1 },
        ],
        resistances: { fire: 3, water: -3, thunder: 3, ice: -3, dragon: 0 },
        materials: [
          { name: 'Monster Bone+', quantity: 5 },
          { name: 'Warped Bone', quantity: 3 },
        ],
      },
    ],
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
          { id: 'criticalElement', level: 1 },
          { id: 'evadeWindow', level: 1 },
          { id: 'trueCriticalElement', level: 1 },
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
          { id: 'criticalElement', level: 1 },
          { id: 'focus', level: 2 },
          { id: 'trueCriticalElement', level: 1 },
        ],
        resistances: { fire: 3, water: 3, thunder: 3, ice: 3, dragon: 3 },
        materials: [
          { name: 'Xeno\'jiiva Wing', quantity: 2 },
          { name: 'Xeno\'jiiva Shell', quantity: 4 },
        ],
      },
    ],
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
