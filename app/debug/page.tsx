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
      <div className="w-64 fixed h-screen overflow-y-auto p-4 bg-gray-900">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search components..."
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <nav className="space-y-4">
          {filteredSections.map(section => (
            <div key={section.id}>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map(item => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`block py-1 ${selectedId === item.id
                        ? 'text-blue-300 font-semibold'
                        : 'text-blue-400 hover:text-blue-300'
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
          <p className="text-gray-400">Current Theme: {theme}</p>
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
