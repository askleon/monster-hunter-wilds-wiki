'use client'

import Link from 'next/link'
import SearchBar from './SearchBar'
import { ThemeSwitcher } from './ThemeSwitcher'

export function Header() {
  return (
    <header className="bg-secondary shadow transition-colors duration-200">
      <nav className="container mx-auto px-2 py-2 flex flex-row items-center">
        <div className="flex space-x-2 mr-4">
          <Link href="/" className="text-sm text-primary hover:bg-accent hover:text-accent px-3 py-2 rounded-md transition-all duration-200">
            Home
          </Link>
          <Link href="/maps" className="text-sm text-primary hover:bg-accent hover:text-accent px-3 py-2 rounded-md transition-all duration-200">
            Maps
          </Link>
          <Link href="/monsters" className="text-sm text-primary hover:bg-accent hover:text-accent px-3 py-2 rounded-md transition-all duration-200">
            Monsters
          </Link>
          <Link href="/weapons" className="text-sm text-primary hover:bg-accent hover:text-accent px-3 py-2 rounded-md transition-all duration-200">
            Weapons
          </Link>
          <Link href="/armors" className="text-sm text-primary hover:bg-accent hover:text-accent px-3 py-2 rounded-md transition-all duration-200">
            Armors
          </Link>
          <Link href="/talismans" className="text-sm text-primary hover:bg-accent hover:text-accent px-3 py-2 rounded-md transition-all duration-200">
            Talismans
          </Link>
          <Link href="/decorations" className="text-sm text-primary hover:bg-accent hover:text-accent px-3 py-2 rounded-md transition-all duration-200">
            Decorations
          </Link>
          <Link href="/loadout" className="text-sm text-primary hover:bg-accent hover:text-accent px-3 py-2 rounded-md transition-all duration-200">
            Loadouts
          </Link>
        </div>
        <div className="flex-grow mx-4">
          <SearchBar />
        </div>
        <div className="ml-4">
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  )
}
