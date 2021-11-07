/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBikeSharp';
import { useQuery } from 'src/hooks';
import { Button } from '@mui/material';
import { deleteItem, getString } from 'src/utils';
import { authenticateStrava } from 'src/api';

const stravaAuth = `https://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_STRAVA_CALLBACK_URL}&approval_prompt=force&scope=activity:read_all`;

const StravaConnect = () => {
  const location = useLocation();
  const history = useHistory();

  const query = useQuery(location);
  const [authorized, setAuthorized] = useState(false);

  const connect = async () => {
    const error = query.get('error');
    if (!error) {
      const code = query.get('code');
      const stravaConnected = await authenticateStrava(code || undefined);
      console.log('stravaConnected', stravaConnected);
      setAuthorized(!!stravaConnected);
      history.replace('/userSettings');
    }
  };

  const disConnect = () => {
    deleteItem('strava_session');
    deleteItem('strava_athlete');
    setAuthorized(false);
  };

  useEffect(() => {
    if (getString('t')) {
      (async function () {
        console.log('userSettingsUrl', location);
        await connect();
      })();
    }
  }, []);

  return !authorized ? (
    <Button
      startIcon={<DirectionsBikeIcon />}
      type="button"
      variant="contained"
      onClick={() => {
        console.log('strava_auth_url', stravaAuth);
        window.open(stravaAuth, '_self');
      }}
    >
      Connect to Strava
    </Button>
  ) : (
    <Button
      startIcon={<DirectionsBikeIcon />}
      type="button"
      variant="contained"
      color="primary"
      onClick={disConnect}
    >
      Disconnect Strava
    </Button>
  );
};

export default StravaConnect;
