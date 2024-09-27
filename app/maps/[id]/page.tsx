import { getMapById } from '@/lib/maps';
import MapView from '@/app/components/MapView';
import styles from './page.module.css';

export default async function MapPage({ params }: { params: { id: string } }) {
  const mapId = params.id;
  const mapData = await getMapById(mapId);

  if (!mapData) {
    return <div>Map not found</div>;
  }

  return (
    <main className={styles.mainContent}>
      <h1 className={styles.mapTitle}>{mapData.name}</h1>
      <div className={styles.mapContainer}>
        <MapView mapData={mapData} />
      </div>
    </main>
  );
}
