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
import { createRef, useCallback, useEffect, useMemo } from 'react';

interface StravaMapProps {
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
  withGoogleMap(({ activity }: StravaMapProps) => {
    const mapRef = createRef<GoogleMap>();
    const center = {
      lat: activity.start_latitude,
      lng: activity.start_longitude,
    };

    const path = useMemo(
      () =>
        activity.map.summary_polyline
          ? createPath(polyline.decode(activity.map.summary_polyline))
          : [],
      [activity],
    );

    const onMapMounted = useCallback(
      (map: GoogleMap) => {
        map.fitBounds(createBounds(path));
      },
      [path],
    );

    useEffect(() => {
      if (mapRef?.current) {
        onMapMounted(mapRef.current);
      }
    }, [mapRef, onMapMounted]);

    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={center}
        defaultOptions={mapOptions}
        ref={mapRef}
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
