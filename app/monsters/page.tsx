'use client';

import React, { useState } from 'react';
import { monsters, Monster } from '@/lib/monsters';
import { Card } from '@/app/components/Card';
import { CustomDropdown } from '@/app/components/CustomDropdown';
import styles from './MonsterPage.module.css';

export default function MonsterPage() {
  const [typeFilter, setTypeFilter] = useState('');
  const [habitatFilter, setHabitatFilter] = useState('');

  const sortedMonsters = [...monsters].sort((a, b) => b.difficulty - a.difficulty);

  const filteredMonsters = sortedMonsters.filter(monster =>
    (typeFilter === '' || monster.type === typeFilter) &&
    (habitatFilter === '' || monster.habitats.includes(habitatFilter))
  );

  const uniqueTypes = Array.from(new Set(monsters.map(m => m.type)));
  const uniqueHabitats = Array.from(new Set(monsters.flatMap(m => m.habitats)));

  const typeOptions = [{ value: '', label: 'All Types' }, ...uniqueTypes.map(type => ({ value: type, label: type }))];
  const habitatOptions = [{ value: '', label: 'All Habitats' }, ...uniqueHabitats.map(habitat => ({ value: habitat, label: habitat }))];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Monster List</h1>
      <div className={styles.filters}>
        <CustomDropdown
          options={typeOptions}
          value={typeFilter}
          onChange={setTypeFilter}
          placeholder="Select Type"
        />
        <CustomDropdown
          options={habitatOptions}
          value={habitatFilter}
          onChange={setHabitatFilter}
          placeholder="Select Habitat"
        />
      </div>
      <div className={styles.monsterGrid}>
        {filteredMonsters.map((monster: Monster) => (
          <Card
            key={monster.id}
            title={monster.name}
            subtitle={monster.type}
            description={`Difficulty: ${monster.difficulty} | Habitats: ${monster.habitats.join(', ')}`}
            link={`/monsters/${monster.id}`}
          />
        ))}
      </div>
    </div>
  );
}
