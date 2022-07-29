/* eslint-disable @typescript-eslint/restrict-template-expressions */

import DirectionsBikeIcon from '@mui/icons-material/DirectionsBikeSharp';
import { Button } from '@mui/material';

const stravaAuth = `https://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_STRAVA_CALLBACK_URL}&approval_prompt=force&scope=activity:read_all`;

const Connect = () => (
  <Button
    className="connect-button"
    startIcon={<DirectionsBikeIcon />}
    type="button"
    variant="contained"
    onClick={() => {
      window.open(stravaAuth, '_self');
    }}
  >
    Connect to Strava
  </Button>
);

export default Connect;
