import { WeaponTree, WeaponNode } from "./weapons";

const oreSwordTree: WeaponNode[] = [
  {
    id: 'iron-sword-1',
    name: 'Iron Sword I',
    description: 'A basic Great Sword forged with iron.',
    rarity: 1,
    attack: 80,
    sharpness: {
      red: 40,
      orange: 30,
      yellow: 20,
      green: 0,
      blue: 0,
      white: 0,
      purple: 0,
      parenthesis: {
        color: 'yellow',
        value: 10
      }
    },
    slots: [],
    creationMaterials: {
      craft: [
        { name: 'Iron Ore', quantity: 1 },
      ],
    },
    treeName: 'Ore Tree',
    canBuildDirectly: true,
  },
  {
    id: 'steel-sword',
    name: 'Steel Sword',
    description: 'An improved Great Sword made with refined steel.',
    rarity: 1,
    attack: 100,
    sharpness: {
      red: 40,
      orange: 20,
      yellow: 30,
      green: 0,
      blue: 0,
      white: 0,
      purple: 0,
      parenthesis: {
        color: 'yellow',
        value: 10
      }
    },
    slots: [],
    creationMaterials: {
      upgrade: [
        { name: 'Iron Ore', quantity: 2 },
        { name: 'Monster Bone S', quantity: 1 },
      ],
    },
    treeName: 'Ore Tree',
    canBuildDirectly: false,
    upgradedFrom: 'iron-sword-1',
  },
  {
    id: 'buster-sword-1',
    name: 'Buster Sword I',
    description: 'A heavy Great Sword that sacrifices speed for raw power.',
    rarity: 2,
    attack: 110,
    sharpness: {
      red: 20,
      orange: 20,
      yellow: 20,
      green: 10,
      blue: 0,
      white: 0,
      purple: 0,
      parenthesis: {
        color: 'green',
        value: 10
      }
    },
    slots: [],
    creationMaterials: {
      upgrade: [
        { name: 'Machalite Ore', quantity: 2 },
        { name: 'Monster Bone M', quantity: 1 },
      ],
    },
    treeName: 'Ore Tree',
    canBuildDirectly: false,
    upgradedFrom: 'steel-sword',
  },
  {
    id: 'chrome-razor-1',
    name: 'Chrome Razor I',
    description: 'A Great Sword made with high-quality chrome, known for its sharpness.',
    rarity: 4,
    attack: 160,
    sharpness: {
      red: 20,
      orange: 20,
      yellow: 30,
      green: 20,
      blue: 0,
      white: 0,
      purple: 0,
      parenthesis: {
        color: 'blue',
        value: 10
      }
    },
    elementOrStatus: {
      type: 'poison',
      value: 35
    },
    slots: [1, 1],
    creationMaterials: {
      craft: [
        { name: 'Dragonite Ore', quantity: 3 },
        { name: 'Toxin Sac', quantity: 2 },
        { name: 'Monster Bone+', quantity: 2 },
      ],
      upgrade: [
        { name: 'Dragonite Ore', quantity: 2 },
        { name: 'Toxin Sac', quantity: 1 },
        { name: 'Monster Bone+', quantity: 1 },
      ],
    },
    treeName: 'Ore Tree',
    canBuildDirectly: true,
    upgradedFrom: 'buster-sword-1',
  },
  {
    id: 'chrome-quietus',
    name: 'Chrome Quietus',
    description: 'An advanced Great Sword that can fell monsters with a single, poisonous strike.',
    rarity: 5,
    attack: 180,
    sharpness: {
      red: 30,
      orange: 10,
      yellow: 30,
      green: 20,
      blue: 10,
      white: 0,
      purple: 0,
      parenthesis: {
        color: 'white',
        value: 10
      }
    },
    elementOrStatus: {
      type: 'poison',
      value: 40
    },
    affinity: 0,
    slots: [1, 1],
    creationMaterials: {
      upgrade: [
        { name: 'Carbalite Ore', quantity: 3 },
        { name: 'Deadly Poison Sac', quantity: 2 },
        { name: 'Monster Hardbone', quantity: 2 },
      ],
    },
    treeName: 'Ore Tree',
    canBuildDirectly: false,
    upgradedFrom: 'chrome-razor-1',
  },
  {
    id: 'chrome-hell',
    name: 'Chrome Hell',
    description: 'A Great Sword forged in hellfire, its poisonous edge gleams with malevolent intent.',
    rarity: 8,
    attack: 240,
    sharpness: {
      red: 30,
      orange: 10,
      yellow: 30,
      green: 30,
      blue: 20,
      white: 0,
      purple: 0,
      parenthesis: {
        color: 'white',
        value: 10
      }
    },
    elementOrStatus: {
      type: 'poison',
      value: 43
    },
    affinity: 10,
    slots: [1, 1],
    creationMaterials: {
      upgrade: [
        { name: 'Fucium Ore', quantity: 5 },
        { name: 'Deadly Poison Sac', quantity: 3 },
        { name: 'Elder Dragon Blood', quantity: 2 },
        { name: 'Firecell Stone', quantity: 1 },
      ],
    },
    treeName: 'Ore Tree',
    canBuildDirectly: false,
    upgradedFrom: 'chrome-quietus',
  },
  {
    id: 'chrome-hell-plus',
    name: 'Chrome Hell+',
    description: 'An upgraded Chrome Hell, its venomous blade thirsts for more powerful prey.',
    rarity: 8,
    attack: 280,
    sharpness: {
      red: 30,
      orange: 10,
      yellow: 30,
      green: 20,
      blue: 20,
      white: 0,
      purple: 0,
      parenthesis: {
        color: 'white',
        value: 10
      }
    },
    elementOrStatus: {
      type: 'poison',
      value: 47
    },
    affinity: 10,
    defense: 0,
    slots: [1, 1],
    creationMaterials: {
      upgrade: [
        { name: 'Pure Crystal', quantity: 3 },
        { name: 'Deadly Poison Sac', quantity: 5 },
        { name: 'Elder Dragon Bone', quantity: 2 },
        { name: 'Firecell Stone', quantity: 2 },
      ],
    },
    treeName: 'Ore Tree',
    canBuildDirectly: false,
    upgradedFrom: 'chrome-hell',
  },
  {
    id: 'chrome-heaven',
    name: 'Chrome Heaven',
    description: 'The ultimate chrome blade, its divine edge brings swift judgment to all it faces.',
    rarity: 10,
    attack: 340,
    sharpness: {
      red: 20,
      orange: 10,
      yellow: 30,
      green: 20,
      blue: 20,
      white: 10,
      purple: 0,
      parenthesis: {
        color: 'white',
        value: 20
      }
    },
    elementOrStatus: {
      type: 'poison',
      value: 51
    },
    affinity: 10,
    slots: [1, 1, 1],
    creationMaterials: {
      upgrade: [
        { name: 'Large Elder Dragon Gem', quantity: 1 },
        { name: 'Pure Dragon Blood', quantity: 3 },
        { name: 'Eternal Crystal', quantity: 5 },
        { name: 'Skymerald', quantity: 1 },
      ],
    },
    treeName: 'Ore Tree',
    canBuildDirectly: false,
    upgradedFrom: 'chrome-hell-plus',
  }
];

