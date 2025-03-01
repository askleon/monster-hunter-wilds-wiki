import monsterData from '../data/monsters/monsters.json';
import monsterWeaknessData from '../data/monsters/monster-weakness.json';
import monsterTypesData from '../data/monsters/monster-types.json';
import monsterSpecialAttacksData from '../data/monsters/monster-special-attacks.json';
import monsterMaterialsData from '../data/monsters/monster-materials.json';
import monsterDetailedInfoData from '../data/monsters/monster-detailed-info.json';

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
  name: string;
  defaultOrder: number;
  type: string;
  habitats: string;
  specialAttacks: string;
  description: string;
}

interface MonsterWeakness {
  monster: string;
  part: string;
  slash: number;
  blunt: number;
  ammo: number;
  fire: number;
  water: number;
  lightning: number;
  ice: number;
  dragon: number;
}

export interface MonsterType {
  name: string;
  description: string;
}

export interface MonsterSpecialAttack {
  name: string;
  description: string;
}

export interface MonsterMaterial {
  monster: string;
  material: string;
  rank: string;
  rarity: string;
  method: string;
  condition: string;
  quantity: number;
  rate: string;
}

interface MonsterDetailedInfo {
  name: string;
  recommended_elemental_attack: string;
  poison: number;
  sleep: number;
  paralysis: number;
  blastblight: number;
  stun: number;
  exhaus: number;
  flash: boolean;
  sonic: boolean;
  shock: boolean;
  pitfall: boolean;
}

export interface Monster {
  id: string;
  name: string;
  type: string;
  habitats: string[];
  specialAttacks: string[];
  description: string;
  weaknesses: MonsterWeakness[];
  materials: (MonsterMaterial & { rank: string; method: string; rate: string; quantity?: number; condition?: string })[];
  detailedInfo?: MonsterDetailedInfo;
}

export const monsters: Monster[] = (monsterData as RawMonsterData[]).map(monster => ({
  id: monster.defaultOrder.toString(),
  name: monster.name,
  type: monster.type,
  habitats: monster.habitats.split(', '),
  specialAttacks: monster.specialAttacks.split(', '),
  description: monster.description,
  weaknesses: monsterWeaknessData.filter(weakness => weakness.monster === monster.name),
  materials: monsterMaterialsData.filter(material => material.monster === monster.name).map(material => ({
    ...material,
    rank: material.rank,
    method: material.method,
    rate: material.rate,
    quantity: Number(material.quantity), // Ensure quantity is a number
    condition: material.condition
  })),
  detailedInfo: monsterDetailedInfoData.find(info => info.name === monster.name) || undefined
}));

export function getMonsterById(id: string): Monster | undefined {
  return monsters.find(monster => monster.id === id);
}

export const monsterTypes: MonsterType[] = monsterTypesData.monsterTypes as MonsterType[];

export const monsterSpecialAttacks: MonsterSpecialAttack[] = monsterSpecialAttacksData.monsterSpecialAttacks;
