import { Card } from '@/app/components/Card';
import { monsters } from '@/lib/monsters';
import { maps } from '@/lib/maps';
import styles from './Home.module.css';

export default function Home() {
  const featuredMonster = monsters[Math.floor(Math.random() * monsters.length)];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Monster Hunter Wilds Wiki</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Featured Monster</h2>
        <Card
          title={featuredMonster.name}
          subtitle={`${featuredMonster.type} | Difficulty: ${featuredMonster.difficulty}`}
          description={
            <div className={styles.featuredMonsterInfo}>
              <p>{featuredMonster.description}</p>
              <p>Habitats: {featuredMonster.habitats.join(', ')}</p>
            </div>
          }
          link={`/monsters/${featuredMonster.id}`}
          className={styles.featuredMonsterCard}
        />
      </section>

      <div className={styles.grid}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Monsters</h2>
          <div className={styles.cardList}>
            {monsters.slice(0, 5).map((monster) => (
              <Card
                key={monster.id}
                title={monster.name}
                subtitle={monster.type}
                description=""
                link={`/monsters/${monster.id}`}
              />
            ))}
            <Card
              title="View all monsters"
              subtitle=""
              description=""
              link="/monsters"
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Maps</h2>
          <div className={styles.cardList}>
            {maps.slice(0, 5).map((map) => (
              <Card
                key={map.id}
                title={map.name}
                subtitle=""
                description=""
                link={`/maps/${map.id}`}
              />
            ))}
            <Card
              title="View all maps"
              subtitle=""
              description=""
              link="/maps"
            />
          </div>
        </section>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>About Monster Hunter Wilds</h2>
        <p className={styles.about}>
          Monster Hunter Wilds is the latest installment in the Monster Hunter series.
          This wiki provides comprehensive information about the game's monsters, maps,
          weapons, and more. Whether you're a seasoned hunter or new to the series,
          you'll find valuable resources to aid you in your hunts.
        </p>
      </section>
    </div>
  );
}
