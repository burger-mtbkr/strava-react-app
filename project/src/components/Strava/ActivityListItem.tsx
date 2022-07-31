/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { ListItem, Grid, Divider } from '@mui/material';
import { SummaryActivity } from 'src/models';
import { TestIds } from 'src/test/utils';
import MapControl from '../LeafletMap/LeafletMapControl';
import ActivityListItemStats from './ActivityListItemStats';

const ActivityListItem = (activity: SummaryActivity) => {
  const { id } = activity;
  return (
    <>
      <ListItem data-testid={TestIds.activityItemComponent(id)}>
        <Grid container padding={1}>
          <ActivityListItemStats {...activity} />
          <MapControl
            activity={activity}
            style={{ height: '250px', width: '100%' }}
            zoom={12}
          />
        </Grid>
      </ListItem>
      <Divider />
    </>
  );
};

export default ActivityListItem;
