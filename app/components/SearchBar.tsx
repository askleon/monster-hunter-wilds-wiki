'use client'

import { useState, useEffect, KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import { monsters } from '@/lib/monsters'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const router = useRouter()

  const filteredMonsters = monsters.filter(monster =>
    monster.name.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    setSelectedIndex(-1)
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedIndex >= 0 && selectedIndex < filteredMonsters.length) {
      router.push(`/monsters/${filteredMonsters[selectedIndex].id}`)
      setQuery('')
    } else if (filteredMonsters.length > 0) {
      router.push(`/monsters/${filteredMonsters[0].id}`)
      setQuery('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev < filteredMonsters.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev))
    } else if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search monsters..."
        className="w-full p-2 rounded bg-theme-light-bg dark:bg-theme-dark-bg text-theme-light-text dark:text-theme-dark-text"
      />
      <button type="submit" className="absolute right-2 top-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200">
        🔍
      </button>
      {query && filteredMonsters.length > 0 && (
        <ul className="absolute z-10 w-full bg-theme-light-bg dark:bg-theme-dark-bg border border-gray-300 dark:border-gray-600 rounded mt-1 max-h-60 overflow-auto transition-colors duration-200">
          {filteredMonsters.map((monster, index) => (
            <li 
              key={monster.id}
              className={`p-2 cursor-pointer ${
                index === selectedIndex 
                  ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-600 text-theme-light-text dark:text-theme-dark-text'
              } transition-colors duration-200`}
              onClick={() => {
                router.push(`/monsters/${monster.id}`)
                setQuery('')
              }}
            >
              {monster.name}
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}
