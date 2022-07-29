import { LayersControl, TileLayer } from 'react-leaflet';

const baseMapData = [
  {
    name: 'Standard',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap.Mapnik</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    checked: false,
  },
  {
    name: 'Cycle Map',
    attribution:
      '&copy; <a href="https://b.tile.thunderforest.com">CycleMap.Thunderforest</a> contributors',
    url: 'https://b.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
    checked: true,
  },
];

const BaseLayers = () => (
  <>
    {baseMapData.map((b) => (
      <LayersControl.BaseLayer checked={b.checked} name={b.name}>
        <TileLayer attribution={b.attribution} url={b.url} />
      </LayersControl.BaseLayer>
    ))}
  </>
);

export default BaseLayers;
