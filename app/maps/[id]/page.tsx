'use client';

import { getMapById } from '@/lib/maps';
import MapView from '@/app/components/MapView';
import MapFilter from '@/app/components/MapFilter';
import MapSearch from '@/app/components/MapSearch';
import styles from './page.module.css';
import { useState, useCallback } from 'react';
import { PointOfInterest } from '@/lib/maps';

export default function MapPage({ params }: { params: { id: string } }) {
  const mapId = params.id;
  const mapData = getMapById(mapId);
  const [filteredPOIs, setFilteredPOIs] = useState<PointOfInterest[]>(mapData?.pointsOfInterest || []);
  const [searchResults, setSearchResults] = useState<PointOfInterest[] | null>(null);

  if (!mapData) {
    return <div>Map not found</div>;
  }

  const handleFilter = useCallback((filteredPOIs: PointOfInterest[]) => {
    setFilteredPOIs(filteredPOIs);
    setSearchResults(null); // Clear search results when filtering
  }, []);

  const handleSearch = useCallback((results: PointOfInterest[]) => {
    setSearchResults(results);
    setFilteredPOIs(mapData.pointsOfInterest); // Reset filter when searching
  }, [mapData.pointsOfInterest]);

  const displayData = {
    ...mapData,
    pointsOfInterest: searchResults || filteredPOIs
  };

  return (
    <main className={styles.mainContent}>
      <h1 className={styles.mapTitle}>{mapData.name}</h1>
      <div className={styles.mapControls}>
        <MapFilter mapData={mapData} onFilter={handleFilter} />
        <MapSearch mapData={mapData} onSearch={handleSearch} />
      </div>
      <div className={styles.mapContainer}>
        <MapView mapData={displayData} />
      </div>
    </main>
  );
}
