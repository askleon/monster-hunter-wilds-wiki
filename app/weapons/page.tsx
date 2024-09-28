import { Card } from '@/app/components/Card';
import { getAllWeaponTrees, WeaponTree } from '@/lib/weapons';

export default function WeaponsPage() {
  const weaponTrees = getAllWeaponTrees();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Weapons</h1>
      <p className="text-lg text-secondary mb-8">
        Explore the various weapon types available in Monster Hunter Wilds!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {weaponTrees.map((weaponTree) => (
          <WeaponTreeCard key={weaponTree.id} weaponTree={weaponTree} />
        ))}
      </div>
    </div>
  );
}

function WeaponTreeCard({ weaponTree }: { weaponTree: WeaponTree }) {
  const baseWeapon = weaponTree.baseWeapon;

  return (
    <Card
      title={
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">{weaponTree.name}</span>
        </div>
      }
      subtitle={weaponTree.type}
      description={
        <div className="text-sm space-y-2">
          <p>Base Weapon: {baseWeapon.name}</p>
          <p>Attack: {baseWeapon.stats.attack}</p>
          <p>Affinity: {baseWeapon.stats.affinity}%</p>
          {baseWeapon.stats.element && (
            <p>Element: {baseWeapon.stats.element.type} ({baseWeapon.stats.element.value})</p>
          )}
          {baseWeapon.stats.status && (
            <p>Status: {baseWeapon.stats.status.type} ({baseWeapon.stats.status.value})</p>
          )}
        </div>
      }
      link={`/weapons/${weaponTree.id}`}
      className="bg-secondary hover:shadow-lg transition-shadow w-full"
    />
  );
}
