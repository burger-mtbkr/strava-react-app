/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const StravaConnectPrompt = (): JSX.Element => (
  <Typography variant="subtitle1">
    Please connect Strava under
    <Link to="/userSettings">User settings</Link>
    to view Strava Info
  </Typography>
);

export default StravaConnectPrompt;
