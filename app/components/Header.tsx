'use client'

import Link from 'next/link'
import SearchBar from './SearchBar'
import { ThemeSwitcher } from './ThemeSwitcher'

export function Header() {
  return (
    <header className="bg-gray-100 dark:bg-gray-800 shadow-md transition-colors duration-200">
      <nav className="container mx-auto px-2 py-2 flex flex-row items-center">
        <div className="flex space-x-4 mr-4">
          <Link href="/" className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Home
          </Link>
          <Link href="/maps" className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            Maps
          </Link>
          <Link href="/monsters" className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Monsters</Link>
          <Link href="/weapons" className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Weapons</Link>
          <Link href="/armors" className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Armors</Link>
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
