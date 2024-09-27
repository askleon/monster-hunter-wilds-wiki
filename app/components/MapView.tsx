"use client"

import React from 'react'
import { MapContainer, Rectangle, Marker, Popup } from 'react-leaflet'
import { CRS, LatLngBounds, LatLng, Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapViewProps } from '@/lib/maps';
import styles from './MapView.module.css';

const customIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1tYXAtcGluIj48cGF0aCBkPSJNMjAgMTBjMCA2LTggMTItOCAxMnMtOC02LTgtMTJhOCA4IDAgMCAxIDE2IDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSIzIi8+PC9zdmc+',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapView({ mapData }: { mapData: MapViewProps }) {
  const bounds = new LatLngBounds([0, 0], [100, 100]);

  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        bounds={bounds}
        style={{ height: "100%", width: "100%" }}
        crs={CRS.Simple}
        minZoom={-3}
        maxZoom={3}
        className={styles.mapContainer}
      >
        <Rectangle bounds={bounds} pathOptions={{ color: '#4a5568', weight: 1 }} />
        {mapData.pointsOfInterest?.map((poi) => (
          <Marker 
            key={poi.id} 
            position={new LatLng(poi.latitude, poi.longitude)}
            icon={customIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="text-lg font-semibold mb-1">{poi.name}</h3>
                <p className="text-sm text-gray-600 mb-2">Type: {poi.type}</p>
                <p className="text-sm">{poi.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}