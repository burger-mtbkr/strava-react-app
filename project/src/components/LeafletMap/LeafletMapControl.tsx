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
  zoom: number;
}

const LeafletMapControl = ({ activity, style, zoom }: IMapProps) => {
  const { map } = activity;
  const center = getEncodedPolylineCenter(map.summary_polyline);

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <div style={style}>
      <MapContainer
        center={center}
        id="ActivityMap"
        placeholder={<LoadingSkeleton />}
        style={style}
        zoom={zoom}
        scrollWheelZoom
        trackResize
      >
        <LayerControl {...activity} />
      </MapContainer>
    </div>
  );
};

export default LeafletMapControl;
