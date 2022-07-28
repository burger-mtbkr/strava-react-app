/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-for-in-array */
import polyline from '@mapbox/polyline';
import { IPoint } from 'src/models';

export const decodePolyline = (encodedString: string): IPoint[] => {
  const decoded = polyline.decode(encodedString);
  if (decoded?.length < 1) return [];
  const path: IPoint[] = [];
  for (const p in decoded) {
    const elem = decoded[p];
    path.push({
      lat: elem[0],
      lng: elem[1],
    });
  }
  return path;
};

// eslint-disable-next-line no-undef
export const createBounds = (path: IPoint[]): google.maps.LatLngBounds => {
  const bounds = new window.google.maps.LatLngBounds();
  path.map((p: IPoint) => bounds.extend(p));
  return bounds;
};
