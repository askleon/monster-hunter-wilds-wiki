import weaponData from '../data/weapons/weapons.json';
import weaponTreeData from '../data/weapons/weapon-trees.json';
import weaponMaterialData from '../data/weapons/weapon-materials.json';
import weaponSkillData from '../data/weapons/weapon-skills.json';
import weaponTypesData from '../data/weapons/weapon-types.json';
import { slugify } from './util';

export interface Weapon {
  slug: string;
  type: string;
  tree: string;
  name: string;
  rarity: number;
  attack: number;
  affinity?: number;
  elementType?: string;
  elementValue?: number;
  defenseBonus?: number;
  cost?: number;
  skills?: WeaponSkill[];
  materials?: WeaponMaterial[];
}

export interface WeaponTree {
  slug: string;
  type: string;
  tree: string;
  order: number;
}

export interface WeaponMaterial {
  type: string;
  name: string;
  material: string;
  quantity: number;
}

export interface WeaponSkill {
  type: string;
  name: string;
  skill: string;
  level: number;
}

export interface WeaponType {
    id: string;
    name: string;
    description: string;
    icon: string;
}

export const weaponTypes: WeaponType[] = weaponTypesData;
export const weaponTrees: WeaponTree[] = weaponTreeData.map((tree) => ({
  ...tree,
  slug: slugify(tree.tree),
}));

export const weaponSkills: WeaponSkill[] = weaponSkillData;

export const weaponMaterials: WeaponMaterial[] = weaponMaterialData.map((material) => ({
  ...material,
  quantity: Number(material.quantity),
  material: String(material.material),
}));

export function getWeaponMaterials(type: string, name: string): WeaponMaterial[] {
  return weaponMaterials.filter((material) => material.type === type && material.name === name);
}

export function getWeaponSkills(type: string, name: string): WeaponSkill[] {
  return weaponSkills.filter((skill) => skill.type === type && skill.name === name);
}

export const weapons: Weapon[] = weaponData.map((weapon) => ({
  ...weapon,
  rarity: Number(weapon.rarity),
  attack: Number(weapon.attack),
  affinity: weapon.affinity ? Number(weapon.affinity) : undefined,
  elementType: weapon.elementType ? weapon.elementType : undefined,
  elementValue: weapon.elementValue ? Number(weapon.elementValue) : undefined,
  defenseBonus: weapon.defenseBonus ? Number(weapon.defenseBonus) : undefined,
  cost: weapon.cost ? Number(weapon.cost) : undefined,
  materials: getWeaponMaterials(weapon.type, weapon.name),
  skills: getWeaponSkills(weapon.type, weapon.name),
  slug: slugify(weapon.name),
}));
