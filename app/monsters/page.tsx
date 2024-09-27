import React from 'react';
import { monsters } from '@/lib/monsters';
import { Card } from '@/app/components/Card';
import styles from './MonsterPage.module.css';

export default function MonsterPage() {
  const sortedMonsters = [...monsters].sort((a, b) => b.difficulty - a.difficulty);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Monster List</h1>
      <div className={styles.monsterGrid}>
        {sortedMonsters.map((monster) => (
          <Card
            key={monster.id}
            title={monster.name}
            subtitle={monster.type}
            description={`Difficulty: ${monster.difficulty}`}
            link={`/monsters/${monster.id}`}
          />
        ))}
      </div>
    </div>
  );
}
