'use client'

import Link from 'next/link'
import SearchBar from './SearchBar'
import { ThemeSwitcher } from './ThemeSwitcher'
import { FaHome, FaMap } from 'react-icons/fa'
import { FaUserGear } from 'react-icons/fa6'
import { GiDragonHead, GiSwordSmithing, GiChestArmor, GiNecklace, GiDiamondHard, GiToolbox } from 'react-icons/gi'
import { LinkDropdown } from './LinkDropdown'

export function Header() {
  const equipmentItems = [
    { href: "/weapons", label: "Weapons", icon: GiSwordSmithing },
    { href: "/armors", label: "Armors", icon: GiChestArmor },
    { href: "/talismans", label: "Talismans", icon: GiNecklace },
    { href: "/decorations", label: "Decorations", icon: GiDiamondHard },
  ];

  return (
    <header className="bg-black/20 backdrop-blur-sm shadow transition-colors duration-200">
      <nav className="container mx-auto px-2 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-primary hover:bg-accent hover:text-accent px-3 py-2 rounded-md transition-colors duration-200">
            <FaHome className="inline-block mr-1 w-5 h-5" /> Home
          </Link>
          <Link href="/maps" className="text-primary hover:bg-accent hover:text-accent px-3 py-2 rounded-md transition-colors duration-200">
            <FaMap className="inline-block mr-1 w-5 h-5" /> Maps
          </Link>
          <Link href="/monsters" className="text-primary hover:bg-accent hover:text-accent px-3 py-2 rounded-md transition-colors duration-200">
            <GiDragonHead className="inline-block mr-1 w-5 h-5" /> Monsters
          </Link>
          <LinkDropdown label="Equipment" icon={GiToolbox} items={equipmentItems} iconClass="w-5 h-5" />
          <Link href="/loadout" className="text-primary hover:bg-accent hover:text-accent px-3 py-2 rounded-md transition-colors duration-200">
            <FaUserGear className="inline-block mr-1 w-5 h-5" /> Loadouts
          </Link>
        </div>
        <div className="flex-grow mx-4">
          <SearchBar />
        </div>
        <ThemeSwitcher />
      </nav>
    </header>
  )
}
