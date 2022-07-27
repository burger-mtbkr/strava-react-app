import { LayersControl, TileLayer } from 'react-leaflet';

const BaseLayer = () => (
  <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  </LayersControl.BaseLayer>
);

export default BaseLayer;
