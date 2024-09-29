'use client';

import { useState, useEffect } from 'react';
import { monsters, Monster } from '@/lib/monsters';
import { Card } from '@/app/components/Card';
import { CustomDropdown, Option } from '@/app/components/CustomDropdown';
import { weaknessConfigs, WeaknessConfig } from '@/app/components/WeaknessConfig';

interface Weakness {
  part: string;
  type: string;
  effectiveness: number;
}

function WeaknessDisplay({ weakness }: { weakness: Weakness }) {
  const config: WeaknessConfig = weaknessConfigs[weakness.type.toLowerCase()] || {
    color: 'text-gray-500',
    fallback: weakness.type,
  };

  return (
    <div className="flex items-center space-x-1">
      <span className="font-medium">{weakness.part}:</span>
      <span className={`flex items-center space-x-1 ${config.color}`}>
        <span>{config.icon || config.fallback}</span>
        <span>{weakness.effectiveness}</span>
      </span>
    </div>
  );
}

export default function MonsterPage() {
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [habitatFilter, setHabitatFilter] = useState<string>('All');
  const [filteredMonsters, setFilteredMonsters] = useState<Monster[]>(monsters);

  const createOptions = (values: (string | undefined)[]): Option[] => {
    const uniqueValues = Array.from(new Set(values.filter((value): value is string => typeof value === 'string')));
    return [{ value: 'All', label: 'All' }, ...uniqueValues.map(value => ({ value, label: value }))];
  };

  const typeOptions = createOptions(monsters.map(m => m.type));
  const habitatOptions = createOptions(monsters.flatMap(m => m.habitats || []));

  useEffect(() => {
    setFilteredMonsters(monsters.filter(monster =>
      (typeFilter === 'All' || monster.type === typeFilter) &&
      (habitatFilter === 'All' || monster.habitats?.includes(habitatFilter))
    ));
  }, [typeFilter, habitatFilter]);

  const getTopWeaknesses = (monster: Monster): Weakness[] => {
    if (!monster.bodyParts) return [];

    const weaknessesByPart: { [key: string]: Weakness } = {};

    monster.bodyParts.forEach(bodyPart => {
      const allWeaknesses = [
        ...Object.entries(bodyPart.weakness.elemental),
        ...Object.entries(bodyPart.weakness.status)
      ];

      const highestWeakness = allWeaknesses.reduce(
        (max, [type, effectiveness]) => (effectiveness || 0) > max.effectiveness ? { type, effectiveness: effectiveness || 0 } : max,
        { type: '', effectiveness: 0 }
      );

      if (highestWeakness.effectiveness > (weaknessesByPart[bodyPart.name]?.effectiveness || 0)) {
        weaknessesByPart[bodyPart.name] = {
          part: bodyPart.name,
          type: highestWeakness.type,
          effectiveness: highestWeakness.effectiveness
        };
      }
    });

    return Object.values(weaknessesByPart)
      .sort((a, b) => b.effectiveness - a.effectiveness)
      .slice(0, 3);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Monster List</h1>
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="bg-secondary text-primary border-color rounded">
          <CustomDropdown
            options={typeOptions}
            value={typeFilter}
            onChange={(value: string) => setTypeFilter(value)}
            placeholder="Select Type"
          />
        </div>
        <div className="bg-secondary text-primary border-color rounded">
          <CustomDropdown
            options={habitatOptions}
            value={habitatFilter}
            onChange={(value: string) => setHabitatFilter(value)}
            placeholder="Select Habitat"
          />
        </div>
      </div>
      <div className="space-y-4">
        {filteredMonsters.map((monster) => {
          const topWeaknesses = getTopWeaknesses(monster);
          return (
            <Card
              key={monster.id}
              title={
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">{monster.name}</span>
                  <span className="text-sm text-secondary">Difficulty: {monster.difficulty ?? 'Unknown'}</span>
                </div>
              }
              subtitle={`${monster.type || 'Unknown'} | ${monster.habitats?.join(', ') || 'Unknown'}`}
              description={
                <div className="text-sm grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                  {topWeaknesses.length > 0 ? topWeaknesses.map((weakness, index) => (
                    <WeaknessDisplay key={index} weakness={weakness} />
                  )) : <span>No weakness data available</span>}
                </div>
              }
              link={`/monsters/${monster.id}`}
              className="bg-secondary hover:shadow-lg transition-shadow w-full"
            />
          );
        })}
      </div>
    </div>
  );
}
