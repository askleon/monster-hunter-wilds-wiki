import { Card } from '@/app/components/Card';
import { monsters } from '@/lib/monsters';
import { maps } from '@/lib/maps';

export default function Home() {
  const featuredMonster = monsters[Math.floor(Math.random() * monsters.length)];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">Monster Hunter Wilds Wiki</h1>

      <section className="p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Featured Monster</h2>
        <Card
          title={featuredMonster.name}
          subtitle={featuredMonster.type}
          description={featuredMonster.description}
          link={`/monsters/${featuredMonster.id}`}
        />
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Monsters</h2>
          {monsters.slice(0, 5).map((monster) => (
            <Card
              key={monster.id}
              title={monster.name}
              subtitle={monster.type}
              link={`/monsters/${monster.id}`}
            />
          ))}
          <Card
            title="View all monsters"
            link="/monsters"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Maps</h2>
          {maps.slice(0, 5).map((map) => (
            <Card
              key={map.id}
              title={map.name}
              link={`/maps/${map.id}`}
            />
          ))}
          <Card
            title="View all maps"
            link="/maps"
          />
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
