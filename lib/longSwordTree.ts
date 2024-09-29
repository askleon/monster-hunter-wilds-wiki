import { WeaponTree } from "./weapons";

export const longSwordTree: WeaponTree = {
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
