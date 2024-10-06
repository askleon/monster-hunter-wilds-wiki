'use client';

import React, { useState, useEffect } from 'react';
import { PointOfInterest } from '@/lib/maps';
import styles from './MapSearch.module.css';
import { MapViewItem } from '@/lib/maps';

interface MapSearchProps {
  mapData: MapViewItem;
  onSearch: (searchResults: PointOfInterest[]) => void;
}

const MapSearch: React.FC<MapSearchProps> = ({ mapData, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const results = searchTerm.trim() === ''
      ? mapData.pointsOfInterest
      : mapData.pointsOfInterest.filter((poi) =>
        poi.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    onSearch(results);
  }, [searchTerm, mapData, onSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search locations..."
        className={styles.searchInput}
      />
    </div>
  );
};

export default MapSearch;
