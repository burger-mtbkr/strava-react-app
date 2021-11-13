/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import { Typography, List, ListItem } from '@mui/material';
import { IStatTotals } from 'src/models';
import { toHmsString, roundNumber } from 'src/utils';

const Stats = ({
  distance,
  moving_time,
  elevation_gain,
  count,
  achievement_count,
}: IStatTotals): JSX.Element => (
  <List>
    <ListItem>
      <>
        <Typography variant="caption" marginRight={1}>
          Total distance:
        </Typography>
        <Typography variant="body2">
          {roundNumber(distance / 1000, 2)} km
        </Typography>
      </>
    </ListItem>
    <ListItem>
      <>
        <Typography variant="caption" marginRight={1}>
          Moving time:
        </Typography>
        <Typography variant="body2">{toHmsString(moving_time)}</Typography>
      </>
    </ListItem>
    <ListItem>
      <>
        <Typography variant="caption" marginRight={1}>
          Elevation gain:
        </Typography>
        <Typography variant="body2">
          {roundNumber(elevation_gain, 2)} m
        </Typography>
      </>
    </ListItem>
    <ListItem>
      <>
        <Typography variant="caption" marginRight={1}>
          Activity count:
        </Typography>
        <Typography variant="body2">{roundNumber(count, 2)}</Typography>
      </>
    </ListItem>
    {achievement_count ? (
      <ListItem>
        <>
          <Typography variant="caption" marginRight={1}>
            Achievement count:
          </Typography>
          <Typography variant="body2">{achievement_count}</Typography>
        </>
      </ListItem>
    ) : null}
  </List>
);

export default Stats;
