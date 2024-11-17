'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/components/ThemeProvider'
import { MHCard } from '@/components/MHCard/MHCard'
import { EquipmentBox } from '@/components/EquipmentBox/EquipmentBox'
import { Card } from '@/components/Card'
import { SharpnessBar } from '@/components/weapons/SharpnessBar'
import { WeaponList } from '@/components/weapons/WeaponList'
import { WeaponComponent } from '@/components/weapons/WeaponComponent'
import { WeaponNode, WeaponTree as WeaponTreeType } from '@/lib/weapons/weapons'
import { WeaponDetails } from '@/components/weapons/WeaponDetails'
import { WeaponTree } from '@/components/weapons/WeaponTree'
import { ArmorSet } from '@/lib/armors';
import { ArmorSkillSummary } from '@/components/armors/ArmorSkillSummary';
import { ArmorDefenseSummary } from '@/components/armors/ArmorDefenseSummary';

const SECTIONS = [
  {
    id: 'base-components',
    title: 'Base Components',
    items: [
      {
        id: 'cards',
        title: 'Cards',
        content: () => (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card
                title="Base Card"
                subtitle="Regular theme card"
                description="Used for general content"
              />
              <MHCard title="Monster Hunter Card" titleVariant="main">
                <p className="mh-text-white">Themed card variant</p>
              </MHCard>
            </div>
          </div>
        )
      },
      {
        id: 'equipment',
        title: 'Equipment',
        content: () => (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              {[1, 4, 8].map(rarity => (
                <EquipmentBox
                  key={rarity}
                  imageUrl="/icons/great-sword.svg"
                  rarity={rarity}
                />
              ))}
            </div>
          </div>
        )
      },
      {
        id: 'sharpness-bar',
        title: 'Sharpness Bar',
        content: () => (
          <div className="space-y-4">
            <div className="grid gap-4">
              <SharpnessBar
                sharpness={{
                  red: 50,
                  orange: 50,
                  yellow: 60,
                  green: 80,
                  blue: 60,
                  white: 40,
                  purple: 20
                }}
              />
              <SharpnessBar
                sharpness={{
                  red: 50,
                  orange: 50,
                  yellow: 60,
                  green: 80,
                  blue: 60,
                  white: 40,
                  purple: 0,
                  parenthesis: {
                    color: 'purple',
                    value: 20
                  }
                }}
              />
              <SharpnessBar
                sharpness={{
                  red: 80,
                  orange: 70,
                  yellow: 50,
                  green: 30,
                  blue: 0,
                  white: 0,
                  purple: 0
                }}
              />
            </div>
          </div>
        )
      },
      {
        id: 'weapon-components',
        title: 'Weapon Components',
        content: () => <WeaponComponentsSection />
      },
      {
        id: 'weakness-display',
        title: 'Weakness Display',
        content: () => (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              ???
            </div>
          </div>
        )
      },
      {
        id: 'armor-components',
        title: 'Armor Components',
        content: () => <ArmorComponentsSection />
      }
    ]
  },
  {
    id: 'patterns',
    title: 'Visual Styles',
    items: [
      {
        id: 'backgrounds',
        title: 'Background Patterns',
        content: () => (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mh-background-pattern h-32 rounded-lg" />
              <div className="mh-component-pattern h-32 rounded-lg" />
            </div>
          </div>
        )
      },
      {
        id: 'typography',
        title: 'Typography',
        content: () => (
          <div className="space-y-4">
            <p className="mh-text-main">Main Text</p>
            <p className="mh-text-highlight">Highlight Text</p>
            <p className="mh-text-info">Info Text</p>
            <p className="mh-text-white">White Text</p>
            <p className="mh-text-gray">Gray Text</p>
          </div>
        )
      }
    ]
  }
]

