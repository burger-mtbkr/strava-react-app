import { LayersControl, TileLayer } from 'react-leaflet';

const thunderforestAttribution =
  '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a> contributors';

/** Tile URL used only as a stand-in when Thunderforest is unavailable (never loads at usable zoom). */
const PLACEHOLDER_TILE_URL =
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

/** Makes Leaflet’s layer control grey out the input (see `Control.Layers._checkDisabledLayers`). */
const UNUSABLE_ZOOM_RANGE = { minZoom: 100, maxZoom: 0 } as const;

const thunderforestApiKey = (
  import.meta.env.VITE_THUNDER_FOREST_API_KEY ?? ''
).trim();
const thunderforestReady = thunderforestApiKey.length > 0;

const thunderforestLayers: { name: string; url: string }[] = [
  {
    name: 'Cycle Map',
    url: `https://b.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=${thunderforestApiKey}`,
  },
  {
    name: 'Landscape',
    url: `https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=${thunderforestApiKey}`,
  },
  {
    name: 'Outdoors',
    url: `https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=${thunderforestApiKey}`,
  },
  {
    name: 'Pioneer',
    url: `https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=${thunderforestApiKey}`,
  },
  {
    name: 'Neighbourhood',
    url: `https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=${thunderforestApiKey}`,
  },
  {
    name: 'Atlas',
    url: `https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${thunderforestApiKey}`,
  },
];

const baseMapData = [
  {
    name: 'Open Street Map',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    checked: true,
  },
  {
    name: 'CyclOSM',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://www.cyclosm.org/">CyclOSM</a>',
    url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
    checked: false,
  },
];

const BaseLayers = () => (
  <>
    {baseMapData.map((b) => (
      <LayersControl.BaseLayer checked={b.checked} name={b.name} key={b.name}>
        <TileLayer attribution={b.attribution} url={b.url} />
      </LayersControl.BaseLayer>
    ))}
    {thunderforestLayers.map((layer) => (
      <LayersControl.BaseLayer
        checked={false}
        name={layer.name}
        key={layer.name}
      >
        <TileLayer
          attribution={thunderforestAttribution}
          url={thunderforestReady ? layer.url : PLACEHOLDER_TILE_URL}
          {...(thunderforestReady ? {} : UNUSABLE_ZOOM_RANGE)}
        />
      </LayersControl.BaseLayer>
    ))}
  </>
);

export default BaseLayers;
