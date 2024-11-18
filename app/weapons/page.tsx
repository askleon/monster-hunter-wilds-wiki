import Image from 'next/image';
import { Card } from '@/components/Card';
import { WeaponTypes, WeaponTypeInfo } from '@/lib/weapons/weapons';

export default function WeaponsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Weapons</h1>
      <p className="text-lg text-secondary mb-8">
        Explore the various weapon types available in Monster Hunter Wilds!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {WeaponTypes.map((weaponInfo) => (
          <WeaponTypeCard key={weaponInfo.id} weaponInfo={weaponInfo} />
        ))}
      </div>
    </div>
  );
}

function WeaponTypeCard({ weaponInfo }: { weaponInfo: WeaponTypeInfo }) {
  return (
    <Card
      title={
        <div className="flex flex-col items-center text-center">
          <Image
            src={weaponInfo.icon}
            alt={weaponInfo.name}
            width={48}
            height={48}
            className="mb-2"
          />
          <span className="text-lg font-bold">{weaponInfo.name}</span>
        </div>
      }
      description=""
      link={`/weapons/${weaponInfo.id}`}
      className="hover:shadow-lg transition-shadow w-full"
      blur="sm"
      opacity="medium"
    />
  );
}
