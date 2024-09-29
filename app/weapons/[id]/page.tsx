import { WeaponTree } from '@/app/components/WeaponTree';
import { getWeaponTreeById } from '@/lib/weapons';

export default function WeaponTreePage({ params }: { params: { id: string } }) {
  const weaponTree = getWeaponTreeById(params.id);

  if (!weaponTree) {
    return <div>Weapon tree not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">{weaponTree.name}</h1>
      <WeaponTree weaponTree={weaponTree} />
    </div>
  );
}
