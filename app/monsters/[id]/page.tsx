'use client'

import { useParams } from 'next/navigation';
import { getMonsterById } from '@/lib/monsters';
import styles from './MonsterDetails.module.css';
import { BodyPartWeakness } from '@/lib/monsters';
export default function MonsterDetails() {
  const params = useParams();
  const monsterId = params.id as string;

  const monster = getMonsterById(monsterId);

  if (!monster) {
    return (
      <div className={styles.errorContainer}>
        <h1>Monster not found</h1>
        <p>ID: {monsterId}</p>
        <p>Please check if this ID exists in the monster data.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{monster.name}</h1>
        <p className={styles.type}>{monster.type}</p>
      </header>

      <section className={styles.mainInfo}>
        <p className={styles.description}>{monster.description}</p>
        <div className={styles.stats}>
          <p>Difficulty: <span>{monster.difficulty}</span></p>
          <p>Size: <span>{monster.size.average} {monster.size.unit}</span></p>
        </div>
      </section>

      <section className={styles.details}>
        <div className={styles.detailColumn}>
          <h2>Elements</h2>
          <ul className={styles.list}>
            {monster.elements.map((element, index) => (
              <li key={index}>{element}</li>
            ))}
          </ul>
        </div>

        <div className={styles.detailColumn}>
          <h2>Habitats</h2>
          <ul className={styles.list}>
            {monster.habitats.map((habitat, index) => (
              <li key={index}>{habitat}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.weaknesses}>
        <h2>Weaknesses</h2>
        {monster.bodyParts.map((part, index) => (
          <div key={index} className={styles.bodyPart}>
            <h3>{part.name}</h3>
            <div className={styles.weaknessGrid}>
              {['physical', 'elemental', 'status'].map((weaknessType) => (
                <div key={weaknessType}>
                  <h4>{weaknessType.charAt(0).toUpperCase() + weaknessType.slice(1)}:</h4>
                  <ul>
                    {Object.entries(part.weakness[weaknessType as keyof BodyPartWeakness] as Record<string, unknown>).map(([type, value]) => (
                      <li key={type}>{type}: <span>{String(value)}</span></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
