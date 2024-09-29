export interface Skill {
  name: string;
  maxLevel: number;
}

export const skills: Skill[] = [
  { name: 'Attack Boost', maxLevel: 7 },
  { name: 'Defense Boost', maxLevel: 7 },
  { name: 'Health Boost', maxLevel: 3 },
  { name: 'Critical Eye', maxLevel: 7 },
  { name: 'Weakness Exploit', maxLevel: 3 },
  { name: 'Critical Boost', maxLevel: 3 },
  { name: 'Earplugs', maxLevel: 5 },
  { name: 'Windproof', maxLevel: 5 },
  { name: 'Tremor Resistance', maxLevel: 3 },
  { name: 'Fire Resistance', maxLevel: 3 },
  { name: 'Water Resistance', maxLevel: 3 },
  { name: 'Thunder Resistance', maxLevel: 3 },
  { name: 'Ice Resistance', maxLevel: 3 },
  { name: 'Dragon Resistance', maxLevel: 3 },
  { name: 'Blight Resistance', maxLevel: 3 },
  { name: 'Stun Resistance', maxLevel: 3 },
  { name: 'Paralysis Resistance', maxLevel: 3 },
  { name: 'Sleep Resistance', maxLevel: 3 },
  { name: 'Poison Resistance', maxLevel: 3 },
  { name: 'Blast Resistance', maxLevel: 3 },
  { name: 'Focus', maxLevel: 3 },
  { name: 'Evade Window', maxLevel: 5 },
  { name: 'Evade Extender', maxLevel: 3 },
  { name: 'Quick Sheath', maxLevel: 3 },
  { name: 'Flinch Free', maxLevel: 3 },
  { name: 'Speed Eating', maxLevel: 3 },
  { name: 'Free Meal', maxLevel: 3 },
  { name: 'Wide-Range', maxLevel: 5 },
  { name: 'Mushroomancer', maxLevel: 3 },
  { name: 'Divine Blessing', maxLevel: 5 },
  { name: 'Fire Attack', maxLevel: 5 },
  { name: 'Rathalos Mastery', maxLevel: 4 }, // Assuming 4 pieces max
  { name: 'Jump Master', maxLevel: 1 },
  { name: 'Odogaron Mastery', maxLevel: 4 }, // Assuming 4 pieces max
  { name: 'Constitution', maxLevel: 5 },
  { name: 'Speed Sharpening', maxLevel: 3 },
  { name: 'Fortify', maxLevel: 1 },
  { name: 'Critical Element', maxLevel: 1 },
  { name: 'True Critical Element', maxLevel: 1 },
];

export function getSkillByName(name: string): Skill | undefined {
  return skills.find(skill => skill.name === name);
}

export function getAllSkills(): Skill[] {
  return skills;
}
