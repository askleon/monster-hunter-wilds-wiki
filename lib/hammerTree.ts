import { WeaponTree } from "./weapons";

export const hammerTree: WeaponTree = {
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
