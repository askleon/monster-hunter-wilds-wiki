import { Card } from '@/components/Card';
import { getAllTalismans } from '@/lib/talismans';

export default function TalismanListPage() {
  const talismans = getAllTalismans();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Talismans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {talismans.map((talisman) => (
          <Card
            key={talisman.id}
            title={talisman.name}
            subtitle={`Rarity: ${talisman.rarity}`}
            description={
              <div>
                <h3 className="font-semibold text-primary">Skills:</h3>
                <ul className="list-disc list-inside">
                  {talisman.skills.map((skillInfo, index) => (
                    <li key={index} className="text-secondary">
                      {skillInfo.skill.name} Lv. {skillInfo.level}
                    </li>
                  ))}
                </ul>
                <h3 className="font-semibold mt-2 text-primary">Slots:</h3>
                <p className="text-secondary">{talisman.slots.join(', ')}</p>
              </div>
            }
            link={`/talismans/${talisman.id}`}
            className="bg-secondary hover:shadow-lg transition-shadow"
          />
        ))}
      </div>
    </div>
  );
}
