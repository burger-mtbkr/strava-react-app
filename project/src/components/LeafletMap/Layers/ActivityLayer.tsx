import { LayersControl, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMemo } from 'react';

import { IStravaActivity, PolyLineOptions } from 'src/models';
import { decodePolyline } from 'src/utils';

const polyLineOptions: PolyLineOptions = {
  geodesic: true,
  strokeColor: '#da440b',
  strokeOpacity: 1.0,
  strokeWeight: 3,
};

const ActivityLayer = (activity: IStravaActivity) => {
  const { id, map } = activity;

  const path = useMemo(
    () => (map.summary_polyline ? decodePolyline(map.summary_polyline) : []),
    [map.summary_polyline],
  );

  return (
    <LayersControl.Overlay checked name="Your location">
      <Polyline key={id} color={polyLineOptions.strokeColor} positions={path} />
    </LayersControl.Overlay>
  );
};

export default ActivityLayer;
