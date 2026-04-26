import { Box, Card, CardContent } from '@mui/material';
import { SummaryActivity } from 'src/models';
import { TestIds } from 'src/test/utils';
import MapControl from '../LeafletMap/LeafletMapControl';
import ActivityListItemStats from './ActivityListItemStats';

const ActivityListItem = (activity: SummaryActivity) => {
  const { id } = activity;
  return (
    <Card
      data-testid={TestIds.activityItemComponent(id)}
      elevation={0}
      sx={{
        mb: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)',
        overflow: 'hidden',
        '&:last-of-type': { mb: 0 },
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 2.5 }, '&:last-child': { pb: 2 } }}>
        <ActivityListItemStats {...activity} />
        <Box
          sx={{
            mt: 2,
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
            '& .leaflet-container': { borderRadius: 2 },
          }}
        >
          <MapControl
            activity={activity}
            style={{ height: '250px', width: '100%' }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActivityListItem;
