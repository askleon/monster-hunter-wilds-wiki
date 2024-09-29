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
  type: string | undefined;
  elements: ElementType[] | undefined;
  bodyParts: BodyPart[] | undefined;
  habitats: string[] | undefined;
  description: string;
  size: {
    average: number | undefined;
    unit: string | undefined;
  } | undefined;
  difficulty: number | undefined;
}

export const monsters: Monster[] = [
  {
    id: "pukei-pukei",
    name: "Pukei-Pukei",
    type: "Bird Wyvern",
    elements: ["water"],
    bodyParts: [
      {
        name: "Head",
        weakness: {
          physical: {
            blunt: 65,
            slashing: 65,
            piercing: 65
          },
          elemental: {
            thunder: 30,
            dragon: 15,
            fire: 10,
            water: 0,
            ice: 0
          },
          status: {
            poison: 0,
            paralysis: 10,
            sleep: 10,
            blast: 10
          }
        }
      },
      {
        name: "Body",
        weakness: {
          physical: {
            blunt: 45,
            slashing: 45,
            piercing: 45
          },
          elemental: {
            thunder: 20,
            dragon: 10,
            fire: 5,
            water: 0,
            ice: 0
          },
          status: {
            poison: 0,
            paralysis: 10,
            sleep: 10,
            blast: 10
          }
        }
      },
      {
        name: "Tail",
        weakness: {
          physical: {
            blunt: 55,
            slashing: 55,
            piercing: 45
          },
          elemental: {
            thunder: 25,
            dragon: 10,
            fire: 5,
            water: 0,
            ice: 0
          },
          status: {
            poison: 0,
            paralysis: 10,
            sleep: 10,
            blast: 10
          }
        }
      }
    ],
    habitats: ["Windward Plains", "Scarlet Forest"],
    description: "A colorful bird wyvern known for its extending tongue and toxic capabilities. It can store various toxins in its body and release them in a variety of ways.",
    size: {
      average: 1110,
      unit: "cm"
    },
    difficulty: 2
  },
  {
    id: "arkveld",
    name: "Arkveld",
    type: undefined,
    elements: undefined,
    bodyParts: undefined,
    habitats: undefined,
    description: "A monster known among the commission as the White Wraith, described as having unique chain-like appendages extending from its wings.\nA species long thought to have been extinct, its ecology remains shrouded in mystery.",
    size: undefined,
    difficulty: undefined
  },
  {
    id: "uth-duna",
    name: "Uth Duna",
    type: "Leviathan",
    elements: ["water"],
    bodyParts: undefined,
    habitats: ["Scarlet Forest"],
    description: `"This is its territory. And we're intruders..."。\n\nA Leviathan that rules the Scarlet Forest as its apex predator.\nIt has adapted to water-rich environments and is sighted most often during the Downpour.\nIt makes use of the moisture and its own bodily fluids to create a protective veil around itself.`,
    size: undefined,
    difficulty: undefined
  },
  {
    id: "lala-barina",
    name: "Lala Barina",
    type: "Temnoceran",
    elements: undefined,
    bodyParts: undefined,
    habitats: ["Scarlet Forest"],
    description: `A Temnoceran that resides in the Scarlet Forest.\nIts thorax, which can be opened at will, resembles a rose in bloom.`,
    size: undefined,
    difficulty: undefined
  },
  {
    id: "rey-dau",
    name: "Rey Dau",
    type: "Flying Wyvern",
    elements: undefined,
    bodyParts: undefined,
    habitats: ["Windward Plains"],
    description: `"From the look of it... That must be this region's apex predator."\n\nA Flying Wyvern that rules the Windward Plains as its apex predator.\nIt has adapted to the lightning that accompanies the Sandtide, with most sightings having occurred during the storm.\nIts ability to discharge electricity in powerful attacks pose a threat to even the most experienced hunters.`,
    size: undefined,
    difficulty: undefined
  },
  {
    id: "balahara",
    name: "Balahara",
    type: "Leviathan",
    elements: undefined,
    bodyParts: undefined,
    habitats: ["Windward Plains"],
    description: "Desert-dwelling leviathans that use their supple, serpentine bodies to create quicksand traps for unwary prey.",
    size: undefined,
    difficulty: undefined
  },
  {
    id: "quematrice",
    name: "Quematrice",
    type: "Brute Wyvern",
    elements: ["fire"],
    bodyParts: undefined,
    habitats: ["Windward Plains"],
    description: "Brute wyverns with disproportionately long tails.\nThey spread a flammable substance, then ignite it by dragging their tails along the ground.\nThey can often be seen fighting with other, smaller carnivores over carrion.",
    size: undefined,
    difficulty: undefined
  },
  {
    id: "doshaguma",
    name: "Doshaguma",
    type: "Fanged Beast",
    elements: undefined,
    bodyParts: undefined,
    habitats: ["Windward Plains"],
    description: "Rugged, territorial fanged beasts that exhibit an aggressive disposition and inhabit a large range. Sometimes observed in large packs.",
    size: undefined,
    difficulty: undefined
  },
  {
    id: "chatacabra",
    name: "Chatacabra",
    type: "Amphibian",
    elements: undefined,
    bodyParts: undefined,
    habitats: ["Windward Plains"],
    description: "A large species of amphibians that use the adhesive quality of their saliva to affix stone to their forelimbs in order to power up their attacks.",
    size: undefined,
    difficulty: undefined
  },
];

export function getMonsterById(id: string): Monster | undefined {
  return monsters.find(monster => monster.id === id);
}
