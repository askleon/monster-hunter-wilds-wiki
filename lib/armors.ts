import armorData from '../data/armors/armors.json';
import armorSkillData from '../data/armors/armorSkills.json';

export interface ArmorPiece {
  setId: string;
  id: string;
  set: string;
  name: string;
  rank: string;
  type: string;
  rarity: number;
  defense: number | null;
  fire: number;
  water: number;
  thunder: number;
  ice: number;
  dragon: number;
  cost: number;
  materials: string | null;
  skills?: ArmorSkill[];
}

export interface ArmorSkill {
  index: number;
  armorName: string;
  skillType: string;
  skillName: string;
  skillLevel: number;
}

export interface ArmorSet {
  id: string;
  name: string;
  rarity: number;
  rank: string;
  variant?: string;
  pieces: ArmorPiece[];
}

export const armorSkills: ArmorSkill[] = armorSkillData;

export const armorSets: ArmorPiece[] = armorData.map((armor) => ({
  ...armor,
  skills: armorSkills.filter((skill) => skill.armorName === armor.name) || undefined,
}));

export function getAllArmors(): ArmorPiece[] {
  return armorSets;
}

export function getArmorSet(setId: string): ArmorSet | undefined {
  const pieces = armorSets.filter((armor) => armor.setId === setId);
  if (pieces.length === 0) return undefined;
  let variant = pieces[0].name[pieces[0].name.length-1];
  if (variant !== 'a' && variant !== 'B') {
    variant = '';
  }
  const setName = `${pieces[0].set} ${variant}`;

  return {
    id: setId,
    name: setName,
    variant: variant,
    rarity: pieces[0].rarity,
    rank: pieces[0].rank,
    pieces
  };

}

export function getAllArmorSets(): ArmorSet[] {
  const setNames = Array.from(new Set(armorSets.map((armor) => armor.setId)));
  return setNames
    .map(getArmorSet)
    .filter(x => x !== undefined);
}

export function getArmorPieceById(name: string): ArmorPiece | undefined {
  return armorSets.find((armor) => armor.name === name);
}
