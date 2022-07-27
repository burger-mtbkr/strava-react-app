import { MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { IStravaActivity } from 'src/models';
import LayerControl from './LayerControl';

const LeafletMapControl = (activity: IStravaActivity) => {
  const zoom = 13;

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <MapContainer
      center={[-37.185276, 174.919205]}
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
