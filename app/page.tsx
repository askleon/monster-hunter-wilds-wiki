import { Card } from '@/components/Card';
import { monsters } from '@/lib/monsters';
import { maps } from '@/lib/maps';
import styles from './Home.module.css';
import GithubLink from '@/components/links/GithubLink';
export default function Home() {

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Monster Hunter Wilds Wiki</h1>
      <section className={styles.section}>
        <div className="rounded-lg border border-gray-700 p-4">
          <h2 className="text-1xl font-bold">Welcome hunter!</h2>
          <p>
            A lot of data has been added, a lot more is needed.
            This is a hobby project, so updates may be slow.
            If you want to contribute, please visit:
            <GithubLink className="mt-2" text='Github repository'/>
          </p>
        </div>
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
