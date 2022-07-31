import { LayersControl, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { SummaryActivity, PolyLineOptions, ActivityDetail } from 'src/models';
import { decodePolyline } from 'src/utils';

const polyLineOptions: PolyLineOptions = {
  geodesic: true,
  strokeColor: '#da440b',
  strokeOpacity: 1.0,
  strokeWeight: 3,
};

const ActivityLayer = (activity: SummaryActivity | ActivityDetail) => {
  const { id, map, name } = activity;
  const path = decodePolyline(map.summary_polyline);

  return (
    <LayersControl.Overlay checked name={name}>
      <Polyline key={id} color={polyLineOptions.strokeColor} positions={path} />
    </LayersControl.Overlay>
  );
};

export default ActivityLayer;
