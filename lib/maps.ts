import mapsData from '../data/maps.json';

export interface PointOfInterest {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  type: string;
  description: string;
}

export interface MapViewItem {
  id: string;
  name: string;
  description: string;
  thumbnail: string | null;
  imageUrl: string | null;
  pointsOfInterest: PointOfInterest[];
}

export const maps: MapViewItem[] = mapsData;


export const getMapById = (id: string): MapViewItem | undefined => {
  return maps.find(map => map.id === id);
};

