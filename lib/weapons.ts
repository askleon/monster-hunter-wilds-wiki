export type PhysicalDamageType = 'blunt' | 'slashing' | 'piercing';
export type ElementType = 'fire' | 'water' | 'thunder' | 'ice' | 'dragon';
export type StatusType = 'poison' | 'paralysis' | 'sleep' | 'blast';

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

const greatSwordTree: WeaponTree = {
  id: 'great-sword',
  name: 'Great Sword',
  type: 'Great Sword',
  baseWeapons: [
    {
      id: 'gs-iron-1',
      name: 'Iron Great Sword I',
      description: 'A basic great sword forged with iron.',
      stats: { attack: 100, affinity: 0, physicalType: 'slashing' },
      materials: [{ name: 'Iron Ore', quantity: 5 }],
      upgrade: {
        id: 'gs-iron-2',
        name: 'Iron Great Sword II',
        description: 'An improved iron great sword.',
        stats: { attack: 120, affinity: 0, physicalType: 'slashing' },
        materials: [
          { name: 'Iron Ore', quantity: 10 },
          { name: 'Monster Bone S', quantity: 3 }
        ],
        upgrade: {
          id: 'gs-steel-1',
          name: 'Steel Great Sword I',
          description: 'A great sword made of hardened steel.',
          stats: { attack: 150, affinity: 0, physicalType: 'slashing' },
          materials: [
            { name: 'Iron Ore', quantity: 15 },
            { name: 'Monster Bone M', quantity: 5 }
          ],
          upgrade: {
            id: 'gs-steel-2',
            name: 'Steel Great Sword II',
            description: 'A refined great sword made of high-quality steel.',
            stats: { attack: 180, affinity: 5, physicalType: 'slashing' },
            materials: [
              { name: 'Carbalite Ore', quantity: 5 },
              { name: 'Monster Bone L', quantity: 3 }
            ],
            upgrade: {
              id: 'gs-steel-3',
              name: 'Steel Great Sword III',
              description: 'A masterfully crafted steel great sword.',
              stats: { attack: 210, affinity: 10, physicalType: 'slashing' },
              materials: [
                { name: 'Fucium Ore', quantity: 5 },
                { name: 'Monster Hardbone', quantity: 3 }
              ]
            }
          }
        },
        branches: [
          {
            id: 'gs-flame-1',
            name: 'Flame Blade I',
            description: 'A great sword imbued with fire element.',
            stats: {
              attack: 140,
              affinity: 0,
              physicalType: 'slashing',
              element: { type: 'fire', value: 120 }
            },
            materials: [
              { name: 'Flame Sac', quantity: 2 },
              { name: 'Monster Bone M', quantity: 3 }
            ],
            upgrade: {
              id: 'gs-flame-2',
              name: 'Flame Blade II',
              description: 'An improved great sword with enhanced fire element.',
              stats: {
                attack: 160,
                affinity: 0,
                physicalType: 'slashing',
                element: { type: 'fire', value: 180 }
              },
              materials: [
                { name: 'Inferno Sac', quantity: 2 },
                { name: 'Rathalos Scale', quantity: 5 }
              ],
              upgrade: {
                id: 'gs-flame-3',
                name: 'Flame Blade III',
                description: 'A powerful great sword with mastery over fire.',
                stats: {
                  attack: 190,
                  affinity: 5,
                  physicalType: 'slashing',
                  element: { type: 'fire', value: 220 }
                },
                materials: [
                  { name: 'Rathalos Plate', quantity: 1 },
                  { name: 'Firecell Stone', quantity: 3 }
                ]
              },
              branches: [
                {
                  id: 'gs-blast-1',
                  name: 'Blast Buster I',
                  description: 'A great sword that harnesses explosive power.',
                  stats: {
                    attack: 170,
                    affinity: 0,
                    physicalType: 'slashing',
                    status: { type: 'blast', value: 150 }
                  },
                  materials: [
                    { name: 'Inferno Sac', quantity: 2 },
                    { name: 'Brachydios Shell', quantity: 3 },
                    { name: 'Blast Powder', quantity: 5 }
                  ],
                  upgrade: {
                    id: 'gs-blast-2',
                    name: 'Blast Buster II',
                    description: 'An improved great sword with devastating blast power.',
                    stats: {
                      attack: 200,
                      affinity: 0,
                      physicalType: 'slashing',
                      status: { type: 'blast', value: 180 }
                    },
                    materials: [
                      { name: 'Brachydios Gem', quantity: 1 },
                      { name: 'Brachydios Marrow', quantity: 3 }
                    ]
                  }
                }
              ]
            }
          },
          {
            id: 'gs-frost-1',
            name: 'Frost Edge I',
            description: 'A great sword infused with the power of ice.',
            stats: {
              attack: 130,
              affinity: 5,
              physicalType: 'slashing',
              element: { type: 'ice', value: 100 }
            },
            materials: [
              { name: 'Frost Sac', quantity: 2 },
              { name: 'Barioth Claw', quantity: 3 }
            ],
            upgrade: {
              id: 'gs-frost-2',
              name: 'Frost Edge II',
              description: 'An improved great sword with enhanced ice element.',
              stats: {
                attack: 150,
                affinity: 10,
                physicalType: 'slashing',
                element: { type: 'ice', value: 150 }
              },
              materials: [
                { name: 'Freezer Sac', quantity: 2 },
                { name: 'Barioth Tail', quantity: 1 }
              ]
            }
          }
        ]
      }
    },
    {
      id: 'gs-bone-1',
      name: 'Bone Blade I',
      description: 'A great sword crafted from monster bones.',
      stats: { attack: 110, affinity: 0, physicalType: 'slashing' },
      materials: [{ name: 'Monster Bone S', quantity: 5 }],
      upgrade: {
        id: 'gs-bone-2',
        name: 'Bone Blade II',
        description: 'An improved bone great sword.',
        stats: { attack: 130, affinity: 0, physicalType: 'slashing' },
        materials: [
          { name: 'Monster Bone M', quantity: 5 },
          { name: 'Boulder Bone', quantity: 3 }
        ],
        upgrade: {
          id: 'gs-bone-3',
          name: 'Bone Blade III',
          description: 'A sturdy great sword made from large monster bones.',
          stats: { attack: 160, affinity: 0, physicalType: 'slashing' },
          materials: [
            { name: 'Monster Bone L', quantity: 5 },
            { name: 'Quality Bone', quantity: 3 }
          ],
          branches: [
            {
              id: 'gs-jaw-1',
              name: "Wyvern's Jaw I",
              description: 'A powerful great sword crafted from wyvern fangs.',
              stats: { attack: 190, affinity: -10, physicalType: 'slashing' },
              materials: [
                { name: 'Wyvern Fang', quantity: 5 },
                { name: 'Monster Hardbone', quantity: 3 }
              ],
              upgrade: {
                id: 'gs-jaw-2',
                name: "Wyvern's Jaw II",
                description: 'An improved great sword with razor-sharp wyvern fangs.',
                stats: { attack: 220, affinity: -10, physicalType: 'slashing' },
                materials: [
                  { name: 'Wyvern Gem', quantity: 1 },
                  { name: 'Brutal Bone', quantity: 5 }
                ]
              }
            },
            {
              id: 'gs-thunder-1',
              name: 'Thunder Blade I',
              description: 'A bone great sword imbued with thunder element.',
              stats: {
                attack: 170,
                affinity: 0,
                physicalType: 'slashing',
                element: { type: 'thunder', value: 130 }
              },
              materials: [
                { name: 'Electro Sac', quantity: 2 },
                { name: 'Zinogre Shell', quantity: 3 }
              ],
              upgrade: {
                id: 'gs-thunder-2',
                name: 'Thunder Blade II',
                description: 'An improved great sword with enhanced thunder element.',
                stats: {
                  attack: 200,
                  affinity: 0,
                  physicalType: 'slashing',
                  element: { type: 'thunder', value: 180 }
                },
                materials: [
                  { name: 'Thunder Sac', quantity: 2 },
                  { name: 'Zinogre Plate', quantity: 1 }
                ]
              }
            }
          ]
        }
      }
    }
  ]
};

