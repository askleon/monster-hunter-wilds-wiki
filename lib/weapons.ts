export interface WeaponStats {
  attack: number;
  affinity: number;
  element?: {
    type: string;
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
  children: WeaponNode[];
}

export interface WeaponTree {
  id: string;
  name: string;
  type: string;
  baseWeapon: WeaponNode;
}

const greatSwordTree: WeaponTree = {
  id: 'great-sword',
  name: 'Great Sword',
  type: 'Great Sword',
  baseWeapon: {
    id: 'gs-1',
    name: 'Iron Great Sword I',
    description: 'A basic great sword forged with iron.',
    stats: { attack: 100, affinity: 0 },
    materials: [{ name: 'Iron Ore', quantity: 5 }],
    children: [
      {
        id: 'gs-2',
        name: 'Iron Great Sword II',
        description: 'An improved iron great sword.',
        stats: { attack: 120, affinity: 0 },
        materials: [
          { name: 'Iron Ore', quantity: 10 },
          { name: 'Monster Bone S', quantity: 3 }
        ],
        children: [
          {
            id: 'gs-3a',
            name: 'Steel Great Sword I',
            description: 'A great sword made of hardened steel.',
            stats: { attack: 150, affinity: 0 },
            materials: [
              { name: 'Iron Ore', quantity: 15 },
              { name: 'Monster Bone M', quantity: 5 }
            ],
            children: []
          },
          {
            id: 'gs-3b',
            name: 'Flame Blade I',
            description: 'A great sword imbued with fire element.',
            stats: { 
              attack: 140, 
              affinity: 0,
              element: { type: 'Fire', value: 120 }
            },
            materials: [
              { name: 'Flame Sac', quantity: 2 },
              { name: 'Monster Bone M', quantity: 3 }
            ],
            children: []
          }
        ]
      }
    ]
  }
};

const weaponTrees: WeaponTree[] = [greatSwordTree];
// Add more weapon trees here

export function getAllWeaponTrees(): WeaponTree[] {
  return weaponTrees;
}

export function getWeaponTreeById(id: string): WeaponTree | undefined {
  return weaponTrees.find(tree => tree.id === id);
}
