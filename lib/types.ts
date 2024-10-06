import { ElementOrStatusType } from './weapons/weapons';

export type PhysicalDamageType = 'blunt' | 'slashing' | 'piercing';
export type ElementType = 'fire' | 'water' | 'thunder' | 'ice' | 'dragon';
export type StatusType = 'poison' | 'paralysis' | 'sleep' | 'blast';

export interface ElementalProperty {
  type: ElementType;
  value: number;
}

export interface StatusProperty {
  type: StatusType;
  value: number;
}

export function getColorClass(type: ElementOrStatusType): string {
  switch(type) {
  case 'fire': return 'text-red-500';
  case 'water': return 'text-blue-500';
  case 'thunder': return 'text-yellow-500';
  case 'ice': return 'text-cyan-500';
  case 'dragon': return 'text-purple-500';
  case 'poison': return 'text-purple-700';
  case 'sleep': return 'text-yellow-300';
  case 'paralysis': return 'text-yellow-500';
  case 'blast': return 'text-orange-500';
  default: return 'text-gray-400';
  }
}

export function formatElementOrStatus(property: ElementalProperty | StatusProperty | undefined): string {
  if (!property) return 'None';
  return `${property.type.charAt(0).toUpperCase() + property.type.slice(1)} (${property.value})`;
}
