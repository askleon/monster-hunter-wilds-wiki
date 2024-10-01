import Link from 'next/link';
import { getTalismanById } from '@/lib/talismans';
import { notFound } from 'next/navigation';

export default function TalismanPage({ params }: { params: { id: string } }) {
  const talisman = getTalismanById(params.id);

  if (!talisman) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/talismans" className="text-accent hover:underline mb-4 inline-block">
        &larr; Back to Talisman List
      </Link>
      <h1 className="text-3xl font-bold mb-4 text-primary">{talisman.name}</h1>
      <p className="mb-4 text-secondary">{talisman.description}</p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-primary">Skills:</h2>
        <ul className="list-disc list-inside text-secondary">
          {talisman.skills.map((skillInfo, index) => (
            <li key={index}>
              {skillInfo.skill.name} Lv. {skillInfo.level}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-primary">Slots:</h2>
        <p className="text-secondary">{talisman.slots.join(', ')}</p>
      </div>
      <p className="text-secondary">Rarity: {talisman.rarity}</p>
    </div>
  );
}
