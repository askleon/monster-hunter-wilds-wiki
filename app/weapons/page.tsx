import { Card } from '@/app/components/Card';
import { getAllWeaponTrees } from '@/lib/weapons';

export default function WeaponsPage() {
  const weapons = getAllWeaponTrees();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Weapons</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {weapons.map((weapon) => (
          <Card
            key={weapon.id}
            title={weapon.name}
            subtitle={weapon.type}
            link={`/weapons/${weapon.id}`}
          />
        ))}
      </div>
    </div>
  );
}
