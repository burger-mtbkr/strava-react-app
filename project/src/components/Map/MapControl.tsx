import { MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { IStravaActivity } from 'src/models';
import LayerControl from './LayerControl';

// const mapOptions: MapOptions = {
//   disableDefaultUI: true,
//   zoomControl: true,
//   mapTypeControl: true,
//   scaleControl: false,
//   streetViewControl: false,
//   rotateControl: false,
//   fullscreenControl: true,
// };

const MapControl = (activity: IStravaActivity) => {
  const zoom = 13;

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        height: 'calc(100% - 64px)',
        width: '100%', // isOpen ? 'calc(100% - 300px)' : ,
      }}
    >
      <MapContainer
        center={[-37.185276, 174.919205]}
        zoom={zoom}
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
        }}
        scrollWheelZoom
        trackResize
      >
        <LayerControl {...activity} />
      </MapContainer>
    </div>
  );
};

export default MapControl;
