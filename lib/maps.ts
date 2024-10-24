export interface PointOfInterest {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  type: string;
  description: string;
}

export interface MapViewItem {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  imageUrl: string;
  pointsOfInterest: PointOfInterest[];
}

export const maps: MapViewItem[] = [
  {
    id: "windward-plains",
    name: "Windward Plains",
    description: "A diverse region filled with sandy deserts, swaying grasslands, and twisting rock formations. The first new hunting locale in the Forbidden Lands, experiencing the Sandtide Inclemency.",
    thumbnail: "/images/maps/windward-plains-thumb.jpg",
    imageUrl: "/images/maps/windward-plains.jpg",
    pointsOfInterest: [
      {
        id: 1,
        latitude: 25,
        longitude: 30,
        name: "Sandtide Dunes",
        type: "Area",
        description: "Vast sandy dunes where the Sandtide storm is most intense. The roiling sandstorm here is filled with thunder, making it a treacherous area to navigate."
      },
      {
        id: 2,
        latitude: 40,
        longitude: 55,
        name: "Twisted Spires",
        type: "Landmark",
        description: "Unique rock formations sculpted by wind and sand over millennia. These natural structures provide shelter from the Sandtide for both hunters and monsters alike."
      },
      {
        id: 3,
        latitude: 65,
        longitude: 35,
        name: "Thunder Basin",
        type: "Monster Territory",
        description: "A lowland area where lightning frequently strikes during the Sandtide. Known to be the territory of Rey Dau, the apex predator of the region."
      },
      {
        id: 4,
        latitude: 75,
        longitude: 70,
        name: "Whispering Grasslands",
        type: "Area",
        description: "Expansive plains with tall grass swaying in the constant winds. Home to various herbivores and the hunting grounds for Doshaguma packs."
      },
      {
        id: 5,
        latitude: 50,
        longitude: 50,
        name: "Kunafa, Windsong Village",
        type: "Settlement",
        description: "A settlement located in the Windward Plains, and the home of the Seikret. The cheese produced by the livestock the people here keep is an essential part of their diet."
      },
      {
        id: 6,
        latitude: 35,
        longitude: 40,
        name: "Quicksand Pits",
        type: "Monster Territory",
        description: "Treacherous areas of unstable sand, known to be the hunting grounds of the Balahara, a desert-dwelling Leviathan."
      },
      {
        id: 7,
        latitude: 60,
        longitude: 60,
        name: "Scorched Flats",
        type: "Area",
        description: "A barren area often patrolled by Quematrice, Brute Wyverns known for their fire-based attacks and long tails."
      }
    ]
  },
  {
    id: "scarlet-forest",
    name: "Scarlet Forest",
    description: "A verdant forest with towering trees and abundant water, characterized by peculiar red-colored water on the forest floor. This land experiences an Inclemency known as the Downpour, a torrential rainstorm that floods the surrounding area.",
    imageUrl: "/images/maps/scarlet-forest.jpg",
    thumbnail: "/images/maps/scarlet-forest-thumb.jpg",
    pointsOfInterest: [
      {
        id: 1,
        latitude: 50,
        longitude: 50,
        name: "Crimson Canopy",
        type: "Area",
        description: "The heart of the Scarlet Forest, where the tallest trees form a dense canopy. The red-tinted water pools beneath, creating a surreal landscape."
      },
      {
        id: 2,
        latitude: 30,
        longitude: 70,
        name: "Flooded Groves",
        type: "Area",
        description: "Low-lying areas of the forest that are frequently submerged during the Downpour. The flooded terrain becomes a temporary aquatic ecosystem."
      },
      {
        id: 3,
        latitude: 70,
        longitude: 40,
        name: "Scarlet Falls",
        type: "Landmark",
        description: "A majestic waterfall where the red-tinted water cascades down moss-covered cliffs, creating a breathtaking spectacle."
      },
      {
        id: 4,
        latitude: 60,
        longitude: 80,
        name: "Uth Duna's Domain",
        type: "Monster Territory",
        description: "A treacherous area known to be the territory of Uth Duna, the Leviathan apex predator of the Scarlet Forest."
      },
      {
        id: 5,
        latitude: 40,
        longitude: 30,
        name: "Blooming Hollows",
        type: "Monster Territory",
        description: "A network of tree hollows and crevices where the Temnoceran Lala Barina makes its home, surrounded by rose-like structures."
      },
      {
        id: 6,
        latitude: 80,
        longitude: 60,
        name: "Mist-Shrouded Glade",
        type: "Area",
        description: "A mysterious area where mist constantly lingers, created by the interaction between the warm forest air and the cool water."
      },
      {
        id: 7,
        latitude: 20,
        longitude: 40,
        name: "Verdant Haven",
        type: "Settlement",
        description: "A small research outpost established by the Hunter's Guild to study the unique ecosystem of the Scarlet Forest."
      },
      {
        id: 8,
        latitude: 90,
        longitude: 10,
        name: "Wudwud Hideout",
        type: "Settlement",
        description: "A secluded area deep within the Scarlet Forest where the Wudwuds, a Lynian tribe native to this region, have established their hidden community."
      }
    ]
  },
  {
    id: "oilwell-basin",
    name: "Oilwell Basin",
    description: "A volcanic region where oil wells and raging fires burn. Home to unique creatures that have adapted to its harsh environment.",
    imageUrl: "/images/maps/oilwell-basin.jpg",
    thumbnail: "/images/maps/oilwell-basin-thumb.jpg",
    pointsOfInterest: [
      {
        id: 1,
        latitude: 50,
        longitude: 50,
        name: "Azuz, the Everforge",
        type: "Settlement",
        description: "The village of Azuz formed around its large forge."
      }
    ]
  }
];


export const getMapById = (id: string): MapViewItem | undefined => {
  return maps.find(map => map.id === id);
};

