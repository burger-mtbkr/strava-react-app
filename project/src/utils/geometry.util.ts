/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-for-in-array */
import { IPoint } from 'src/models';

/* eslint-disable no-bitwise */
export const decode = (encoded: string) => {
  // array that holds the points
  const points = [];
  let index = 0;
  const len = encoded.length;
  let lat = 0;
  let lng = 0;

  while (index < len) {
    let b;
    let shift = 0;
    let result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63; // finds ascii                                                                                    //and substract it by 63
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dLat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lat += dLat;
    shift = 0;
    result = 0;
    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dLng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lng += dLng;

    points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
  }

  debugger;
  return points;
};

export const createPath = (decoded: [number, number][]): IPoint[] => {
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
