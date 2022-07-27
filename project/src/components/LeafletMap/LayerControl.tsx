import { LayersControl } from 'react-leaflet';

import { IStravaActivity } from 'src/models';
import BaseLayer from './Layers/BaseLayer';
import ActivityLayer from './Layers/ActivityLayer';

const LayerControl = (activity: IStravaActivity) => (
  <LayersControl position="topright">
    <BaseLayer />
    <ActivityLayer {...activity} />
  </LayersControl>
);

export default LayerControl;
