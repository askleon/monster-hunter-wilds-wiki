'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { monsters } from '@/lib/monsters'
import { getAllWeaponTrees, WeaponTree } from '@/lib/weapons'
import { getAllArmors } from '@/lib/armors'
import { getAllTalismans } from '@/lib/talismans'
import { getAllDecorations } from '@/lib/decorations'

type SearchResult = {
  id: string;
  name: string;
  type: 'monster' | 'weapon' | 'armor' | 'talisman' | 'decoration';
  subtype?: string;
  weaponType?: string;
  setName?: string; // Added for armor navigation
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const allResults: SearchResult[] = [
    ...monsters.map(monster => ({
      id: monster.id.toString(),
      name: monster.name,
      type: 'monster' as const
    })),
    ...getAllWeaponTrees().flatMap((tree: WeaponTree) =>
      tree.weapons?.map(weapon => ({
        id: weapon.id,
        name: weapon.name,
        type: 'weapon' as const,
        subtype: tree.type,
        weaponType: tree.id
      })) || []
    ),
    ...getAllArmors().map(armor => ({
      id: armor.id,
      name: armor.name,
      type: 'armor' as const,
      subtype: armor.type,
      setName: armor.set
    })),
    ...getAllTalismans().map(talisman => ({
      id: talisman.id,
      name: talisman.name,
      type: 'talisman' as const
    })),
    ...getAllDecorations().map(decoration => ({
      id: decoration.id,
      name: decoration.name,
      type: 'decoration' as const
    }))
  ];

  useEffect(() => {
    const results = allResults.filter(result => result.name.toLowerCase().includes(query.toLowerCase()))
    setFilteredResults(results)
    setSelectedIndex(-1)
  }, [query])

  const navigateToResult = (result: SearchResult) => {
    setQuery('')
    setIsOpen(false)
    if (result.type === 'weapon' && result.weaponType) {
      router.push(`/weapons/${result.weaponType}#${result.id}`)
    } else if (result.type === 'armor' && result.id) {
      router.push(`/armors/${result.id}`)
    } else {
      router.push(`/${result.type}s/${result.id}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev < filteredResults.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev))
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      navigateToResult(filteredResults[selectedIndex])
    }
  }

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
        placeholder="Search monsters, weapons, armors..."
        className="w-full px-4 py-2 bg-primary text-primary border-color rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
      />
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-primary border-color rounded-md shadow-color">
          {query.length > 0 && (
            <div className="max-h-60 overflow-auto">
              {filteredResults.length > 0 ? (
                <ul>
                  {filteredResults.map((result, index) => (
                    <li
                      key={`${result.type}-${result.id}`}
                      className={`p-2 cursor-pointer ${
                        index === selectedIndex
                          ? 'bg-accent text-primary'
                          : 'hover:bg-secondary text-primary'
                      } transition-colors duration-200`}
                      onClick={() => navigateToResult(result)}
                    >
                      <span className="font-semibold">{result.name}</span>
                      <span className="ml-2 text-sm text-secondary">
                        {result.type} {result.subtype ? `(${result.subtype})` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-2 text-secondary">No results found</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
