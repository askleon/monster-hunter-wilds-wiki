import Link from "next/link";
import { monsters } from '@/lib/monsters';
import { maps } from '@/lib/maps';

export default function Home() {
  // Get a random monster for the featured content
  const featuredMonster = monsters[Math.floor(Math.random() * monsters.length)];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">Monster Hunter Wilds Wiki</h1>
      
      <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Featured Monster</h2>
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-3xl">
            {featuredMonster.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-semibold">{featuredMonster.name}</h3>
            <p className="text-gray-600">{featuredMonster.type}</p>
            <Link href={`/monsters/${featuredMonster.id}`} className="text-blue-600 hover:underline">
              Learn more
            </Link>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Monsters</h2>
          <ul className="space-y-2">
            {monsters.slice(0, 5).map((monster) => (
              <li key={monster.id}>
                <Link href={`/monsters/${monster.id}`} className="text-blue-600 hover:underline">
                  {monster.name}
                </Link>
                <span className="text-gray-500 text-sm ml-2">({monster.type})</span>
              </li>
            ))}
          </ul>
          <Link href="/monsters" className="block mt-4 text-blue-600 hover:underline">
            View all monsters
          </Link>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Maps</h2>
          <ul className="space-y-2">
            {maps.slice(0, 5).map((map) => (
              <li key={map.id}>
                <Link href={`/maps/${map.id}`} className="text-blue-600 hover:underline">
                  {map.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/maps" className="block mt-4 text-blue-600 hover:underline">
            View all maps
          </Link>
        </section>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">About Monster Hunter Wilds</h2>
        <p className="text-gray-700">
          Monster Hunter Wilds is the latest installment in the Monster Hunter series. 
          This wiki provides comprehensive information about the game's monsters, maps, 
          weapons, and more. Whether you're a seasoned hunter or new to the series, 
          you'll find valuable resources to aid you in your hunts.
        </p>
      </section>
    </div>
  );
}