const longSwordTree: WeaponTree = {
  id: 'long-sword',
  name: 'Long Sword',
  type: 'Long Sword',
  baseWeapons: [
    {
      id: 'ls-1',
      name: 'Iron Katana I',
      description: 'A basic long sword forged with iron.',
      stats: { attack: 80, affinity: 0, physicalType: 'slashing' },
      materials: [{ name: 'Iron Ore', quantity: 5 }],
      upgrade: {
        id: 'ls-2',
        name: 'Iron Katana II',
        description: 'An improved iron long sword.',
        stats: { attack: 100, affinity: 0, physicalType: 'slashing' },
        materials: [
          { name: 'Iron Ore', quantity: 10 },
          { name: 'Monster Bone S', quantity: 3 }
        ],
        upgrade: {
          id: 'ls-3a',
          name: 'Iron Katana III',
          description: 'A further improved iron long sword.',
          stats: { attack: 120, affinity: 0, physicalType: 'slashing' },
          materials: [
            { name: 'Iron Ore', quantity: 15 },
            { name: 'Monster Bone M', quantity: 5 }
          ],
          upgrade: {
            id: 'ls-4a',
            name: 'Iron Katana IV',
            description: 'A masterfully crafted iron long sword.',
            stats: { attack: 140, affinity: 5, physicalType: 'slashing' },
            materials: [
              { name: 'Carbalite Ore', quantity: 8 },
              { name: 'Dragonite Ore', quantity: 5 }
            ]
          }
        },
        branches: [
          {
            id: 'ls-3b',
            name: 'Thunderblade I',
            description: 'A long sword imbued with thunder element.',
            stats: {
              attack: 110,
              affinity: 0,
              physicalType: 'slashing',
              element: { type: 'thunder', value: 150 }
            },
            materials: [
              { name: 'Electro Sac', quantity: 2 },
              { name: 'Monster Bone M', quantity: 3 }
            ],
            upgrade: {
              id: 'ls-4b',
              name: 'Thunderblade II',
              description: 'An improved long sword with enhanced thunder element.',
              stats: {
                attack: 130,
                affinity: 0,
                physicalType: 'slashing',
                element: { type: 'thunder', value: 200 }
              },
              materials: [
                { name: 'Lightning Sac', quantity: 3 },
                { name: 'Khezu Hide', quantity: 5 }
              ]
            }
          },
          {
            id: 'ls-3c',
            name: 'Poison Serpentblade',
            description: 'A long sword imbued with deadly poison.',
            stats: {
              attack: 100,
              affinity: 0,
              physicalType: 'slashing',
              status: { type: 'poison', value: 180 }
            },
            materials: [
              { name: 'Poison Sac', quantity: 3 },
              { name: 'Pukei-Pukei Scale', quantity: 5 }
            ]
          }
        ]
      }
    }
  ]
};

