import { Card } from '@/app/components/Card';
import { getAllWeaponTrees, WeaponTree, WeaponNode } from '@/lib/weapons';

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
          <p>Base Weapons:</p>
          <ul className="list-disc pl-5">
            {weaponTree.baseWeapons.map((baseWeapon) => (
              <li key={baseWeapon.id}>
                <BaseWeaponInfo weapon={baseWeapon} />
              </li>
            ))}
          </ul>
        </div>
      }
      link={`/weapons/${weaponTree.id}`}
      className="bg-secondary hover:shadow-lg transition-shadow w-full"
    />
  );
}

function BaseWeaponInfo({ weapon }: { weapon: WeaponNode }) {
  return (
    <div>
      <p className="font-semibold">{weapon.name}</p>
      <p>Attack: {weapon.stats.attack}</p>
      <p>Affinity: {weapon.stats.affinity}%</p>
      {weapon.stats.element && (
        <p>Element: {weapon.stats.element.type} ({weapon.stats.element.value})</p>
      )}
      {weapon.stats.status && (
        <p>Status: {weapon.stats.status.type} ({weapon.stats.status.value})</p>
      )}
    </div>
  );
}
