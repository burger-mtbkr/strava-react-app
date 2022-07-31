import { LayersControl } from 'react-leaflet';

import { ActivityDetail, SummaryActivity } from 'src/models';
import ActivityLayer from './Layers/ActivityLayer';
import BaseLayers from './Layers/BaseLayers';

const LayerControl = (activity: SummaryActivity | ActivityDetail) => (
  <LayersControl position="topright">
    <BaseLayers />
    <ActivityLayer {...activity} />
  </LayersControl>
);

export default LayerControl;
