import { Box, Divider, Stack, Typography } from '@mui/material';
import { IStatTotals } from 'src/models';
import { toHmsString, roundNumber } from 'src/utils';

type RowProps = { label: string; value: string };

const StatRow = ({ label, value }: RowProps) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 2,
      py: 1.25,
    }}
  >
    <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0 }}>
      {label}
    </Typography>
    <Typography
      variant="body1"
      sx={{ fontWeight: 600, textAlign: 'right', wordBreak: 'break-word' }}
    >
      {value}
    </Typography>
  </Box>
);

const Stats = ({
  distance,
  moving_time,
  elevation_gain,
  count,
  achievement_count,
}: IStatTotals): JSX.Element => {
  const rows: RowProps[] = [
    {
      label: 'Total distance',
      value: `${roundNumber(distance / 1000, 2)} km`,
    },
    {
      label: 'Moving time',
      value: toHmsString(moving_time),
    },
    {
      label: 'Elevation gain',
      value: `${roundNumber(elevation_gain, 2)} m`,
    },
    {
      label: 'Activities',
      value: `${roundNumber(count, 0)}`,
    },
  ];

  if (achievement_count) {
    rows.push({
      label: 'Achievements',
      value: String(achievement_count),
    });
  }

  return (
    <Stack
      spacing={0}
      divider={<Divider flexItem sx={{ borderColor: 'divider' }} />}
      sx={{ mb: 2, '&:last-of-type': { mb: 0 } }}
    >
      {rows.map(({ label, value }) => (
        <StatRow key={label} label={label} value={value} />
      ))}
    </Stack>
  );
};

export default Stats;
