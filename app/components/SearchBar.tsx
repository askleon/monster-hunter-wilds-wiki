'use client'

import { useState, useEffect, KeyboardEvent, ChangeEvent, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { monsters } from '@/lib/monsters'
import { getAllWeaponTrees, WeaponTree, WeaponNode } from '@/lib/weapons'
import { getAllArmorSets, ArmorSet, ArmorPiece } from '@/lib/armors'
import { maps } from '@/lib/maps'

type SearchResult = {
  id: string;
  name: string;
  type: 'monster' | 'weapon' | 'armor' | 'map';
  subtype?: string;
}

type FilterOptions = {
  monster: boolean;
  weapon: boolean;
  armor: boolean;
  map: boolean;
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    monster: true,
    weapon: true,
    armor: true,
    map: true,
  })
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  const weaponTrees = getAllWeaponTrees()
  const armorSets = getAllArmorSets()

  const flattenWeaponTree = (tree: WeaponTree): SearchResult[] => {
    const flattenNode = (node: WeaponNode): SearchResult[] => {
      return [
        { id: node.id, name: node.name, type: 'weapon', subtype: tree.type },
        ...node.children.flatMap(flattenNode)
      ];
    };
    return flattenNode(tree.baseWeapon);
  };

  const flattenArmorSet = (set: ArmorSet): SearchResult[] => {
    return set.pieces.map(piece => ({
      id: piece.id,
      name: piece.name,
      type: 'armor',
      subtype: piece.type
    }));
  };

  const allData: SearchResult[] = [
    ...monsters.map(m => ({ id: m.id, name: m.name, type: 'monster' as const })),
    ...weaponTrees.flatMap(flattenWeaponTree),
    ...armorSets.flatMap(flattenArmorSet),
    ...maps.map(m => ({ id: m.id, name: m.name, type: 'map' as const })),
  ]

  const filteredResults = allData.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()) &&
    filters[item.type as keyof FilterOptions]
  )

  useEffect(() => {
    setSelectedIndex(-1)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedIndex >= 0 && selectedIndex < filteredResults.length) {
      const result = filteredResults[selectedIndex]
      navigateToResult(result)
    } else if (filteredResults.length > 0) {
      navigateToResult(filteredResults[0])
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev < filteredResults.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev))
    } else if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters(prev => ({ ...prev, [name]: checked }));
  }

  const navigateToResult = (result: SearchResult) => {
    let path;
    switch (result.type) {
      case 'weapon':
        // Find the weapon tree that contains this weapon
        const weaponTree = getAllWeaponTrees().find(tree =>
          findWeaponInTree(tree.baseWeapon, result.id)
        );
        if (weaponTree) {
          path = `/weapons/${weaponTree.id}`;
        } else {
          // Fallback to a general weapons page if the tree is not found
          path = '/weapons';
        }
        break;
      case 'armor':
        // Keep the existing logic for armor
        path = `/armors/${result.id.split('-')[0]}`;
        break;
      default:
        path = `/${result.type}s/${result.id}`;
    }
    router.push(path);
    setQuery('');
    setIsExpanded(false);
  }

  // Helper function to find a weapon in the tree
  function findWeaponInTree(node: WeaponNode, id: string): boolean {
    if (node.id === id) return true;
    return node.children.some(child => findWeaponInTree(child, id));
  }

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsExpanded(true)}
          placeholder="Search monsters, weapons, armors, maps..."
          className="w-full p-2 rounded bg-theme-light-bg dark:bg-theme-dark-bg text-theme-light-text dark:text-theme-dark-text"
        />
        <button type="submit" className="absolute right-2 top-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200">
          🔍
        </button>
      </form>
      {isExpanded && (
        <div className="absolute z-10 w-full bg-theme-light-bg dark:bg-theme-dark-bg border border-gray-300 dark:border-gray-600 rounded mt-1 p-2 transition-colors duration-200">
          <div className="flex flex-wrap gap-2 mb-2">
            {Object.entries(filters).map(([key, value]) => (
              <label key={key} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={key}
                  checked={value}
                  onChange={handleFilterChange}
                  className="form-checkbox"
                />
                <span className="text-sm text-theme-light-text dark:text-theme-dark-text">{key}</span>
              </label>
            ))}
          </div>
          {filteredResults.length > 0 && (
            <ul className="max-h-60 overflow-auto">
              {filteredResults.map((result, index) => (
                <li
                  key={`${result.type}-${result.id}`}
                  className={`p-2 cursor-pointer ${
                    index === selectedIndex
                      ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-600 text-theme-light-text dark:text-theme-dark-text'
                  } transition-colors duration-200`}
                  onClick={() => navigateToResult(result)}
                >
                  <span className="font-semibold">{result.name}</span>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    {result.type} {result.subtype ? `(${result.subtype})` : ''}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
