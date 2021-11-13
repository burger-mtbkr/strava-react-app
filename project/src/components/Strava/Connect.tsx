/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBikeSharp';
import { useQuery } from 'src/hooks';
import { Button } from '@mui/material';
import { deleteItem } from 'src/utils';
import { useDispatch, useSelector } from 'react-redux';
import { getStravaAuthenticateResponse } from 'src/selectors';
import { authenticateWithStravaAction } from 'src/actions';

const stravaAuth = `https://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_STRAVA_CALLBACK_URL}&approval_prompt=force&scope=activity:read_all`;

const Connect = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = useQuery(location);
  const [authorized, setAuthorized] = useState(false);

  const authResponse = useSelector(getStravaAuthenticateResponse);

  const connect = () => {
    const error = query.get('error');
    if (!error) {
      const code = query.get('code');
      dispatch(authenticateWithStravaAction(code || undefined));
    }
  };

  const disConnect = () => {
    deleteItem('strava_session');
    deleteItem('strava_athlete');
    setAuthorized(false);
  };

  useEffect(() => {
    if (authResponse?.isSuccessful && authResponse.stravaSession) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, [authResponse]);

  useEffect(() => {
    connect();
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

export default Connect;
