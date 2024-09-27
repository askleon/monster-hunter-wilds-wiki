import { getMonsterById } from '@/lib/monsters';
import { notFound } from 'next/navigation';

export default function MonsterPage({ params }: { params: { id: string } }) {
  const monster = getMonsterById(params.id);

  if (!monster) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">{monster.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Details</h2>
          <p><strong>Type:</strong> {monster.type}</p>
          <p><strong>Elements:</strong> {monster.elements.join(', ')}</p>
          <p><strong>Weaknesses:</strong> {monster.weaknesses.join(', ')}</p>
          <p><strong>Habitats:</strong> {monster.habitats.join(', ')}</p>
          <p><strong>Size:</strong> {monster.size.average} {monster.size.unit}</p>
          <p><strong>Difficulty:</strong> {"⭐".repeat(monster.difficulty)}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Description</h2>
          <p>{monster.description}</p>
        </div>
      </div>
    </div>
  );
}
