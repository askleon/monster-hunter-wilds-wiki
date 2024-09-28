'use client';

import React, { useState, useEffect } from 'react';
import { MapViewProps } from '@/app/components/MapView';
import { PointOfInterest } from '@/lib/maps';

interface MapFilterProps {
  mapData: MapViewProps;
  onFilter: (filteredPOIs: PointOfInterest[]) => void;
}

const MapFilter: React.FC<MapFilterProps> = ({ mapData, onFilter }) => {
  const [filters, setFilters] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initialFilters: Record<string, boolean> = {};
    mapData.pointsOfInterest.forEach((poi) => {
      initialFilters[poi.type] = true;
    });
    setFilters(initialFilters);
  }, [mapData]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: checked }));
  };

  useEffect(() => {
    const filteredPOIs = mapData.pointsOfInterest.filter((poi) => filters[poi.type]);
    onFilter(filteredPOIs);
  }, [filters, mapData, onFilter]);

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {Object.entries(filters).map(([type, isChecked]) => (
        <label key={type} className="flex items-center cursor-pointer text-sm px-3 py-1 rounded-full transition-colors bg-secondary text-primary hover:bg-accent hover:bg-opacity-20">
          <input
            type="checkbox"
            name={type}
            checked={isChecked}
            onChange={handleFilterChange}
            className="mr-2 cursor-pointer"
          />
          {type}
        </label>
      ))}
    </div>
  );
};

export default MapFilter;
