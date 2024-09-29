import { greatSwordTree } from "./greatSwordTree";
import { hammerTree } from "./hammerTree";
import { longSwordTree } from "./longSwordTree";

export type PhysicalDamageType = 'blunt' | 'slashing' | 'piercing';
export type ElementType = 'fire' | 'water' | 'thunder' | 'ice' | 'dragon';
export type StatusType = 'poison' | 'paralysis' | 'sleep' | 'blast';
export type WeaponType =
  | 'Great Sword'
  | 'Long Sword'
  | 'Sword and Shield'
  | 'Dual Blades'
  | 'Hammer'
  | 'Hunting Horn'
  | 'Lance'
  | 'Gunlance'
  | 'Switch Axe'
  | 'Charge Blade'
  | 'Insect Glaive'
  | 'Light Bowgun'
  | 'Heavy Bowgun'
  | 'Bow';

export interface WeaponStats {
  attack: number;
  affinity: number;
  physicalType: PhysicalDamageType;
  element?: {
    type: ElementType;
    value: number;
  };
  status?: {
    type: StatusType;
    value: number;
  };
}

export interface Material {
  name: string;
  quantity: number;
}

export interface WeaponNode {
  id: string;
  name: string;
  description: string;
  stats: WeaponStats;
  materials: Material[];
  upgrade?: WeaponNode;
  branches?: WeaponNode[];
}

export interface WeaponTree {
  id: string;
  name: string;
  type: string;
  baseWeapons: WeaponNode[];
}

const weaponTrees: WeaponTree[] = [greatSwordTree, longSwordTree, hammerTree];

export function getAllWeaponTrees(): WeaponTree[] {
  return weaponTrees;
}

export function getWeaponTreeById(id: string): WeaponTree | undefined {
  return weaponTrees.find(tree => tree.id === id);
}

export function getWeaponById(id: string): WeaponNode | null {
  for (const tree of weaponTrees) {
    const findWeapon = (node: WeaponNode): WeaponNode | null => {
      if (node.id === id) return node;
      if (node.upgrade) {
        const found = findWeapon(node.upgrade);
        if (found) return found;
      }
      if (node.branches) {
        for (const branch of node.branches) {
          const found = findWeapon(branch);
          if (found) return found;
        }
      }
      return null;
    };
    for (const baseWeapon of tree.baseWeapons) {
      const weapon = findWeapon(baseWeapon);
      if (weapon) return weapon;
    }
  }
  return null;
}
