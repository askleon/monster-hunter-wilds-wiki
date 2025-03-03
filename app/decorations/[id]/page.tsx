import Link from 'next/link';
import { getDecorationById } from '@/lib/decorations';
import { notFound } from 'next/navigation';

export default function DecorationPage({ params }: { params: { id: string } }) {
  const decoration = getDecorationById(params.id);

  if (!decoration) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/decorations" className="text-accent hover:underline mb-4 inline-block">
        &larr; Back to Decoration List
      </Link>
      <h1 className="text-3xl font-bold mb-4 text-primary">{decoration.name}</h1>
      <p className="mb-4 text-secondary">{decoration.description}</p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-primary">Skill:</h2>
        <p className="text-secondary">
          {decoration.skill.name} Lv. {decoration.skill.level}
        </p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-primary">Slot Size:</h2>
        <p className="text-secondary">{decoration.slotSize}</p>
      </div>
      <p className="text-secondary">Rarity: {decoration.rarity}</p>
    </div>
  );
}
