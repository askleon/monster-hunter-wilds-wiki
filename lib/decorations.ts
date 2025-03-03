import { Skill } from './skills';
import decorationsData from '../data/decorations.json';

export interface Decoration {
  id: string;
  name: string;
  rarity: number;
  slotSize: number;
  skill: Skill;
  description: string;
}

export const decorations: Decoration[] = decorationsData;

export function getAllDecorations(): Decoration[] {
  return decorations;
}

export function getDecorationById(id: string): Decoration | undefined {
  return decorations.find(decoration => decoration.id === id);
}
