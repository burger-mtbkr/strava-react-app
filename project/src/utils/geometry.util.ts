/* eslint-disable no-undef */
import polyline from '@mapbox/polyline';
import { LatLngBounds, LatLngExpression, Polyline } from 'leaflet';

export const decodePolyline = (
  encodedString: string | undefined,
): LatLngExpression[] => {
  if (!encodedString) return [];
  const decoded = polyline.decode(encodedString);
  return decoded;
};

export const getPointArrayBounds = (
  points: LatLngExpression[],
): LatLngBounds => {
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
): LatLngExpression | undefined => {
  return encodedString
    ? (getEncodedPolylineBounds(encodedString).getCenter() as LatLngExpression)
    : undefined;
};
