'use client';

import React, { useState } from 'react';
import { monsters, Monster, BodyPart } from '@/lib/monsters';
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

  const getHighestWeakness = (bodyPart: BodyPart): { type: string; effectiveness: number } => {
    const allWeaknesses = [
      ...Object.entries(bodyPart.weakness.elemental),
      ...Object.entries(bodyPart.weakness.status)
    ];

    return allWeaknesses.reduce((highest, [type, effectiveness]) =>
      effectiveness > highest.effectiveness ? { type, effectiveness } : highest
    , { type: 'None', effectiveness: 0 });
  };

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
      <div className={styles.monsterList}>
        {filteredMonsters.map((monster: Monster) => {
          const weaknesses = monster.bodyParts.map(part => ({
            part: part.name,
            weakness: getHighestWeakness(part)
          }));

          return (
            <Card
              key={monster.id}
              title={monster.name}
              subtitle={`${monster.type} | Difficulty: ${monster.difficulty}`}
              description={
                <div className={styles.monsterInfo}>
                  <p>Habitats: {monster.habitats.join(', ')}</p>
                  <div className={styles.weaknesses}>
                    <strong>Weaknesses:</strong>
                    {weaknesses.map(({ part, weakness }) => (
                      <span key={part} className={styles.weakness}>
                        {part}: <span className={styles.weaknessType}>{weakness.type}</span> ({weakness.effectiveness})
                      </span>
                    ))}
                  </div>
                </div>
              }
              link={`/monsters/${monster.id}`}
              className={styles.monsterCard}
            />
          );
        })}
      </div>
    </div>
  );
}
