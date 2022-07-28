/* eslint-disable no-undef */
import polyline from '@mapbox/polyline';
import { LatLng, LatLngBounds, LatLngExpression, Polyline } from 'leaflet';
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

export const getPointArrayBounds = (points: IPoint[]): LatLngBounds => {
  const poly = new Polyline(points);
  return poly.getBounds();
};

export const getEncodedPolylineBounds = (
  encodedString: string | undefined,
): LatLngBounds => {
  const points = decodePolyline(encodedString);
  return getPointArrayBounds(points);
};

export const getEncodedPolylineCenter = (
  encodedString: string | undefined,
): LatLngExpression =>
  getEncodedPolylineBounds(encodedString).getCenter() as LatLngExpression;

export const createGoogleBounds = (
  path: IPoint[],
): google.maps.LatLngBounds => {
  const bounds = new window.google.maps.LatLngBounds();
  path.map((p: IPoint) => bounds.extend(p));
  return bounds;
};
