import { MapViewProps } from "@/app/components/MapView";

export interface PointOfInterest {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  type: string;
  description: string;
}


export const maps: MapViewProps[] = [
  {
    id: "ancient-forest",
    name: "Ancient Forest",
    description: "A dense, multi-layered forest teeming with diverse flora and fauna.",
    thumbnail: "/images/maps/ancient-forest-thumb.jpg",
    imageUrl: "/images/maps/ancient-forest.jpg",
    pointsOfInterest: [
      {
        id: 1,
        latitude: 20,
        longitude: 20,
        name: "Ancient Tree",
        type: "Landmark",
        description: "A massive tree at the center of the forest."
      },
      {
        id: 2,
        latitude: 35,
        longitude: 45,
        name: "Rathalos Nest",
        type: "Monster Den",
        description: "A high-altitude nest where Rathalos often reside."
      },
      {
        id: 3,
        latitude: 60,
        longitude: 30,
        name: "Mossy Grotto",
        type: "Area",
        description: "A damp, secluded area rich in unique plant life."
      },
      {
        id: 4,
        latitude: 80,
        longitude: 70,
        name: "Vine-Covered Ruins",
        type: "Landmark",
        description: "Ancient stone structures overgrown with vines and moss."
      }
    ]
  },
  {
    id: "wildspire-waste",
    name: "Wildspire Waste",
    description: "A vast desert with swampy areas, home to both arid-climate and aquatic monsters.",
    thumbnail: "/images/maps/wildspire-waste-thumb.jpg",
    imageUrl: "/images/maps/wildspire-waste.jpg",
    pointsOfInterest: [
      {
        id: 1,
        latitude: 30,
        longitude: 40,
        name: "Oasis",
        type: "Area",
        description: "A small water source in the middle of the desert."
      },
      {
        id: 2,
        latitude: 50,
        longitude: 60,
        name: "Diablos Burrowing Grounds",
        type: "Monster Territory",
        description: "A sandy area where Diablos are known to surface."
      },
      {
        id: 3,
        latitude: 20,
        longitude: 80,
        name: "Swamp",
        type: "Area",
        description: "A muddy, wet area teeming with unique aquatic life."
      },
      {
        id: 4,
        latitude: 70,
        longitude: 25,
        name: "Ant Hill",
        type: "Landmark",
        description: "A massive termite mound that serves as a landmark in the waste."
      }
    ]
  },
  {
    id: "coral-highlands",
    name: "Coral Highlands",
    description: "A unique area resembling a coral reef but set high in the mountains.",
    thumbnail: "/images/maps/coral-highlands-thumb.jpg",
    imageUrl: "/images/maps/coral-highlands.jpg",
    pointsOfInterest: [
      {
        id: 1,
        latitude: 20,
        longitude: 20,
        name: "Coral Formation",
        type: "Landmark",
        description: "A unique coral formation in the highlands."
      },
      {
        id: 2,
        latitude: 40,
        longitude: 50,
        name: "Paolumu Nest",
        type: "Monster Den",
        description: "A high-altitude nest where Paolumu often rest."
      },
      {
        id: 3,
        latitude: 70,
        longitude: 30,
        name: "Flowery Plateau",
        type: "Area",
        description: "A beautiful area covered in vibrant, colorful flora."
      },
      {
        id: 4,
        latitude: 60,
        longitude: 80,
        name: "Buoyant Psyche Geysers",
        type: "Environmental Feature",
        description: "Geysers that release buoyant spores, allowing for vertical traversal."
      }
    ]
  },
  {
    id: "rotten-vale",
    name: "Rotten Vale",
    description: "A cavernous area filled with the remains of deceased monsters.",
    thumbnail: "/images/maps/rotten-vale-thumb.jpg",
    imageUrl: "/images/maps/rotten-vale.jpg",
    pointsOfInterest: [
      {
        id: 1,
        latitude: 30,
        longitude: 40,
        name: "Cave Entrance",
        type: "Area",
        description: "The entrance to the cave system in Rotten Vale."
      },
      {
        id: 2,
        latitude: 50,
        longitude: 50,
        name: "Acid Pools",
        type: "Hazard",
        description: "Pools of corrosive fluid that damage anything that touches them."
      },
      {
        id: 3,
        latitude: 70,
        longitude: 20,
        name: "Odogaron Den",
        type: "Monster Territory",
        description: "A area where the fearsome Odogaron is often found."
      },
      {
        id: 4,
        latitude: 20,
        longitude: 70,
        name: "Gigantic Skeleton",
        type: "Landmark",
        description: "The massive remains of an ancient creature, forming part of the vale's structure."
      }
    ]
  },
  {
    id: "elders-recess",
    name: "Elder's Recess",
    description: "A volcanic region that serves as a nest for powerful Elder Dragons.",
    thumbnail: "/images/maps/elders-recess-thumb.jpg",
    imageUrl: "/images/maps/elders-recess.jpg",
    pointsOfInterest: [
      {
        id: 1,
        latitude: 20,
        longitude: 20,
        name: "Volcanic Crater",
        type: "Landmark",
        description: "A volcanic crater in the heart of Elder's Recess."
      },
      {
        id: 2,
        latitude: 40,
        longitude: 60,
        name: "Crystal Caverns",
        type: "Area",
        description: "A network of caves filled with beautiful, bioluminescent crystals."
      },
      {
        id: 3,
        latitude: 70,
        longitude: 40,
        name: "Nergigante Lair",
        type: "Monster Den",
        description: "The territory of the fearsome Elder Dragon, Nergigante."
      },
      {
        id: 4,
        latitude: 60,
        longitude: 80,
        name: "Lava Flow",
        type: "Hazard",
        description: "A river of molten rock that poses a significant danger to hunters."
      }
    ]
  },
];

// ... rest of the file remains the same

export const getMapById = (id: string): MapViewProps | undefined => {
  return maps.find(map => map.id === id);
};

