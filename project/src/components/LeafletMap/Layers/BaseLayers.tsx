/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { LayersControl, TileLayer } from 'react-leaflet';

const baseMapData = [
  {
    name: 'Standard',
    attribution:
      '&copy; <a href="https://www.naturalearthdata.com/">Natural Earth Data</a> contributors',
    url: `https://a.tiles.mapbox.com/styles/v1/strava/cl004oy02000014nq9wu7ftaw/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_STRAVA_BASE_MAP_TOKEN}`,
    checked: true,
  },
  {
    name: 'Open Street Map',
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
    checked: false,
  },
];

const BaseLayers = () => (
  <>
    {baseMapData.map((b, i) => (
      <LayersControl.BaseLayer checked={b.checked} name={b.name} key={i}>
        <TileLayer attribution={b.attribution} url={b.url} />
      </LayersControl.BaseLayer>
    ))}
  </>
);

export default BaseLayers;
