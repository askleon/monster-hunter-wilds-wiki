import Link from 'next/link';
import { maps } from '@/lib/maps';

export default function MapsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Maps</h1>
      <p className="text-lg">
        Explore the various maps of Monster Hunter Wilds!
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {maps.map((map) => (
          <li key={map.id} className="border rounded-lg shadow-md overflow-hidden">
            <Link href={`/maps/${map.id}`} className="block hover:opacity-75 transition-opacity">
              <img src={map.thumbnail} alt={map.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{map.name}</h2>
                <p className="text-sm text-gray-600 mt-2">{map.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
