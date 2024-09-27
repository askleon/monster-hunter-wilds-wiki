export type PhysicalDamageType = 'blunt' | 'slashing' | 'piercing';
export type ElementType = 'fire' | 'water' | 'thunder' | 'ice' | 'dragon';
export type StatusType = 'poison' | 'paralysis' | 'sleep' | 'blast';

export interface WeaponDamage {
  physical: PhysicalDamageType;
  element?: ElementType;
  status?: StatusType;
}

export interface BodyPartWeakness {
  physical: Record<PhysicalDamageType, number>;
  elemental: Partial<Record<ElementType, number>>;
  status: Partial<Record<StatusType, number>>;
}

export interface BodyPart {
  name: string;
  weakness: BodyPartWeakness;
}

export interface Monster {
  id: string;
  name: string;
  type: string;
  elements: ElementType[];
  bodyParts: BodyPart[];
  habitats: string[];
  description: string;
  size: {
    average: number;
    unit: string;
  };
  difficulty: number;
}

export const monsters: Monster[] = [
  {
    id: "rathalos",
    name: "Rathalos",
    type: "Flying Wyvern",
    elements: ["fire"],
    bodyParts: [
      {
        name: "Head",
        weakness: {
          physical: {
            blunt: 45,
            slashing: 45,
            piercing: 40
          },
          elemental: {
            dragon: 30,
            thunder: 20,
            ice: 15,
            water: 10,
            fire: 0
          },
          status: {
            poison: 10,
            paralysis: 10,
            sleep: 10,
            blast: 10
          }
        }
      },
      {
        name: "Wings",
        weakness: {
          physical: {
            blunt: 30,
            slashing: 35,
            piercing: 35
          },
          elemental: {
            dragon: 25,
            thunder: 20,
            ice: 15,
            water: 10,
            fire: 0
          },
          status: {
            poison: 0,
            paralysis: 0,
            sleep: 0,
            blast: 0
          }
        }
      },
      {
        name: "Tail",
        weakness: {
          physical: {
            blunt: 35,
            slashing: 45,
            piercing: 40
          },
          elemental: {
            dragon: 20,
            thunder: 15,
            ice: 15,
            water: 10,
            fire: 0
          },
          status: {
            poison: 0,
            paralysis: 0,
            sleep: 0,
            blast: 0
          }
        }
      }
    ],
    habitats: ["Ancient Forest", "Wildspire Waste"],
    description: "The 'King of the Skies'. A wyvern that patrols its territory from the air, attacking with poison claws and fireballs.",
    size: {
      average: 1700,
      unit: "cm"
    },
    difficulty: 4
  }
];

export function getMonsterById(id: string): Monster | undefined {
  return monsters.find(monster => monster.id === id);
}
