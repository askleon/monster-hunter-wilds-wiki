import { WeaponTree } from "./weapons";

export const swordAndShieldTree: WeaponTree = {
  id: 'sword-and-shield',
  name: 'Sword and Shield',
  type: 'Sword and Shield',
  baseWeapons: [
    // Iron tree
    {
      id: 'sns-iron-1',
      name: 'Iron Sword I',
      description: 'A basic sword and shield forged with iron.',
      stats: { attack: 80, affinity: 0, physicalType: 'slashing' },
      materials: [{ name: 'Iron Ore', quantity: 3 }],
      upgrade: {
        id: 'sns-iron-2',
        name: 'Iron Sword II',
        description: 'An improved iron sword and shield.',
        stats: { attack: 100, affinity: 0, physicalType: 'slashing' },
        materials: [
          { name: 'Iron Ore', quantity: 5 },
          { name: 'Monster Bone S', quantity: 2 }
        ],
        // ... further upgrades ...
      }
    },
    // Bone tree
    {
      id: 'sns-bone-1',
      name: 'Bone Sword I',
      description: 'A sword and shield crafted from monster bones.',
      stats: { attack: 90, affinity: 0, physicalType: 'slashing' },
      materials: [{ name: 'Monster Bone S', quantity: 3 }],
      upgrade: {
        id: 'sns-bone-2',
        name: 'Bone Sword II',
        description: 'An improved bone sword and shield.',
        stats: { attack: 110, affinity: 0, physicalType: 'slashing' },
        materials: [
          { name: 'Monster Bone M', quantity: 3 },
          { name: 'Boulder Bone', quantity: 2 }
        ],
        // ... further upgrades ...
      }
    },
    // Pukei-Pukei tree
    {
      id: 'sns-pukei-1',
      name: 'Pukei Sword I',
      description: 'A sword and shield made from Pukei-Pukei parts, imbued with poison.',
      stats: {
        attack: 130,
        affinity: 0,
        physicalType: 'slashing',
        status: { type: 'poison', value: 180 }
      },
      materials: [
        { name: 'Pukei-Pukei Scale', quantity: 3 },
        { name: 'Pukei-Pukei Quill', quantity: 2 },
        { name: 'Poison Sac', quantity: 1 }
      ],
      upgrade: {
        id: 'sns-pukei-2',
        name: 'Pukei Sword II',
        description: 'An improved Pukei-Pukei sword and shield with enhanced poison.',
        stats: {
          attack: 160,
          affinity: 0,
          physicalType: 'slashing',
          status: { type: 'poison', value: 210 }
        },
        materials: [
          { name: 'Pukei-Pukei Scale+', quantity: 3 },
          { name: 'Pukei-Pukei Wing', quantity: 2 },
          { name: 'Toxin Sac', quantity: 1 }
        ],
        upgrade: {
          id: 'sns-pukei-3',
          name: 'Datura Blossom',
          description: 'A deadly Pukei-Pukei sword and shield with potent poison.',
          stats: {
            attack: 190,
            affinity: 0,
            physicalType: 'slashing',
            status: { type: 'poison', value: 240 }
          },
          materials: [
            { name: 'Pukei-Pukei Cortex', quantity: 3 },
            { name: 'Pukei-Pukei Sac+', quantity: 2 },
            { name: 'Pukei-Pukei Gem', quantity: 1 }
          ]
        }
      }
    }
    // ... other base weapons ...
  ]
};
