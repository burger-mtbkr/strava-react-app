import type { ReactNode } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import TerrainOutlinedIcon from '@mui/icons-material/TerrainOutlined';
import { Avatar, Box, Grid, Link, Typography } from '@mui/material';
import moment from 'moment';
import { toHmsString, roundNumber } from 'src/utils';
import { SummaryActivity, StravaAthlete } from 'src/models';

import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAthlete } from 'src/selectors';

type StatProps = { label: string; value: string; icon: ReactNode };

const StatCell = ({ label, value, icon }: StatProps) => (
  <Box
    sx={{
      display: 'flex',
      gap: 1.25,
      alignItems: 'flex-start',
      py: 1.25,
      px: 1.5,
      borderRadius: 1.5,
      bgcolor: 'grey.50',
      border: '1px solid',
      borderColor: 'divider',
      height: '100%',
    }}
  >
    <Box sx={{ color: 'primary.main', mt: 0.15, flexShrink: 0 }}>{icon}</Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          display: 'block',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontWeight: 600,
          fontSize: '0.65rem',
          lineHeight: 1.3,
        }}
      >
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1.35 }}>
        {value}
      </Typography>
    </Box>
  </Box>
);

const ActivityListItemStats = (activity: SummaryActivity) => {
  const athlete: StravaAthlete | undefined = useSelector(getAthlete);
  const {
    id,
    start_date,
    name,
    distance,
    moving_time,
    max_heartrate,
    average_heartrate,
    kilojoules,
    total_elevation_gain,
  } = activity;

  const dateLabel = (() => {
    if (!start_date) return '';
    const m = moment(start_date).local();
    return m.isValid() ? m.format('ddd D MMM YYYY · HH:mm') : '';
  })();

  const formatHr = (v: number | undefined) =>
    v != null && !Number.isNaN(v) ? `${roundNumber(v, 1)} bpm` : '—';

  return (
    <Box>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item>
          <Avatar
            src={athlete?.profile_medium}
            alt=""
            variant="rounded"
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
          />
        </Grid>
        <Grid item xs>
          <Link
            component={RouterLink}
            to={`/activity/${id}`}
            underline="hover"
            color="text.primary"
            sx={{
              fontWeight: 700,
              fontSize: '1.125rem',
              lineHeight: 1.3,
              display: 'inline-block',
            }}
          >
            {name}
          </Link>
          {dateLabel ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5, display: 'block' }}
            >
              {dateLabel}
            </Typography>
          ) : null}
        </Grid>
      </Grid>
      <Grid container spacing={1.5}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCell
            label="Distance"
            value={`${roundNumber(distance / 1000, 2)} km`}
            icon={<StraightenOutlinedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCell
            label="Moving time"
            value={toHmsString(moving_time)}
            icon={<TimerOutlinedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCell
            label="Calories"
            value={
              kilojoules != null ? `${roundNumber(kilojoules, 1)} kJ` : '—'
            }
            icon={<LocalFireDepartmentOutlinedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCell
            label="Avg heart rate"
            value={formatHr(average_heartrate)}
            icon={<FavoriteBorderOutlinedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCell
            label="Max heart rate"
            value={formatHr(max_heartrate)}
            icon={<TrendingUpOutlinedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCell
            label="Elevation"
            value={
              total_elevation_gain != null
                ? `${roundNumber(total_elevation_gain, 0)} m`
                : '—'
            }
            icon={<TerrainOutlinedIcon sx={{ fontSize: 20 }} />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ActivityListItemStats;
