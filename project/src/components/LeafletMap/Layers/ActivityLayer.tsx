import { LayersControl, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { SummaryActivity, PolyLineOptions, ActivityDetail } from 'src/models';
import {
  decodePolyline,
  getEncodedPolylineCenter,
  getPointArrayBounds,
} from 'src/utils';
import { useEffect } from 'react';

const polyLineOptions: PolyLineOptions = {
  geodesic: true,
  strokeColor: '#da440b',
  strokeOpacity: 1.0,
  strokeWeight: 3,
};

const ActivityLayer = (activity: SummaryActivity | ActivityDetail) => {
  const leafletMap = useMap();
  const { id, map, name } = activity;
  const encodedRoute = map.polyline ?? map.summary_polyline;
  const center = getEncodedPolylineCenter(encodedRoute);
  const path = decodePolyline(encodedRoute);
  const bounds = getPointArrayBounds(path);
  const zoom = leafletMap.getBoundsZoom(bounds);

  useEffect(() => {
    leafletMap.setView(center, zoom);
  }, [bounds, center, leafletMap, zoom]);

  return (
    <LayersControl.Overlay checked name={name}>
      <Polyline key={id} color={polyLineOptions.strokeColor} positions={path} />
    </LayersControl.Overlay>
  );
};

export default ActivityLayer;
