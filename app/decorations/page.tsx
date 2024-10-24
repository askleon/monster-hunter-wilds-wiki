import { Card } from '@/components/Card';
import { getAllDecorations } from '@/lib/decorations';

export default function DecorationListPage() {
  const decorations = getAllDecorations();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Decorations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decorations.map((decoration) => (
          <Card
            key={decoration.id}
            title={decoration.name}
            subtitle={`Rarity: ${decoration.rarity} | Slot Size: ${decoration.slotSize}`}
            description={
              <div>
                <h3 className="font-semibold text-primary">Skill:</h3>
                <p className="text-secondary">
                  {decoration.skill.skill.name} Lv. {decoration.skill.level}
                </p>
                <p className="mt-2 text-secondary">{decoration.description}</p>
              </div>
            }
            link={`/decorations/${decoration.id}`}
            className="bg-secondary hover:shadow-lg transition-shadow"
          />
        ))}
      </div>
    </div>
  );
}
