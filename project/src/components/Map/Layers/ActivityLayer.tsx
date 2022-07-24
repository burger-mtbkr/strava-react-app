import {
  LayersControl,
  Marker,
  Polyline,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo, useState } from 'react';
import { LatLng } from 'leaflet';
import { IStravaActivity, PolyLineOptions } from 'src/models';
import { createPath } from 'src/utils';
import polyline from '@mapbox/polyline';
import DefaultIcon from '../DefaultIcon';

const polyLineOptions: PolyLineOptions = {
  geodesic: true,
  strokeColor: '#da440b',
  strokeOpacity: 1.0,
  strokeWeight: 3,
};

// TODO DRAW POLYLINE: https://react-leaflet.js.org/docs/example-popup-marker/

const ActivityLayer = (activity: IStravaActivity) => {
  const [position, setPosition] = useState<LatLng | undefined>(undefined);
  const { id } = activity;

  const map = useMapEvents({
    locationfound(e: any) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const path = useMemo(
    () =>
      activity.map.summary_polyline
        ? createPath(polyline.decode(activity.map.summary_polyline))
        : [],
    [activity],
  );

  useEffect(() => {
    map.locate();
  }, [map]);

  return (
    <LayersControl.Overlay checked name="Your location">
      {position && (
        <Marker position={position} icon={DefaultIcon} riseOnHover>
          <Popup>{`You are here! (${position.lat}, ${position.lng})`}</Popup>
        </Marker>
      )}
      <Polyline key={id} color={polyLineOptions.strokeColor} positions={path} />
    </LayersControl.Overlay>
  );
};

export default ActivityLayer;
