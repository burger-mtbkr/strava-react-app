import type { ReactNode } from 'react';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import TerrainOutlinedIcon from '@mui/icons-material/TerrainOutlined';
import { Avatar, Box, Divider, Grid, Paper, Typography } from '@mui/material';
import moment from 'moment';
import { toHmsString, roundNumber } from 'src/utils';
import { StravaAthlete, ActivityDetail } from 'src/models';
import { useSelector } from 'react-redux';
import { getAthlete } from 'src/selectors';

type MetricProps = {
  label: string;
  value: string;
  icon: ReactNode;
};

const Metric = ({ label, value, icon }: MetricProps) => (
  <Box
    sx={{
      display: 'flex',
      gap: 1.5,
      alignItems: 'center',
      py: 1.5,
    }}
  >
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: 1.5,
        bgcolor: 'rgba(252, 82, 0, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'primary.main',
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box sx={{ minWidth: 0, flex: 1 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          display: 'block',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          fontWeight: 600,
          fontSize: '0.65rem',
        }}
      >
        {label}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.25 }}>
        {value}
      </Typography>
    </Box>
  </Box>
);

const ActivityDetailStats = (activity: ActivityDetail) => {
  const athlete: StravaAthlete | undefined = useSelector(getAthlete);
  const {
    name,
    start_date,
    distance,
    average_heartrate,
    moving_time,
    max_heartrate,
    total_elevation_gain,
    kilojoules,
  } = activity;

  const dateLabel = (() => {
    if (!start_date) return '';
    const m = moment(start_date).local();
    return m.isValid() ? m.format('HH:mm · dddd, D MMMM YYYY') : '';
  })();

  const hr = (v: number | undefined) =>
    v != null && !Number.isNaN(v) ? `${roundNumber(v, 1)} bpm` : '—';

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)',
        minWidth: { xs: '100%', sm: 320 },
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
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
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.25 }}
          >
            {name}
          </Typography>
          {dateLabel ? (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {dateLabel}
            </Typography>
          ) : null}
        </Box>
      </Box>

      <Divider sx={{ mb: 1 }} />

      <Grid container>
        <Grid item xs={12}>
          <Metric
            label="Distance"
            value={`${roundNumber(distance / 1000, 2)} km`}
            icon={<StraightenOutlinedIcon sx={{ fontSize: 22 }} />}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider component="div" />
          <Metric
            label="Moving time"
            value={toHmsString(moving_time)}
            icon={<TimerOutlinedIcon sx={{ fontSize: 22 }} />}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider component="div" />
          <Metric
            label="Elevation gain"
            value={
              total_elevation_gain != null
                ? `${roundNumber(total_elevation_gain, 0)} m`
                : '—'
            }
            icon={<TerrainOutlinedIcon sx={{ fontSize: 22 }} />}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider component="div" />
          <Metric
            label="Average heart rate"
            value={hr(average_heartrate)}
            icon={<FavoriteBorderOutlinedIcon sx={{ fontSize: 22 }} />}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider component="div" />
          <Metric
            label="Max heart rate"
            value={hr(max_heartrate)}
            icon={<TrendingUpOutlinedIcon sx={{ fontSize: 22 }} />}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider component="div" />
          <Metric
            label="Energy"
            value={
              kilojoules != null ? `${roundNumber(kilojoules, 1)} kJ` : '—'
            }
            icon={<LocalFireDepartmentOutlinedIcon sx={{ fontSize: 22 }} />}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ActivityDetailStats;
