import { PhysicalDamageType, ElementalProperty, StatusProperty } from './types';

// Import weapon data
import weaponTypesData from '../data/weapons/weapon-types.json';
import greatSwordData from '../data/weapons/great-sword.json';
import swordAndShieldData from '../data/weapons/sword-and-shield.json';
import longSwordData from '../data/weapons/long-sword.json';
import hammerData from '../data/weapons/hammer.json';

// Type definitions
export interface WeaponTypeInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const WeaponTypes: WeaponTypeInfo[] = weaponTypesData as WeaponTypeInfo[];

export type WeaponType = typeof WeaponTypes[number]['id'];

export interface WeaponStats {
  attack: number;
  affinity: number;
  physicalType: PhysicalDamageType;
  element?: ElementalProperty;
  status?: StatusProperty;
}

export interface Material {
  name: string;
  quantity: number;
}

export interface Sharpness {
  red: number;
  orange: number;
  yellow: number;
  green: number;
  blue: number;
  white: number;
  purple: number;
  parenthesis?: {
    color: 'yellow' | 'green' | 'blue' | 'white' | 'purple';
    value: number;
  };
}

export interface WeaponNode {
  id: string;
  name: string;
  description: string;
  rarity: number;
  attack: number;
  sharpness: Sharpness;
  elementOrStatus?: {
    type: ElementOrStatusType;
    value: number;
  };
  affinity?: number;
  defense?: number;
  slots: Array<number>;
  creationMaterials: {
    upgrade?: Material[];
    craft?: Material[]; // Optional, only for weapons that can be crafted directly
  };
  treeName: string;
  canBuildDirectly?: boolean;
  upgradedFrom?: string; // ID of the weapon it upgrades from, if applicable
}

export interface WeaponTree {
  id: string;
  name: string;
  type: string;
  weapons: WeaponNode[];
}

export type ElementOrStatusType = 'fire' | 'water' | 'thunder' | 'ice' | 'dragon' | 'poison' | 'sleep' | 'paralysis' | 'blast' | 'none';

// Load all weapon trees
const weaponTrees: WeaponTree[] = [
  greatSwordData as WeaponTree,
  swordAndShieldData as WeaponTree,
  longSwordData as WeaponTree,
  hammerData as WeaponTree,
  // Add other weapon types here as they are added
];

// Utility functions

// Get weapon type info from ID
export function getWeaponTypeInfo(id: WeaponType): WeaponTypeInfo | undefined {
  return WeaponTypes.find(weapon => weapon.id === id);
}

// Get weapon tree by ID
export function getWeaponTreeById(id: WeaponType): WeaponTree | undefined {
  return weaponTrees.find(tree => tree.id === id);
}

// Get all weapon trees
export function getAllWeaponTrees(): WeaponTree[] {
  return weaponTrees;
}

// Get a weapon by its ID
export function getWeaponById(id: string): WeaponNode | null {
  for (const tree of weaponTrees) {
    const weapon = tree.weapons.find(w => w.id === id);
    if (weapon) return weapon;
  }
  return null;
}

// Get all weapons for a specific weapon type
export function getWeaponsByType(weaponType: WeaponType): WeaponNode[] {
  const tree = getWeaponTreeById(weaponType);
  return tree ? tree.weapons : [];
}

// Get weapons by tree name within a weapon type
export function getWeaponsByTreeName(weaponType: WeaponType, treeName: string): WeaponNode[] {
  const weapons = getWeaponsByType(weaponType);
  return weapons.filter(weapon => weapon.treeName === treeName);
}

// Get direct upgrades for a weapon
export function getDirectUpgrades(weaponId: string): WeaponNode[] {
  for (const tree of weaponTrees) {
    return tree.weapons.filter(weapon => weapon.upgradedFrom === weaponId);
  }
  return [];
}

// Get weapon upgrade path
export function getUpgradePath(weaponId: string): WeaponNode[] {
  const path: WeaponNode[] = [];
  let currentWeapon = getWeaponById(weaponId);

  while (currentWeapon) {
    path.push(currentWeapon);
    if (!currentWeapon.upgradedFrom) break;
    currentWeapon = getWeaponById(currentWeapon.upgradedFrom);
  }

  return path.reverse();
}

// Group weapons by tree name
export function groupWeaponsByTree(weaponType: WeaponType): Record<string, WeaponNode[]> {
  const weapons = getWeaponsByType(weaponType);
  const grouped: Record<string, WeaponNode[]> = {};

  for (const weapon of weapons) {
    if (!grouped[weapon.treeName]) {
      grouped[weapon.treeName] = [];
    }
    grouped[weapon.treeName].push(weapon);
  }

  return grouped;
}
