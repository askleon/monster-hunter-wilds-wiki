'use client'

import { useParams } from 'next/navigation';
import { getMonsterById } from '@/lib/monsters';
import styles from './MonsterDetails.module.css';
import { BodyPartWeakness } from '@/lib/monsters';
import { useState } from 'react';

export default function MonsterDetails() {
  const params = useParams();
  const monsterId = params.id as string;
  const monster = getMonsterById(monsterId);

  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

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
        <p className={styles.difficulty}>Difficulty: {monster.difficulty}</p>
      </header>

      <section className={styles.mainInfo}>
        <p className={styles.description}>{monster.description}</p>
      </section>

      <section className={styles.infoCard}>
        <div className={styles.infoItem}>
          <h3>Size</h3>
          <p>{monster.size.average} {monster.size.unit}</p>
        </div>
        <div className={styles.infoItem}>
          <h3>Elements</h3>
          <ul className={styles.list}>
            {monster.elements.map((element, index) => (
              <li key={index}>{element}</li>
            ))}
          </ul>
        </div>
        <div className={styles.infoItem}>
          <h3>Habitats</h3>
          <ul className={styles.list}>
            {monster.habitats.map((habitat, index) => (
              <li key={index}>{habitat}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.weaknesses}>
        <div className={styles.tableWrapper}>
          <table className={styles.weaknessTable}>
            <thead>
              <tr className={styles.weaknessHeader}>
                <th colSpan={4}>Weaknesses</th>
              </tr>
              <tr>
                <th onMouseEnter={() => setHoveredCol(0)} onMouseLeave={() => setHoveredCol(null)}>Body Part</th>
                <th onMouseEnter={() => setHoveredCol(1)} onMouseLeave={() => setHoveredCol(null)}>Physical</th>
                <th onMouseEnter={() => setHoveredCol(2)} onMouseLeave={() => setHoveredCol(null)}>Elemental</th>
                <th onMouseEnter={() => setHoveredCol(3)} onMouseLeave={() => setHoveredCol(null)}>Status</th>
              </tr>
            </thead>
            <tbody>
              {monster.bodyParts.map((part, rowIndex) => (
                <tr
                  key={rowIndex}
                  onMouseEnter={() => setHoveredRow(rowIndex)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={rowIndex === hoveredRow ? styles.hoveredRow : ''}
                >
                  <td className={hoveredCol === 0 ? styles.hoveredCol : ''}>{part.name}</td>
                  <td className={hoveredCol === 1 ? styles.hoveredCol : ''}>
                    {Object.entries(part.weakness.physical).map(([type, value]) => (
                      <div key={type} className={styles.weaknessValue}>
                        <span className={styles.weaknessType}>{type}:</span> {value}
                      </div>
                    ))}
                  </td>
                  <td className={hoveredCol === 2 ? styles.hoveredCol : ''}>
                    {Object.entries(part.weakness.elemental).map(([type, value]) => (
                      <div key={type} className={styles.weaknessValue}>
                        <span className={styles.weaknessType}>{type}:</span> {value}
                      </div>
                    ))}
                  </td>
                  <td className={hoveredCol === 3 ? styles.hoveredCol : ''}>
                    {Object.entries(part.weakness.status).map(([type, value]) => (
                      <div key={type} className={styles.weaknessValue}>
                        <span className={styles.weaknessType}>{type}:</span> {value}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
