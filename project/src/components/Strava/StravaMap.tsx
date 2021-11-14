/* eslint-disable no-undef */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-for-in-array */
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
  Polyline,
} from 'react-google-maps';

import { IStravaActivity } from 'src/models';
import polyline from '@mapbox/polyline';

interface StravaMapProps {
  zoom: number;
  activity: IStravaActivity;
}

const polyLineOptions = {
  geodesic: true,
  strokeColor: '#da440b',
  strokeOpacity: 1.0,
  strokeWeight: 3,
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
};

interface IPoint {
  lat: number;
  lng: number;
}

const createPath = (decoded: [number, number][]): IPoint[] => {
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

const StravaMap = withScriptjs(
  withGoogleMap(({ zoom, activity }: StravaMapProps) => {
    const center = {
      lat: activity.start_latitude,
      lng: activity.start_longitude,
    };

    const decodedPath = activity.map.summary_polyline
      ? polyline.decode(activity.map.summary_polyline)
      : [];

    const path = createPath(decodedPath);

    return (
      <GoogleMap
        defaultZoom={zoom}
        defaultCenter={center}
        defaultOptions={mapOptions}
      >
        <Marker position={center} />
        {path.length > 0 && (
          <Polyline options={polyLineOptions} path={path} visible />
        )}
      </GoogleMap>
    );
  }),
);

export default StravaMap;
