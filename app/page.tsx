import { Card } from '@/components/Card';
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
          title={
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">{featuredMonster.name}</span>
              <span className="text-sm text-secondary">Difficulty: {featuredMonster.difficulty}</span>
            </div>
          }
          subtitle={`${featuredMonster.type} | ${featuredMonster.habitats?.join(', ') || 'Unknown'}`}
          description={<p>{featuredMonster.description}</p>}
          link={`/monsters/${featuredMonster.id}`}
          className={`${styles.featuredMonsterCard} bg-secondary hover:shadow-lg transition-shadow w-full`}
        />
      </section>

      <div className={styles.grid}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Monsters</h2>
          <div className={styles.cardList}>
            {monsters.slice(0, 5).map((monster) => (
              <Card
                key={monster.id}
                title={
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">{monster.name}</span>
                    <span className="text-sm text-secondary">Difficulty: {monster.difficulty}</span>
                  </div>
                }
                subtitle={`${monster.type} | ${monster.habitats?.join(', ') || 'Unknown'}`}
                link={`/monsters/${monster.id}`}
                className="bg-secondary hover:shadow-lg transition-shadow w-full"
              />
            ))}
            <Card
              title={<span className="text-xl font-bold">View all monsters</span>}
              link="/monsters"
              className="bg-secondary hover:shadow-lg transition-shadow w-full text-center"
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Maps</h2>
          <div className={styles.cardList}>
            {maps.slice(0, 5).map((map) => (
              <Card
                key={map.id}
                title={<span className="text-xl font-bold">{map.name}</span>}
                subtitle={`Points of Interest: ${map.pointsOfInterest.length}`}
                description={<p className="text-sm">{map.description}</p>}
                link={`/maps/${map.id}`}
                className="bg-secondary hover:shadow-lg transition-shadow w-full"
              />
            ))}
            <Card
              title={<span className="text-xl font-bold">View all maps</span>}
              link="/maps"
              className="bg-secondary hover:shadow-lg transition-shadow w-full text-center"
            />
          </div>
        </section>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>About Monster Hunter Wilds</h2>
        <p className={styles.about}>
          Monster Hunter Wilds is the latest installment in the Monster Hunter series.
          This wiki provides comprehensive information about the game&apos;s monsters, maps,
          weapons, and more. Whether you&apos;re a seasoned hunter or new to the series,
          you&apos;ll find valuable resources to aid you in your hunts.
        </p>
      </section>
    </div>
  );
}
