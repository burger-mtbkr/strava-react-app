import { LayersControl } from 'react-leaflet';

import { IStravaActivity } from 'src/models';
import ActivityLayer from './Layers/ActivityLayer';
import BaseLayers from './Layers/BaseLayers';

const LayerControl = (activity: IStravaActivity) => (
  <LayersControl position="topright">
    <BaseLayers />
    <ActivityLayer {...activity} />
  </LayersControl>
);

export default LayerControl;
