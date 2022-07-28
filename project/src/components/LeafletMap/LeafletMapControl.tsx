/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { IStravaActivity } from 'src/models';

import { getEncodedPolylineCenter } from 'src/utils';
import LayerControl from './LayerControl';

const LeafletMapControl = (activity: IStravaActivity) => {
  const zoom = 12;
  const { map } = activity;
  const center = getEncodedPolylineCenter(map.summary_polyline);

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{
        height: '250px',
      }}
      scrollWheelZoom
      trackResize
    >
      <LayerControl {...activity} />
    </MapContainer>
  );
};

export default LeafletMapControl;
