import { WeaponTree } from "./weapons";


export const greatSwordTree: WeaponTree = {
  id: 'great-sword',
  name: 'Great Sword',
  type: 'Great Sword',
  baseWeapons: [
    // Iron tree (existing)
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
              id: 'gs-chrome-1',
              name: 'Chrome Blade I',
              description: 'A great sword with a gleaming chrome finish.',
              stats: { attack: 210, affinity: 10, physicalType: 'slashing' },
              materials: [
                { name: 'Fucium Ore', quantity: 5 },
                { name: 'Monster Hardbone', quantity: 3 }
              ],
              upgrade: {
                id: 'gs-chrome-2',
                name: 'Chrome Blade II',
                description: 'The ultimate evolution of the iron great sword line.',
                stats: { attack: 230, affinity: 15, physicalType: 'slashing' },
                materials: [
                  { name: 'Pure Crystal', quantity: 3 },
                  { name: 'Eltalite Ore', quantity: 5 }
                ]
              }
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
              }
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
              ],
              upgrade: {
                id: 'gs-frost-3',
                name: 'Frost Edge III',
                description: 'A great sword that embodies the bitter cold of a blizzard.',
                stats: {
                  attack: 180,
                  affinity: 15,
                  physicalType: 'slashing',
                  element: { type: 'ice', value: 200 }
                },
                materials: [
                  { name: 'Barioth Gem', quantity: 1 },
                  { name: 'Cryo Sac', quantity: 3 }
                ]
              }
            }
          },
          {
            id: 'gs-poison-1',
            name: 'Poison Edge I',
            description: 'A great sword infused with deadly poison.',
            stats: {
              attack: 140,
              affinity: 0,
              physicalType: 'slashing',
              status: { type: 'poison', value: 150 }
            },
            materials: [
              { name: 'Pukei-Pukei Scale', quantity: 3 },
              { name: 'Poison Sac', quantity: 2 }
            ],
            upgrade: {
              id: 'gs-poison-2',
              name: 'Poison Edge II',
              description: 'An improved great sword with enhanced poison element.',
              stats: {
                attack: 170,
                affinity: 0,
                physicalType: 'slashing',
                status: { type: 'poison', value: 180 }
              },
              materials: [
                { name: 'Pukei-Pukei Scale+', quantity: 3 },
                { name: 'Toxin Sac', quantity: 2 }
              ]
            }
          }
        ]
      }
    },
    // Bone tree (existing)
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
    },
    // Jagras tree (existing)
    {
      id: 'gs-jagras-1',
      name: 'Jagras Blade I',
      description: 'A great sword made from Great Jagras parts.',
      stats: { attack: 120, affinity: 0, physicalType: 'slashing' },
      materials: [
        { name: 'Great Jagras Hide', quantity: 3 },
        { name: 'Great Jagras Claw', quantity: 2 }
      ],
      upgrade: {
        id: 'gs-jagras-2',
        name: 'Jagras Blade II',
        description: 'An improved great sword made from Great Jagras parts.',
        stats: { attack: 150, affinity: 0, physicalType: 'slashing' },
        materials: [
          { name: 'Great Jagras Hide+', quantity: 3 },
          { name: 'Great Jagras Claw+', quantity: 2 }
        ],
        upgrade: {
          id: 'gs-jagras-3',
          name: 'Jagras Deathclaw',
          description: 'A powerful great sword that embodies the ferocity of Great Jagras.',
          stats: { attack: 180, affinity: 0, physicalType: 'slashing' },
          materials: [
            { name: 'Great Jagras Hardclaw', quantity: 3 },
            { name: 'Great Jagras Mane', quantity: 2 }
          ]
        }
      }
    },
    // New: Rathalos tree
    {
      id: 'gs-rathalos-1',
      name: 'Rathalos Firesword I',
      description: 'A great sword that channels the power of Rathalos.',
      stats: {
        attack: 190,
        affinity: 0,
        physicalType: 'slashing',
        element: { type: 'fire', value: 150 }
      },
      materials: [
        { name: 'Rathalos Scale+', quantity: 3 },
        { name: 'Rathalos Wing', quantity: 2 },
        { name: 'Rathalos Plate', quantity: 1 }
      ],
      upgrade: {
        id: 'gs-rathalos-2',
        name: 'Rathalos Firesword II',
        description: 'An improved Rathalos great sword with enhanced fire element.',
        stats: {
          attack: 220,
          affinity: 5,
          physicalType: 'slashing',
          element: { type: 'fire', value: 180 }
        },
        materials: [
          { name: 'Rathalos Medulla', quantity: 1 },
          { name: 'Rathalos Ruby', quantity: 1 }
        ]
      }
    },
    // New: Nargacuga tree
    {
      id: 'gs-narga-1',
      name: 'Hidden Blade I',
      description: 'A sleek great sword made from Nargacuga parts.',
      stats: {
        attack: 180,
        affinity: 20,
        physicalType: 'slashing'
      },
      materials: [
        { name: 'Nargacuga Scale+', quantity: 3 },
        { name: 'Nargacuga Tail', quantity: 1 }
      ],
      upgrade: {
        id: 'gs-narga-2',
        name: 'Hidden Blade II',
        description: 'An improved Nargacuga great sword with higher affinity.',
        stats: {
          attack: 200,
          affinity: 30,
          physicalType: 'slashing'
        },
        materials: [
          { name: 'Nargacuga Medulla', quantity: 1 },
          { name: 'Nargacuga Cutwing', quantity: 2 }
        ]
      }
    },
    // New: Zinogre tree
    {
      id: 'gs-zinogre-1',
      name: "Usurper's Storm I",
      description: "A great sword that crackles with Zinogre's lightning.",
      stats: {
        attack: 190,
        affinity: 0,
        physicalType: 'slashing',
        element: { type: 'thunder', value: 180 }
      },
      materials: [
        { name: 'Zinogre Shell', quantity: 3 },
        { name: 'Zinogre Electrofur', quantity: 2 },
        { name: 'Zinogre Plate', quantity: 1 }
      ],
      upgrade: {
        id: 'gs-zinogre-2',
        name: "Usurper's Storm II",
        description: 'An improved Zinogre great sword with enhanced thunder element.',
        stats: {
          attack: 220,
          affinity: 5,
          physicalType: 'slashing',
          element: { type: 'thunder', value: 220 }
        },
        materials: [
          { name: 'Zinogre Cortex', quantity: 3 },
          { name: 'Zinogre Skymerald', quantity: 1 }
        ]
      }
    }
  ]
};
