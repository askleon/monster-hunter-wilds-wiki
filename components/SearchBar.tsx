'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { search, SearchResult } from '@/lib/search'
import { ResultItem } from '@/components/search/ResultItem'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (query.trim()) {
      const results = search(query)
      setFilteredResults(results)
      setSelectedIndex(-1)
    } else {
      setFilteredResults([])
    }
  }, [query])

  const navigateToResult = (result: SearchResult) => {
    setQuery('')
    setIsOpen(false)
    if (result.url) {
      router.push(result.url)
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
        placeholder="Search (/help) (⌘ + K or Ctrl + K to open search dialog)"
        className="w-full px-4 py-2 bg-primary text-primary border-color rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
      />
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-primary border-color rounded-md shadow-color">
          {query.length > 0 && (
            <div className="max-h-60 overflow-auto">
              {filteredResults.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredResults.map((result, index) => (
                    <div
                      key={`${result.type}-${index}`}
                      className={`cursor-pointer ${
                        index === selectedIndex
                          ? 'bg-accent text-primary'
                          : 'hover:bg-secondary text-primary'
                      } transition-colors duration-200`}
                      onClick={() => navigateToResult(result)}
                    >
                      <ResultItem item={result} />
                    </div>
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
