import React from 'react';
import Link from 'next/link';
import { monsters } from '@/lib/monsters';
import styles from './MonsterPage.module.css';

export default function MonsterPage() {
  // Sort monsters by difficulty in descending order
  const sortedMonsters = [...monsters].sort((a, b) => b.difficulty - a.difficulty);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Monster List</h1>
      <div className={styles.monsterGrid}>
        {sortedMonsters.map((monster) => (
          <Link href={`/monsters/${monster.id}`} key={monster.id} className={styles.monsterCard}>
            <h2 className={styles.monsterName}>{monster.name}</h2>
            <p className={styles.monsterType}>{monster.type}</p>
            <p className={styles.monsterDifficulty}>Difficulty: {monster.difficulty}</p>
            <div className={styles.monsterElements}>
              {monster.elements.map((element) => (
                <span key={element} className={`${styles.element} ${styles[element.toLowerCase()]}`}>{element}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