const WeaponComponentsSection = () => {
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponNode | null>(null);

  const sampleWeapons: WeaponNode[] = [
    {
      id: 'iron-sword-1',
      name: 'Iron Sword I',
      description: 'Basic iron greatsword',
      rarity: 1,
      attack: 100,
      sharpness: {
        red: 50,
        orange: 40,
        yellow: 60,
        green: 0,
        blue: 0,
        white: 0,
        purple: 0
      },
      slots: [],
      creationMaterials: {
        craft: [
          { name: 'Iron Ore', quantity: 1 }
        ]
      },
      treeName: 'Ore Tree',
      canBuildDirectly: true
    },
    {
      id: 'iron-sword-2',
      name: 'Iron Sword II',
      description: 'Improved iron greatsword',
      rarity: 2,
      attack: 120,
      sharpness: {
        red: 40,
        orange: 50,
        yellow: 70,
        green: 20,
        blue: 0,
        white: 0,
        purple: 0
      },
      slots: [1],
      creationMaterials: {
        upgrade: [
          { name: 'Iron Ore', quantity: 2 },
          { name: 'Monster Bone S', quantity: 1 }
        ]
      },
      treeName: 'Ore Tree',
      upgradedFrom: 'iron-sword-1'
    },
    {
      id: 'steel-sword-1',
      name: 'Steel Sword I',
      description: 'Basic steel greatsword',
      rarity: 3,
      attack: 140,
      sharpness: {
        red: 40,
        orange: 50,
        yellow: 80,
        green: 30,
        blue: 0,
        white: 0,
        purple: 0
      },
      slots: [1, 1],
      creationMaterials: {
        upgrade: [
          { name: 'Machalite Ore', quantity: 2 },
          { name: 'Monster Bone M', quantity: 1 }
        ]
      },
      treeName: 'Ore Tree',
      upgradedFrom: 'iron-sword-2'
    },
    {
      id: 'flame-sword-1',
      name: 'Flame Sword I',
      description: 'Fire-elemental greatsword',
      rarity: 3,
      attack: 130,
      elementOrStatus: {
        type: 'fire',
        value: 120
      },
      sharpness: {
        red: 40,
        orange: 50,
        yellow: 70,
        green: 40,
        blue: 0,
        white: 0,
        purple: 0
      },
      slots: [2],
      creationMaterials: {
        upgrade: [
          { name: 'Flame Sac', quantity: 2 },
          { name: 'Monster Bone M', quantity: 1 }
        ]
      },
      treeName: 'Ore Tree',
      upgradedFrom: 'iron-sword-2'
    },
    {
      id: 'frost-sword-1',
      name: 'Frost Sword I',
      description: 'Ice-elemental greatsword',
      rarity: 3,
      attack: 130,
      elementOrStatus: {
        type: 'ice',
        value: 100
      },
      sharpness: {
        red: 40,
        orange: 50,
        yellow: 70,
        green: 40,
        blue: 0,
        white: 0,
        purple: 0
      },
      slots: [2],
      creationMaterials: {
        upgrade: [
          { name: 'Frost Sac', quantity: 2 },
          { name: 'Monster Bone M', quantity: 1 }
        ]
      },
      treeName: 'Ore Tree',
      upgradedFrom: 'iron-sword-2'
    }
  ];

  const sampleTree: WeaponTreeType = {
    id: 'debug-tree',
    name: 'Debug Weapons',
    type: 'Great Sword',
    weapons: sampleWeapons
  };

  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-lg font-semibold mb-4">Single Weapon Component</h4>
        <div className="max-w-md">
          <WeaponComponent
            weapon={sampleWeapons[3]}
            isSelected={selectedWeapon?.id === sampleWeapons[3].id}
            onClick={() => setSelectedWeapon(sampleWeapons[3])}
            displayMode="list"
          />
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">Weapon Details</h4>
        <div className="max-w-[300px] border border-gray-700 rounded-lg p-4">
          <WeaponDetails weapon={selectedWeapon || sampleWeapons[3]} />
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">Weapon List View</h4>
        <WeaponList
          weaponTree={sampleTree}
          selectedWeapon={selectedWeapon}
          onWeaponSelect={setSelectedWeapon}
        />
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">Weapon Tree View</h4>
        <WeaponTree
          weaponTree={sampleTree}
          selectedWeapon={selectedWeapon}
          onWeaponSelect={setSelectedWeapon}
        />
      </div>
    </div>
  );
};

