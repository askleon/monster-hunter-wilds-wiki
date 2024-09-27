import { getWeaponTreeById } from '@/lib/weapons';
import { WeaponTree } from '@/app/components/WeaponTree';

export default function WeaponPage({ params }: { params: { id: string } }) {
  const weaponTree = getWeaponTreeById(params.id);

  if (!weaponTree) {
    return <div>Weapon not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{weaponTree.name}</h1>
      <p className="mb-4">Type: {weaponTree.type}</p>
      <WeaponTree baseWeapon={weaponTree.baseWeapon} />
    </div>
  );
}