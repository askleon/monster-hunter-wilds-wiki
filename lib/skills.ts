export interface Skill {
  id: string;
  name: string;
  maxLevel: number;
  description: string;
  effects: SkillEffect[];
}

interface SkillEffect {
  level: number;
  description: string;
}

export interface SetBonus {
  id: string;
  name: string;
  skills: SetBonusSkill[];
}

interface SetBonusSkill {
  skillId: string;
  requiredPieces: number;
}

export const skills: Record<string, Skill> = {
  attackBoost: {
    id: 'attackBoost',
    name: 'Attack Boost',
    maxLevel: 7,
    description: 'Increases attack power.',
    effects: [
      { level: 1, description: 'Attack +3' },
      { level: 4, description: 'Attack +5%, Bonus: +5' },
      { level: 7, description: 'Attack +10%, Bonus: +8' },
    ]
  },
  criticalEye: {
    id: 'criticalEye',
    name: 'Critical Eye',
    maxLevel: 7,
    description: 'Increases affinity.',
    effects: [
      { level: 1, description: 'Affinity +5%' },
      { level: 4, description: 'Affinity +15%' },
      { level: 7, description: 'Affinity +40%' },
    ]
  },
  poisonResistance: {
    id: 'poisonResistance',
    name: 'Poison Resistance',
    maxLevel: 3,
    description: 'Reduces damage from poison.',
    effects: [
      { level: 1, description: 'Reduces the duration of poison by 30%' },
      { level: 3, description: 'Prevents poison' },
    ]
  },
  botanist: {
    id: 'botanist',
    name: 'Botanist',
    maxLevel: 4,
    description: 'Increases the quantity of herbs and other consumable items you gather.',
    effects: [
      { level: 1, description: 'Increases the quantity of herbs gathered by 1' },
      { level: 4, description: 'Increases the quantity of herbs gathered by 2' },
    ]
  },
  poisonAttack: {
    id: 'poisonAttack',
    name: 'Poison Attack',
    maxLevel: 3,
    description: 'Increases the potency of poison attacks.',
    effects: [
      { level: 1, description: 'Poison buildup +5%, Poison damage +10%' },
      { level: 3, description: 'Poison buildup +20%, Poison damage +20%' },
    ]
  },
  itemProlonger: {
    id: 'itemProlonger',
    name: 'Item Prolonger',
    maxLevel: 3,
    description: 'Extends the duration of some item effects.',
    effects: [
      { level: 1, description: 'Item effect duration +10%' },
      { level: 3, description: 'Item effect duration +50%' },
    ]
  },
  sporepuffExpert: {
    id: 'sporepuffExpert',
    name: 'Sporepuff Expert',
    maxLevel: 3,
    description: 'Increases the effectiveness of Sporepuffs.',
    effects: [
      { level: 1, description: 'Slightly increases Sporepuff effectiveness' },
      { level: 3, description: 'Greatly increases Sporepuff effectiveness' },
    ]
  },
  fireAttack: {
    id: 'fireAttack',
    name: 'Fire Attack',
    maxLevel: 5,
    description: 'Increases fire element attack power.',
    effects: [
      { level: 1, description: 'Fire attack +30' },
      { level: 5, description: 'Fire attack +100, +5%' },
    ]
  },
  weaknessExploit: {
    id: 'weaknessExploit',
    name: 'Weakness Exploit',
    maxLevel: 3,
    description: 'Increases affinity for weak spots.',
    effects: [
      { level: 1, description: 'Affinity +15% for weak spots' },
      { level: 3, description: 'Affinity +50% for weak spots' },
    ]
  },
  jumpMaster: {
    id: 'jumpMaster',
    name: 'Jump Master',
    maxLevel: 1,
    description: 'Prevents attacks from knocking you back during a jump.',
    effects: [
      { level: 1, description: 'Prevents knockback during jumps' },
    ]
  },
  speedSharpening: {
    id: 'speedSharpening',
    name: 'Speed Sharpening',
    maxLevel: 3,
    description: 'Speeds up weapon sharpening.',
    effects: [
      { level: 1, description: 'Removes 1 cycle from the sharpening process' },
      { level: 3, description: 'Removes 3 cycles from the sharpening process' },
    ]
  },
  constitution: {
    id: 'constitution',
    name: 'Constitution',
    maxLevel: 5,
    description: 'Reduces stamina depletion for actions other than running.',
    effects: [
      { level: 1, description: 'Stamina depletion -10%' },
      { level: 5, description: 'Stamina depletion -50%' },
    ]
  },
  fortify: {
    id: 'fortify',
    name: 'Fortify',
    maxLevel: 1,
    description: 'Increases your attack and defense when you fall in battle.',
    effects: [
      { level: 1, description: 'Attack +10% and defense +15% with each use' },
    ]
  },
  criticalElement: {
    id: 'criticalElement',
    name: 'Critical Element',
    maxLevel: 3,
    description: 'Increases elemental damage when landing critical hits.',
    effects: [
      { level: 1, description: 'Slightly increases elemental damage on critical hits' },
      { level: 3, description: 'Greatly increases elemental damage on critical hits' },
    ]
  },
  evadeWindow: {
    id: 'evadeWindow',
    name: 'Evade Window',
    maxLevel: 5,
    description: 'Extends the invulnerability period when evading.',
    effects: [
      { level: 1, description: 'Slightly increases invulnerability window' },
      { level: 5, description: 'Greatly increases invulnerability window' },
    ]
  },
  trueCriticalElement: {
    id: 'trueCriticalElement',
    name: 'True Critical Element',
    maxLevel: 1,
    description: 'Further increases elemental damage when landing critical hits.',
    effects: [
      { level: 1, description: 'Greatly increases elemental damage on critical hits' },
    ]
  },
  focus: {
    id: 'focus',
    name: 'Focus',
    maxLevel: 3,
    description: 'Increases the fill rate for weapons with gauges and the charge rate for weapons with charge attacks.',
    effects: [
      { level: 1, description: 'Charge rate +5%' },
      { level: 3, description: 'Charge rate +20%' },
    ]
  },
  rathalosMastery: {
    id: 'rathalosMastery',
    name: 'Rathalos Mastery',
    maxLevel: 1,
    description: 'Rathalos set bonus skill.',
    effects: [
      { level: 1, description: 'Activates set bonus effect' },
    ]
  },
  odogaronMastery: {
    id: 'odogaronMastery',
    name: 'Odogaron Mastery',
    maxLevel: 1,
    description: 'Odogaron set bonus skill.',
    effects: [
      { level: 1, description: 'Activates set bonus effect' },
    ]
  },
};

export const setBonuses: Record<string, SetBonus> = {
  rathalosWill: {
    id: 'rathalosWill',
    name: 'Rathalos Mastery',
    skills: [
      { skillId: 'mindEye', requiredPieces: 2 },
      { skillId: 'criticalElement', requiredPieces: 4 },
    ]
  },
  odogaronPower: {
    id: 'odogaronPower',
    name: 'Odogaron Mastery',
    skills: [
      { skillId: 'punishingDraw', requiredPieces: 2 },
      { skillId: 'protectivePolish', requiredPieces: 4 },
    ]
  },
  // Add more set bonuses here...
};

export function getSkillById(id: string): Skill | undefined {
  return skills[id];
}

export function getSetBonusById(id: string): SetBonus | undefined {
  return setBonuses[id];
}

export function getAllSkills(): Skill[] {
  return Object.values(skills);
}

export function getAllSetBonuses(): SetBonus[] {
  return Object.values(setBonuses);
}