const boneSwordTree: WeaponNode[] = [
  {
    id: 'bone-blade-1',
    name: 'Bone Blade I',
    description: 'A basic Great Sword crafted from monster bones.',
    rarity: 1,
    attack: 90,
    sharpness: {
      red: 50,
      orange: 30,
      yellow: 10,
      green: 0,
      blue: 0,
      white: 0,
      purple: 0,
      parenthesis: {
        color: 'yellow',
        value: 10
      }
    },
    slots: [],
    creationMaterials: {
      craft: [
        { name: 'Monster Bone S', quantity: 1 },
        { name: 'Bone', quantity: 1 },
      ],
    },
    treeName: 'Bone Tree',
    canBuildDirectly: true,
  },
  {
    id: 'bone-blade-2',
    name: 'Bone Blade II',
    description: 'An improved Great Sword made from sturdier monster bones.',
    rarity: 2,
    attack: 110,
    sharpness: {
      red: 40,
      orange: 30,
      yellow: 20,
      green: 0,
      blue: 0,
      white: 0,
      purple: 0,
      parenthesis: {
        color: 'green',
        value: 10
      }
    },
    slots: [],
    creationMaterials: {
      upgrade: [
        { name: 'Monster Bone M', quantity: 2 },
        { name: 'Bone', quantity: 2 },
      ],
    },
    treeName: 'Bone Tree',
    canBuildDirectly: false,
    upgradedFrom: 'bone-blade-1',
  },
  {
    id: 'jawblade-1',
    name: 'Jawblade I',
    description: 'A Great Sword made from monster fangs, known for its jagged edge.',
    rarity: 3,
    attack: 140,
    sharpness: {
      red: 30,
      orange: 30,
      yellow: 30,
      green: 10,
      blue: 0,
      white: 0,
      purple: 0,
      parenthesis: {
        color: 'blue',
        value: 10
      }
    },
    slots: [1],
    creationMaterials: {
      upgrade: [
        { name: 'Monster Bone L', quantity: 2 },
        { name: 'Sharp Fang', quantity: 3 },
        { name: 'Monster Bone+', quantity: 2 },
      ],
    },
    treeName: 'Bone Tree',
    canBuildDirectly: false,
    upgradedFrom: 'bone-blade-2',
  },
];

export const greatSwordTree: WeaponTree = {
  id: 'great-sword',
  name: 'Great Sword',
  type: 'Great Sword',
  weapons: oreSwordTree.concat(boneSwordTree),
};
