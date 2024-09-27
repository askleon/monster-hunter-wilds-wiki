export interface Monster {
  id: string;
  name: string;
  type: string;
  elements: string[];
  weaknesses: string[];
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
    id: "frost-fang-barioth",
    name: "Frost Fang Barioth",
    type: "Flying Wyvern",
    elements: ["Ice"],
    weaknesses: ["Fire", "Thunder"],
    habitats: ["Tundra", "Frozen Seaway"],
    description: "A subspecies of Barioth adapted to extreme cold. Its frost-coated fangs can freeze prey instantly.",
    size: {
      average: 2073,
      unit: "cm"
    },
    difficulty: 4
  },
  {
    id: "thunder-serpent-narwa",
    name: "Thunder Serpent Narwa",
    type: "Elder Dragon",
    elements: ["Thunder"],
    weaknesses: ["Dragon"],
    habitats: ["Coral Highlands", "Thunderous Plains"],
    description: "An elder dragon that can control electromagnetic forces. Its body crackles with lightning during combat.",
    size: {
      average: 4580,
      unit: "cm"
    },
    difficulty: 5
  },
  {
    id: "magma-almudron",
    name: "Magma Almudron",
    type: "Leviathan",
    elements: ["Fire"],
    weaknesses: ["Water", "Ice"],
    habitats: ["Lava Caverns", "Volcanic Belt"],
    description: "A subspecies of Almudron that dwells in volcanic regions. It manipulates molten rock to attack its foes.",
    size: {
      average: 2723,
      unit: "cm"
    },
    difficulty: 3
  },
  {
    id: "nargacuga",
    name: "Nargacuga",
    type: "Flying Wyvern",
    elements: [],
    weaknesses: ["Thunder", "Fire"],
    habitats: ["Ancient Forest", "Flooded Forest"],
    description: "A swift and agile wyvern that hunts from the shadows. Its tail can launch razor-sharp spikes.",
    size: {
      average: 2130,
      unit: "cm"
    },
    difficulty: 3
  },
  {
    id: "zinogre",
    name: "Zinogre",
    type: "Fanged Wyvern",
    elements: ["Thunder"],
    weaknesses: ["Ice", "Water"],
    habitats: ["Ancient Forest", "Coral Highlands"],
    description: "A fanged wyvern that can harness electricity with the help of Thunderbugs. It becomes supercharged in combat.",
    size: {
      average: 2280,
      unit: "cm"
    },
    difficulty: 4
  },
  {
    id: "velkhana",
    name: "Velkhana",
    type: "Elder Dragon",
    elements: ["Ice"],
    weaknesses: ["Fire", "Dragon"],
    habitats: ["Hoarfrost Reach", "Coral Highlands"],
    description: "An elder dragon with the power to freeze all in its path. Its ice attacks are both beautiful and deadly.",
    size: {
      average: 3740,
      unit: "cm"
    },
    difficulty: 5
  },
  {
    id: "rajang",
    name: "Rajang",
    type: "Fanged Beast",
    elements: ["Thunder"],
    weaknesses: ["Ice", "Water"],
    habitats: ["Volcanic Region", "Guiding Lands"],
    description: "A ferocious, ape-like monster with immense strength. When enraged, its fur turns gold and it gains new abilities.",
    size: {
      average: 1380,
      unit: "cm"
    },
    difficulty: 5
  },
  {
    id: "great-jagras",
    name: "Great Jagras",
    type: "Fanged Wyvern",
    elements: [],
    weaknesses: ["Fire", "Thunder"],
    habitats: ["Ancient Forest"],
    description: "A large, predatory monster that swallows its prey whole. Its belly swells as it digests, making it vulnerable.",
    size: {
      average: 1109,
      unit: "cm"
    },
    difficulty: 1
  },
  {
    id: "odogaron",
    name: "Odogaron",
    type: "Fanged Wyvern",
    elements: [],
    weaknesses: ["Ice", "Thunder"],
    habitats: ["Rotten Vale", "Coral Highlands"],
    description: "A swift and savage monster with razor-sharp claws. Its agility and ferocity make it a feared predator.",
    size: {
      average: 1390,
      unit: "cm"
    },
    difficulty: 4
  },
  {
    id: "kushala-daora",
    name: "Kushala Daora",
    type: "Elder Dragon",
    elements: ["Ice"],
    weaknesses: ["Dragon", "Thunder"],
    habitats: ["Ancient Forest", "Elder's Recess"],
    description: "An elder dragon that can control wind. Its metallic skin and ability to create tempests make it a formidable foe.",
    size: {
      average: 3140,
      unit: "cm"
    },
    difficulty: 5
  }
];

export function getMonsterById(id: string): Monster | undefined {
  return monsters.find(monster => monster.id === id);
}