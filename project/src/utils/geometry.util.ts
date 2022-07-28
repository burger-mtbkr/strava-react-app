/* eslint-disable no-undef */
import polyline from '@mapbox/polyline';
import { LatLng, Polyline } from 'leaflet';
import { IPoint } from 'src/models';

export const decodePolyline = (encodedString: string | undefined): IPoint[] => {
  if (!encodedString) return [];
  const decoded = polyline.decode(encodedString);
  if (decoded?.length < 1) return [];
  const path: IPoint[] = [];
  decoded.forEach((p) =>
    path.push({
      lat: p[0],
      lng: p[1],
    }),
  );

  return path;
};

export const getEncodedPolylineCenter = (
  encodedString: string | undefined,
): LatLng => {
  if (!encodedString) return new LatLng(0, 0);
  const points = decodePolyline(encodedString);
  const poly = new Polyline(points);
  return poly.getCenter();
};

export const getPointArrayBounds = (points: IPoint[]) => {
  const poly = new Polyline(points);
  return poly.getBounds();
};

export const getEncodedPolylineBounds = (encodedString: string | undefined) => {
  const points = decodePolyline(encodedString);
  const bounds = getPointArrayBounds(points);
  return bounds.getCenter();
};

export const createGoogleBounds = (
  path: IPoint[],
): google.maps.LatLngBounds => {
  const bounds = new window.google.maps.LatLngBounds();
  path.map((p: IPoint) => bounds.extend(p));
  return bounds;
};
