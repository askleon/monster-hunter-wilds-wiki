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

export function getColorClass(type: ElementType | StatusType): string {
  const colorMap: { [key: string]: string } = {
    fire: 'text-red-500',
    water: 'text-blue-500',
    thunder: 'text-yellow-500',
    ice: 'text-cyan-500',
    dragon: 'text-purple-500',
    poison: 'text-purple-700',
    paralysis: 'text-yellow-300',
    sleep: 'text-gray-400',
    blast: 'text-orange-500',
  };
  return colorMap[type] || 'text-gray-500';
}

export function formatElementOrStatus(property: ElementalProperty | StatusProperty | undefined): string {
  if (!property) return 'None';
  return `${property.type.charAt(0).toUpperCase() + property.type.slice(1)} (${property.value})`;
}
