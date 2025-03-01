'use client'

import { useParams } from 'next/navigation';
import { getMonsterById } from '@/lib/monsters';
import styles from './MonsterDetails.module.css';
import { useState } from 'react';
import SortableFilterableMaterialDropTable from '@/components/SortableFilterableMaterialDropTable';
import { FaFire, FaSkull, FaBed, FaBomb, FaStar, FaEye, FaVolumeUp, FaBolt, FaExclamationTriangle } from 'react-icons/fa';

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
      </header>

      <section className={styles.mainInfo}>
        <p className={styles.description}>{monster.description}</p>
      </section>

      <section className={styles.infoCard}>
        <div className={styles.infoItem}>
          <h3>Habitats</h3>
          {monster.habitats.length > 0 ? (
            <ul className={styles.list}>
              {monster.habitats.map((habitat, index) => (
                <li key={index}>{habitat}</li>
              ))}
            </ul>
          ) : (
            <p>Unknown</p>
          )}
        </div>
        <div className={styles.infoItem}>
          <h3>Special Attacks</h3>
          {monster.specialAttacks.length > 0 ? (
            <ul className={styles.list}>
              {monster.specialAttacks.map((attack, index) => (
                <li key={index}>{attack}</li>
              ))}
            </ul>
          ) : (
            <p>None</p>
          )}
        </div>
      </section>

      {monster.weaknesses.length > 0 && (
        <section className={styles.weaknesses}>
          <div className={styles.tableWrapper}>
            <table className={styles.weaknessTable}>
              <thead>
                <tr className={styles.weaknessHeader}>
                  <th colSpan={9}>Weaknesses</th>
                </tr>
                <tr>
                  <th>Part</th>
                  <th onMouseEnter={() => setHoveredCol(0)} onMouseLeave={() => setHoveredCol(null)} className={hoveredCol === 0 ? styles.hoveredCol : ''}>Slash</th>
                  <th onMouseEnter={() => setHoveredCol(1)} onMouseLeave={() => setHoveredCol(null)} className={hoveredCol === 1 ? styles.hoveredCol : ''}>Blunt</th>
                  <th onMouseEnter={() => setHoveredCol(2)} onMouseLeave={() => setHoveredCol(null)} className={hoveredCol === 2 ? styles.hoveredCol : ''}>Ammo</th>
                  <th onMouseEnter={() => setHoveredCol(3)} onMouseLeave={() => setHoveredCol(null)} className={hoveredCol === 3 ? styles.hoveredCol : ''}>Fire</th>
                  <th onMouseEnter={() => setHoveredCol(4)} onMouseLeave={() => setHoveredCol(null)} className={hoveredCol === 4 ? styles.hoveredCol : ''}>Water</th>
                  <th onMouseEnter={() => setHoveredCol(5)} onMouseLeave={() => setHoveredCol(null)} className={hoveredCol === 5 ? styles.hoveredCol : ''}>Lightning</th>
                  <th onMouseEnter={() => setHoveredCol(6)} onMouseLeave={() => setHoveredCol(null)} className={hoveredCol === 6 ? styles.hoveredCol : ''}>Ice</th>
                  <th onMouseEnter={() => setHoveredCol(7)} onMouseLeave={() => setHoveredCol(null)} className={hoveredCol === 7 ? styles.hoveredCol : ''}>Dragon</th>
                </tr>
              </thead>
              <tbody>
                {monster.weaknesses.map((weakness, index) => (
                  <tr
                    key={index}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={hoveredRow === index ? styles.hoveredRow : ''}
                  >
                    <td>{weakness.part}</td>
                    <td>{weakness.slash}</td>
                    <td>{weakness.blunt}</td>
                    <td>{weakness.ammo}</td>
                    <td>{weakness.fire}</td>
                    <td>{weakness.water}</td>
                    <td>{weakness.lightning}</td>
                    <td>{weakness.ice}</td>
                    <td>{weakness.dragon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {monster.materials.length > 0 && (
        <section className={styles.materials}>
          <SortableFilterableMaterialDropTable materials={monster.materials} />
        </section>
      )}

      {monster.detailedInfo && (
        <section className={"mt-10"}>
          <div className={styles.tableWrapper}>
            <table className={styles.weaknessTable}>
              <thead>
                <tr className={styles.weaknessHeader}>
                  <th colSpan={2}>Detailed Info</th>
                </tr>
                <tr>
                  <th>Icon</th>
                  <th>Info</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><FaFire className={styles.icon} /></td>
                  <td>Recommended Elemental Attack: {monster.detailedInfo.recommended_elemental_attack}</td>
                </tr>
                <tr>
                  <td><FaSkull className={styles.icon} /></td>
                  <td>Poison: {monster.detailedInfo.poison}</td>
                </tr>
                <tr>
                  <td><FaBed className={styles.icon} /></td>
                  <td>Sleep: {monster.detailedInfo.sleep}</td>
                </tr>
                <tr>
                  <td><FaBolt className={styles.icon} /></td>
                  <td>Paralysis: {monster.detailedInfo.paralysis}</td>
                </tr>
                <tr>
                  <td><FaBomb className={styles.icon} /></td>
                  <td>Blastblight: {monster.detailedInfo.blastblight}</td>
                </tr>
                <tr>
                  <td><FaStar className={styles.icon} /></td>
                  <td>Stun: {monster.detailedInfo.stun}</td>
                </tr>
                <tr>
                  <td><FaExclamationTriangle className={styles.icon} /></td>
                  <td>Exhaus: {monster.detailedInfo.exhaus}</td>
                </tr>
                <tr>
                  <td><FaEye className={styles.icon} /></td>
                  <td>Flash: {monster.detailedInfo.flash ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td><FaVolumeUp className={styles.icon} /></td>
                  <td>Sonic: {monster.detailedInfo.sonic ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td><FaBolt className={styles.icon} /></td>
                  <td>Shock: {monster.detailedInfo.shock ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td><FaExclamationTriangle className={styles.icon} /></td>
                  <td>Pitfall: {monster.detailedInfo.pitfall ? 'Yes' : 'No'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
