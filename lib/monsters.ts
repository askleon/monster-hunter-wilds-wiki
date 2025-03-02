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
  rarity: number;
  method: string;
  condition: string | null;
  quantity: number;
  rate: number | null;
}

interface MonsterDetailedInfo {
  name: string;
  recommendedElementalAttack: string;
  poison: number;
  sleep: number;
  paralysis: number;
  blastblight: number;
  stun: number;
  exhaust: number;
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
  materials: MonsterMaterial[];
  detailedInfo?: MonsterDetailedInfo;
}

export const monsterWeaknesses: MonsterWeakness[] = monsterWeaknessData;
export const monsterMaterials: MonsterMaterial[] = monsterMaterialsData.map(material => ({
  ...material,
  quantity: material.quantity ?? 1
}));
export const monsterDetailedInfo: MonsterDetailedInfo[] = monsterDetailedInfoData;
export const monsterTypes: MonsterType[] = monsterTypesData.monsterTypes;
export const monsterSpecialAttacks: MonsterSpecialAttack[] = monsterSpecialAttacksData.monsterSpecialAttacks;

export const monsters: Monster[] = monsterData.map(monster => ({
  ...monster,
  id: monster.defaultOrder.toString(),
  weaknesses: monsterWeaknesses.filter(weakness => weakness.monster === monster.name),
  materials: monsterMaterials.filter(material => material.monster === monster.name),
  habitats: monster.habitats?.split(',').map(habitat => habitat.trim()) ?? [],
  specialAttacks: monster.specialAttacks?.split(',').map(specialAttack => specialAttack.trim()) ?? [],
  description: monster.description ?? '',
  detailedInfo: monsterDetailedInfo.find(info => info.name === monster.name),
}));

export function getMonsterById(id: string): Monster | undefined {
  return monsters.find(monster => monster.id === id);
}
