import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
  Polyline,
} from 'react-google-maps';

import { IStravaActivity } from 'src/models';
import polyline from '@mapbox/polyline';
import { createBounds, createPath } from 'src/utils';

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

const StravaMap = withScriptjs(
  withGoogleMap(({ zoom, activity }: StravaMapProps) => {
    const center = {
      lat: activity.start_latitude,
      lng: activity.start_longitude,
    };

    const path = activity.map.summary_polyline
      ? createPath(polyline.decode(activity.map.summary_polyline))
      : [];

    //  const bounds = createBounds(path);

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
