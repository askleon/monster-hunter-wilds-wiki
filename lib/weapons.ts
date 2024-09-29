import { greatSwordTree } from "./greatSwordTree";
import { hammerTree } from "./hammerTree";
import { longSwordTree } from "./longSwordTree";

export type PhysicalDamageType = 'blunt' | 'slashing' | 'piercing';
export type ElementType = 'fire' | 'water' | 'thunder' | 'ice' | 'dragon';
export type StatusType = 'poison' | 'paralysis' | 'sleep' | 'blast';
export interface WeaponTypeInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const WeaponTypes: WeaponTypeInfo[] = [
  {
    id: 'great-sword',
    name: 'Great Sword',
    description: 'A heavy, powerful weapon that excels in high-damage hits.',
    icon: '/icons/great-sword.svg',
  },
  {
    id: 'long-sword',
    name: 'Long Sword',
    description: 'A balanced weapon with fluid combos and counters.',
    icon: '/icons/long-sword.svg',
  },
  {
    id: 'sword-and-shield',
    name: 'Sword and Shield',
    description: 'A versatile weapon with quick attacks and defensive capabilities.',
    icon: '/icons/sword-and-shield.svg',
  },
  {
    id: 'dual-blades',
    name: 'Dual Blades',
    description: 'Fast, dual-wielding weapons that excel in rapid attacks.',
    icon: '/icons/dual-blades.svg',
  },
  {
    id: 'hammer',
    name: 'Hammer',
    description: 'A heavy blunt weapon that deals massive damage and can stun monsters.',
    icon: '/icons/hammer.svg',
  },
  {
    id: 'hunting-horn',
    name: 'Hunting Horn',
    description: 'A unique weapon that can buff allies while dealing blunt damage.',
    icon: '/icons/hunting-horn.svg',
  },
  {
    id: 'lance',
    name: 'Lance',
    description: 'A defensive weapon with long reach and powerful thrusting attacks.',
    icon: '/icons/lance.svg',
  },
  {
    id: 'gunlance',
    name: 'Gunlance',
    description: 'A hybrid weapon combining a lance with explosive shell attacks.',
    icon: '/icons/gunlance.svg',
  },
  {
    id: 'switch-axe',
    name: 'Switch Axe',
    description: 'A transforming weapon that switches between axe and sword modes.',
    icon: '/icons/switch-axe.svg',
  },
  {
    id: 'charge-blade',
    name: 'Charge Blade',
    description: 'A complex weapon that stores energy to unleash powerful attacks.',
    icon: '/icons/charge-blade.svg',
  },
  {
    id: 'insect-glaive',
    name: 'Insect Glaive',
    description: 'An agile weapon that allows for aerial combat and insect-based attacks.',
    icon: '/icons/insect-glaive.svg',
  },
  {
    id: 'light-bowgun',
    name: 'Light Bowgun',
    description: 'A ranged weapon that offers mobility and various ammunition types.',
    icon: '/icons/light-bowgun.svg',
  },
  {
    id: 'heavy-bowgun',
    name: 'Heavy Bowgun',
    description: 'A powerful ranged weapon with high damage output but lower mobility.',
    icon: '/icons/heavy-bowgun.svg',
  },
  {
    id: 'bow',
    name: 'Bow',
    description: 'A versatile ranged weapon that allows for precise and varied shots.',
    icon: '/icons/bow.svg',
  }
];

export type WeaponType = typeof WeaponTypes[number]['id'];

// Utility function to get WeaponTypeInfo from id
export function getWeaponTypeInfo(id: WeaponType): WeaponTypeInfo | undefined {
  return WeaponTypes.find(weapon => weapon.id === id);
}

// Update this function to use the new structure
export function getWeaponTreeById(id: WeaponType): WeaponTree | undefined {
  return weaponTrees.find(tree => tree.id === id);
}

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

// Remove getWeaponTypeFromUrlName function as it's no longer needed
