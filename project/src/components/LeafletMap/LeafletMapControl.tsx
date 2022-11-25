/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { ActivityDetail, SummaryActivity } from 'src/models';

import { getEncodedPolylineCenter } from 'src/utils';
import LayerControl from './LayerControl';
import LoadingSkeleton from '../Common/Skeleton';

interface IMapProps {
  activity: SummaryActivity | ActivityDetail;
  style: React.CSSProperties | undefined;
}

const LeafletMapControl = ({ activity, style }: IMapProps) => {
  const { map } = activity;
  const { polyline, summary_polyline } = map;

  const center = getEncodedPolylineCenter(polyline ?? summary_polyline);

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  return center ? (
    <div style={style}>
      <MapContainer
        center={center}
        id="ActivityMap"
        placeholder={<LoadingSkeleton />}
        style={style}
        zoom={12}
        scrollWheelZoom
        trackResize
      >
        <LayerControl {...activity} />
      </MapContainer>
    </div>
  ) : null;
};

export default LeafletMapControl;
