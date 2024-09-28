'use client';

import React, { useEffect, useState, useRef } from 'react';
import { PointOfInterest } from '@/lib/maps';
import styles from './MapFilter.module.css';
import { MapViewProps } from './MapView';

interface MapFilterProps {
  mapData: MapViewProps;
  onFilter: (filteredPOIs: PointOfInterest[]) => void;
}

const MapFilter: React.FC<MapFilterProps> = ({ mapData, onFilter }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const types = Array.from(new Set(mapData.pointsOfInterest.map(poi => poi.type)));

  const filterStateRef = useRef(selectedTypes);

  useEffect(() => {
    filterStateRef.current = selectedTypes;
  }, [selectedTypes]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filteredPOIs = mapData.pointsOfInterest.filter(poi =>
        selectedTypes.length === 0 || selectedTypes.includes(poi.type)
      );
      onFilter(filteredPOIs);
    }, 300); // Debounce for 300ms

    return () => clearTimeout(timeoutId);
  }, [selectedTypes, mapData, onFilter]);

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <div className={styles.filterContainer}>
      {types.map(type => (
        <label key={type} className={styles.filterLabel}>
          <input
            type="checkbox"
            checked={selectedTypes.includes(type)}
            onChange={() => handleTypeToggle(type)}
            className={styles.filterCheckbox}
          />
          {type}
        </label>
      ))}
    </div>
  );
};

export default MapFilter;
