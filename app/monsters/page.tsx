'use client';

import { useState, useEffect } from 'react';
import { monsters, Monster, BodyPartWeakness } from '@/lib/monsters';
import { Card } from '@/app/components/Card';
import { CustomDropdown, Option } from '@/app/components/CustomDropdown';

interface Weakness {
  part: string;
  type: string;
  effectiveness: number;
}

export default function MonsterPage() {
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [habitatFilter, setHabitatFilter] = useState<string>('All');
  const [filteredMonsters, setFilteredMonsters] = useState<Monster[]>(monsters);

  const createOptions = (values: string[]): Option[] =>
    values.map(value => ({ value, label: value }));

  const typeOptions = createOptions(['All', ...Array.from(new Set(monsters.map(m => m.type)))]);
  const habitatOptions = createOptions(['All', ...Array.from(new Set(monsters.flatMap(m => m.habitats)))]);

  useEffect(() => {
    setFilteredMonsters(monsters.filter(monster =>
      (typeFilter === 'All' || monster.type === typeFilter) &&
      (habitatFilter === 'All' || monster.habitats.includes(habitatFilter))
    ));
  }, [typeFilter, habitatFilter]);

  const getTopWeaknesses = (monster: Monster): Weakness[] => {
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
              title={monster.name}
              subtitle={`${monster.type} | Difficulty: ${monster.difficulty}`}
              description={
                <div className="text-primary grid grid-cols-1 gap-4">
                  <div>
                    <p className="mb-2">{monster.description}</p>
                    <p>Habitats: {monster.habitats.join(', ')}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    {topWeaknesses.map((weakness, index) => (
                      <div key={index}>
                        <strong>{weakness.part}:</strong>
                        <p>{weakness.type} ({weakness.effectiveness})</p>
                      </div>
                    ))}
                  </div>
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
