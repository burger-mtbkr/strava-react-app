// eslint-disable-next-line no-shadow
export enum FeatureType {
  Polygon,
  Circle,
  Point,
  Polyline,
}

export type PolyLineOptions = {
  geodesic: boolean;
  strokeColor: string;
  strokeOpacity: number;
  strokeWeight: number;
};

export type MapOptions = {
  disableDefaultUI: boolean;
  zoomControl: boolean;
  mapTypeControl: boolean;
  scaleControl: boolean;
  streetViewControl: boolean;
  rotateControl: boolean;
  fullscreenControl: boolean;
};
