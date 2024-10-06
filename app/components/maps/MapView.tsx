"use client"

import React, { useEffect } from 'react'
import { MapContainer, Rectangle, Marker, Popup, useMap } from 'react-leaflet'
import { CRS, LatLngBounds, LatLng, Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { PointOfInterest } from '@/lib/maps';
import styles from './MapView.module.css';

const customIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1tYXAtcGluIj48cGF0aCBkPSJNMjAgMTBjMCA2LTggMTItOCAxMnMtOC02LTgtMTJhOCA4IDAgMCAxIDE2IDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSIzIi8+PC9zdmc+',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function MapTheme() {
  const map = useMap();

  useEffect(() => {
    const root = document.documentElement;
    const bgColor = getComputedStyle(root).getPropertyValue('--bg-primary').trim();
    const textColor = getComputedStyle(root).getPropertyValue('--text-primary').trim();

    map.getContainer().style.backgroundColor = bgColor;
    const tiles = document.querySelectorAll('.leaflet-tile') as NodeListOf<HTMLElement>;
    tiles.forEach(tile => {
      tile.style.filter = `
        brightness(${bgColor === '#111827' ? '0.8' : '1'})
        contrast(${bgColor === '#111827' ? '1.2' : '1'})
      `;
    });

    const svgElements = map.getContainer().querySelectorAll('svg') as NodeListOf<SVGElement>;
    svgElements.forEach(svg => {
      svg.style.stroke = textColor;
    });
  }, [map]);

  return null;
}

export interface MapViewProps {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  imageUrl: string;
  pointsOfInterest: PointOfInterest[];
}

export default function MapView({ mapData }: { mapData: MapViewProps }) {
  const bounds = new LatLngBounds(
    [0, 0],
    [100, 100]
  );

  return (
    <div className={`${styles.mapWrapper} ${styles.leafletContainer}`}>
      <MapContainer
        bounds={bounds}
        style={{ height: "100%", width: "100%" }}
        crs={CRS.Simple}
        minZoom={-5}  // Changed from -3
        maxZoom={5}   // Changed from 3
        className={styles.mapContainer}
      >
        <MapTheme />
        <Rectangle bounds={bounds} pathOptions={{ color: 'var(--text-primary)', weight: 1 }} />
        {mapData.pointsOfInterest?.map((poi) => (
          <Marker
            key={poi.id}
            position={new LatLng(poi.latitude, poi.longitude)}
            icon={customIcon}
          >
            <Popup>
              <div className={styles.popupContent}>
                <h3 className={styles.popupTitle}>{poi.name}</h3>
                <p className={styles.popupType}>Type: {poi.type}</p>
                <p className={styles.popupDescription}>{poi.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