const ArmorComponentsSection = () => {
  const sampleArmorSet: ArmorSet = {
    id: 'sample-armor-set',
    name: 'Hunter\'s Set',
    tier: 1,
    pieces: [
      {
        id: 'hunter-helm',
        name: 'Hunter\'s Helm',
        type: 'Head',
        rarity: 1,
        defense: 10,
        skills: [
          { id: 'attackBoost', level: 1 },
          { id: 'criticalEye', level: 1 }
        ],
        resistances: {
          fire: 0,
          water: 0,
          thunder: 0,
          ice: 0,
          dragon: 0
        },
        materials: [
          { name: 'Monster Hide', quantity: 2 },
          { name: 'Monster Bone S', quantity: 1 }
        ]
      },
      {
        id: 'hunter-mail',
        name: 'Hunter\'s Mail',
        type: 'Chest',
        rarity: 1,
        defense: 12,
        skills: [
          { id: 'attackBoost', level: 2 }
        ],
        resistances: {
          fire: 1,
          water: 0,
          thunder: 0,
          ice: 0,
          dragon: 0
        },
        materials: [
          { name: 'Monster Hide', quantity: 3 },
          { name: 'Monster Bone M', quantity: 1 }
        ]
      },
      {
        id: 'hunter-vambraces',
        name: 'Hunter\'s Vambraces',
        type: 'Arms',
        rarity: 1,
        defense: 10,
        skills: [
          { id: 'criticalEye', level: 1 }
        ],
        resistances: {
          fire: 0,
          water: 1,
          thunder: 0,
          ice: 0,
          dragon: 0
        },
        materials: [
          { name: 'Monster Hide', quantity: 2 },
          { name: 'Monster Bone S', quantity: 2 }
        ]
      },
      {
        id: 'hunter-coil',
        name: 'Hunter\'s Coil',
        type: 'Waist',
        rarity: 1,
        defense: 10,
        skills: [
          { id: 'constitution', level: 1 }
        ],
        resistances: {
          fire: 0,
          water: 0,
          thunder: 1,
          ice: 0,
          dragon: 0
        },
        materials: [
          { name: 'Monster Hide', quantity: 2 },
          { name: 'Monster Bone S', quantity: 1 }
        ]
      },
      {
        id: 'hunter-greaves',
        name: 'Hunter\'s Greaves',
        type: 'Legs',
        rarity: 1,
        defense: 10,
        skills: [
          { id: 'constitution', level: 1 }
        ],
        resistances: {
          fire: 0,
          water: 0,
          thunder: 0,
          ice: 1,
          dragon: 0
        },
        materials: [
          { name: 'Monster Hide', quantity: 2 },
          { name: 'Monster Bone S', quantity: 2 }
        ]
      }
    ]
  };

  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-lg font-semibold mb-4">Single Armor Piece</h4>
        <div className="max-w-md border border-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
              {/* Placeholder for armor icon */}
              <span className="text-3xl">🛡️</span>
            </div>
            <div>
              <h3 className="font-semibold">{sampleArmorSet.pieces[0].name}</h3>
              <p className="text-sm text-gray-400">Defense: {sampleArmorSet.pieces[0].defense}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">Armor Set Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-700 rounded-lg p-4">
            <h5 className="font-semibold mb-3">Defense Summary</h5>
            <ArmorDefenseSummary armorSet={sampleArmorSet} />
          </div>

          <div className="border border-gray-700 rounded-lg p-4">
            <h5 className="font-semibold mb-3">Skills Summary</h5>
            <ArmorSkillSummary armorSet={sampleArmorSet} />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">Armor Set Pieces</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleArmorSet.pieces.map((piece) => (
            <div
              key={piece.id}
              className="border border-gray-700 rounded-lg p-4 hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🛡️</span>
                </div>
                <div>
                  <h3 className="font-semibold">{piece.name}</h3>
                  <p className="text-sm text-gray-400">{piece.type}</p>
                </div>
              </div>
              <div className="text-sm">
                <p>Defense: {piece.defense}</p>
                <p>Rarity: {piece.rarity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function DebugPage() {
  const { theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Update selected section when hash changes
  useEffect(() => {
    const updateSelectedFromHash = () => {
      const hash = window.location.hash.slice(1) // Remove the # symbol
      setSelectedId(hash || null)
    }

    // Initial check
    updateSelectedFromHash()

    // Listen for hash changes
    window.addEventListener('hashchange', updateSelectedFromHash)
    return () => window.removeEventListener('hashchange', updateSelectedFromHash)
  }, [])

  const filteredSections = SECTIONS.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0)

  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      <div className="w-64 fixed h-screen overflow-y-auto p-4 bg-secondary border-r border-color">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search components..."
            className="w-full p-2 rounded bg-secondary text-primary border border-color"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <nav className="space-y-4">
          {filteredSections.map(section => (
            <div key={section.id}>
              <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map(item => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`block py-1 ${selectedId === item.id
                        ? 'text-accent font-semibold'
                        : 'text-primary hover:text-accent'
                      }`}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Component Debug Page</h1>
          <p className="text-secondary">Current Theme: {theme}</p>
        </div>

        <div className="space-y-12">
          {filteredSections.map(section => (
            <div key={section.id} className="space-y-8">
              <h2 className="text-xl font-bold text-gray-300">{section.title}</h2>
              {section.items.map(item => (
                <section
                  key={item.id}
                  id={item.id}
                  className={`scroll-mt-8 ${selectedId && selectedId !== item.id ? 'hidden' : ''
                  }`}
                >
                  <h3 className="text-lg font-semibold mb-4">{item.title}</h3>
                  {item.content()}
                </section>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
