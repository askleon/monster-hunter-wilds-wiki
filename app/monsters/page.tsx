'use client';

import { useState, useEffect } from 'react';
import { monsters, Monster } from '@/lib/monsters';
import { Card } from '@/components/Card';
import { CustomDropdown, Option } from '@/components/CustomDropdown';

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
        {filteredMonsters.map((monster) => (
          <Card
            key={monster.id}
            title={
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">{monster.name}</span>
              </div>
            }
            subtitle={`${monster.type || 'Unknown'} | ${monster.habitats?.join(', ') || 'Unknown'}`}
            description={
              <div className="text-sm mt-2">
                {monster.description}
              </div>
            }
            link={`/monsters/${monster.id}`}
            className="bg-secondary hover:shadow-lg transition-shadow w-full"
          />
        ))}
      </div>
    </div>
  );
}
