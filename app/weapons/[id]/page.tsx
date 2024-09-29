import { WeaponTree } from '@/app/components/WeaponTree';
import { getWeaponTreeById } from '@/lib/weapons';

export default function WeaponTreePage({ params }: { params: { id: string } }) {
  const weaponTree = getWeaponTreeById(params.id);

  if (!weaponTree) {
    return <div>Weapon tree not found.</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-3xl font-bold text-primary mb-6">{weaponTree.name}</h1>
      <div className="flex-grow overflow-hidden">
        <WeaponTree weaponTree={weaponTree} />
      </div>
    </div>
  );
}