const hammerTree: WeaponTree = {
  id: 'hammer',
  name: 'Hammer',
  type: 'Hammer',
  baseWeapons: [
    {
      id: 'hm-1',
      name: 'Iron Hammer I',
      description: 'A basic hammer forged with iron.',
      stats: { attack: 90, affinity: 0, physicalType: 'blunt' },
      materials: [{ name: 'Iron Ore', quantity: 5 }],
      upgrade: {
        id: 'hm-2',
        name: 'Iron Hammer II',
        description: 'An improved iron hammer.',
        stats: { attack: 110, affinity: 0, physicalType: 'blunt' },
        materials: [
          { name: 'Iron Ore', quantity: 10 },
          { name: 'Monster Bone S', quantity: 3 }
        ],
        branches: [
          {
            id: 'hm-3a',
            name: 'War Hammer I',
            description: 'A powerful hammer made for war.',
            stats: { attack: 140, affinity: 0, physicalType: 'blunt' },
            materials: [
              { name: 'Iron Ore', quantity: 15 },
              { name: 'Monster Bone M', quantity: 5 }
            ]
          },
          {
            id: 'hm-3b',
            name: 'Frozen Core I',
            description: 'A hammer imbued with ice element.',
            stats: {
              attack: 130,
              affinity: 0,
              physicalType: 'blunt',
              element: { type: 'ice', value: 140 }
            },
            materials: [
              { name: 'Frost Sac', quantity: 2 },
              { name: 'Monster Bone M', quantity: 3 }
            ]
          }
        ]
      }
    }
  ]
};

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
