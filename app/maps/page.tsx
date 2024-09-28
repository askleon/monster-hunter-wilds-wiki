import { Card } from '@/app/components/Card';
import { maps } from '@/lib/maps';

export default function MapsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Maps</h1>
      <p className="text-lg text-secondary mb-8">
        Explore the various maps of Monster Hunter Wilds!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {maps.map((map) => (
          <Card
            key={map.id}
            title={<span className="text-xl font-bold">{map.name}</span>}
            subtitle={`Points of Interest: ${map.pointsOfInterest.length}`}
            description={
              <div>
                <img src={map.thumbnail} alt={map.name} className="w-full h-48 object-cover mb-4 rounded" />
                <p className="text-sm">{map.description}</p>
              </div>
            }
            link={`/maps/${map.id}`}
            className="bg-secondary hover:shadow-lg transition-shadow"
          />
        ))}
      </div>
    </div>
  );
}
