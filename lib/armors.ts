import armorSetsData from '../data/armors/armor-sets.json';

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

export const armorSets: ArmorSet[] = armorSetsData as ArmorSet[];

export function getAllArmorSets(): ArmorSet[] {
  return armorSets;
}

export function getArmorSetById(id: string): ArmorSet | undefined {
  return armorSets.find(set => set.id === id);
}

export function getArmorPieceById(id: string): ArmorPiece | undefined {
  for (const set of armorSets) {
    const piece = set.pieces.find(piece => piece.id === id);
    if (piece) return piece;
  }
  return undefined;
}
