/* eslint-disable react-hooks/exhaustive-deps */

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import TerrainOutlinedIcon from '@mui/icons-material/TerrainOutlined';
import { Box, Grid, Typography } from '@mui/material';
import { SummaryActivity } from 'src/models';
import { toHmString, roundNumber } from 'src/utils';

const totalDistance = (activities: Array<SummaryActivity>): number => {
  let totalDist = 0.0;
  for (const a of activities) {
    totalDist += a.distance;
  }
  return roundNumber(totalDist / 1000, 2);
};

const totalElevation = (activities: Array<SummaryActivity>): number => {
  let totalElv = 0.0;
  for (const a of activities) {
    totalElv += a.total_elevation_gain;
  }
  return roundNumber(totalElv, 2);
};

const totalTime = (activities: Array<SummaryActivity>): string => {
  let time = 0;
  for (const a of activities) {
    time += a.moving_time;
  }
  return toHmString(time);
};

type Props = { activities: Array<SummaryActivity> };

const ActivityListTotals = ({ activities }: Props): JSX.Element => {
  const tiles = [
    {
      label: 'Moving time',
      value: totalTime(activities),
      icon: (
        <AccessTimeOutlinedIcon sx={{ fontSize: 22, color: 'primary.main' }} />
      ),
    },
    {
      label: 'Distance',
      value: `${totalDistance(activities)} km`,
      icon: (
        <StraightenOutlinedIcon sx={{ fontSize: 22, color: 'primary.main' }} />
      ),
    },
    {
      label: 'Elevation gain',
      value: `${totalElevation(activities)} m`,
      icon: (
        <TerrainOutlinedIcon sx={{ fontSize: 22, color: 'primary.main' }} />
      ),
    },
  ];

  return (
    <Grid container spacing={2} sx={{ mt: 0.5 }}>
      {tiles.map(({ label, value, icon }) => (
        <Grid item xs={12} sm={4} key={label}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.5,
              p: 2,
              height: '100%',
              borderRadius: 2,
              bgcolor: 'grey.50',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 1.5,
                bgcolor: 'rgba(252, 82, 0, 0.08)',
                flexShrink: 0,
              }}
            >
              {icon}
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: 'block',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: 600,
                  mb: 0.25,
                }}
              >
                {label}
              </Typography>
              <Typography variant="h6" component="p" sx={{ fontWeight: 700 }}>
                {value}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActivityListTotals;
