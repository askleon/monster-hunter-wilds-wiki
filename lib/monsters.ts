import monsterData from '../data/monsters/monsters.json';

export type PhysicalDamageType = 'blunt' | 'slashing' | 'piercing';
export type ElementType = 'fire' | 'water' | 'thunder' | 'ice' | 'dragon';
export type AilmentType = "poison" | "stun" | "paralysis" | "sleep" | "blast" | "exhaust" | "fireblight" | "waterblight" | "thunderblight" | "iceblight";

export interface Ailment {
  type: AilmentType;
  duration: number;
  initialResistance: number;
  nextResistanceThreshold: number;
  maximumResistance: number;
  naturalBuildupDegradation: number;
  totalDamage: number;
}

export interface WeaponDamage {
  physical: PhysicalDamageType;
  element?: ElementType;
  status?: AilmentType;
}

export interface BodyPartWeakness {
  physical: Record<PhysicalDamageType, number>;
  elemental: Partial<Record<ElementType, number>>;
  status: Partial<Record<AilmentType, number>>;
}

export interface BodyPart {
  name: string;
  weakness: BodyPartWeakness;
}
interface RawMonsterData {
  id: string;
  name: string;
  type: string | null;
  elements: ElementType[] | null;
  bodyParts: BodyPart[] | null;
  habitats: string[] | null;
  description: string;
  size: {
    average: number | null;
    unit: string | null;
  } | null;
  difficulty: number | null;
  materials: MonsterMaterial[] | null;
}

export interface Monster {
  id: string;
  name: string;
  type: string | undefined;
  elements: ElementType[] | undefined;
  bodyParts: BodyPart[] | undefined;
  habitats: string[] | undefined;
  description: string;
  size: {
    average: number | undefined;
    unit: string | undefined;
  } | undefined;
  difficulty: number | undefined;
  materials: MonsterMaterial[] | undefined;
}

export interface MaterialSource {
  method: 'Carve' | 'Target Reward' | 'Broken Part' | 'Capture' | 'Dropped';
  rank: 'Low Rank' | 'High Rank' | 'Master Rank';
  rate: number;
  quantity?: number;
  condition?: string;
}

export interface MonsterMaterial {
  id: string;
  name: string;
  rarity: number;
  sources: MaterialSource[];
}

export const monsters: Monster[] = (monsterData as RawMonsterData[]).map(monster => ({
  ...monster,
  type: monster.type ?? undefined,
  elements: monster.elements ?? undefined,
  bodyParts: monster.bodyParts ?? undefined,
  habitats: monster.habitats ?? undefined,
  size: monster.size ? {
    average: monster.size.average ?? undefined,
    unit: monster.size.unit ?? undefined
  } : undefined,
  difficulty: monster.difficulty ?? undefined,
  materials: monster.materials ?? undefined
}));

export function getMonsterById(id: string): Monster | undefined {
  return monsters.find(monster => monster.id === id);
}
