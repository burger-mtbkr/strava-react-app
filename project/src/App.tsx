import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Connect, { SignInShell } from 'src/components/Strava/Connect';
import {
  getStravaAuthenticateResponse,
  getStravaAuthIsLoading,
} from 'src/selectors';

import {
  authenticateWithStravaAction,
  clearStravaAuthErrorAction,
} from 'src/actions';

import { useQuery } from 'src/hooks';
import {
  STRAVA_OAUTH_STATE_STORAGE_KEY,
  stravaApiErrorUserMessage,
  stravaOAuthCodeDispatchKey,
  stravaOAuthErrorUserMessage,
} from 'src/utils/stravaOAuth.util';
import Routes from './routes/Routes';
import Header from './components/Header/Header';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery(location);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [urlOAuthMessage, setUrlOAuthMessage] = useState<string | null>(null);
  const [stateMismatchMessage, setStateMismatchMessage] = useState<
    string | null
  >(null);
  const isAuthLoading = useSelector(getStravaAuthIsLoading);
  const authResponse = useSelector(getStravaAuthenticateResponse);
  const code = query.get('code');

  const { isSuccessful, stravaSession } =
    authResponse !== undefined
      ? authResponse
      : {
          isSuccessful: false,
          stravaSession: undefined,
        };

  const clearSignInErrors = useCallback(() => {
    setUrlOAuthMessage(null);
    setStateMismatchMessage(null);
    dispatch(clearStravaAuthErrorAction());
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const oauthErr = params.get('error');
    const oauthErrDesc = params.get('error_description');
    const c = params.get('code');
    const stateParam = params.get('state');

    if (oauthErr) {
      setUrlOAuthMessage(stravaOAuthErrorUserMessage(oauthErr, oauthErrDesc));
      navigate({ pathname: '/', search: '' }, { replace: true });
      dispatch(authenticateWithStravaAction(undefined));
      return;
    }

    if (c) {
      const stored = sessionStorage.getItem(STRAVA_OAUTH_STATE_STORAGE_KEY);
      const stateOk =
        Boolean(stateParam) && Boolean(stored) && stateParam === stored;
      const legacyNoState = !stateParam && !stored;

      if (stateOk) {
        sessionStorage.removeItem(STRAVA_OAUTH_STATE_STORAGE_KEY);
        const dedupeKey = stravaOAuthCodeDispatchKey(c);
        if (!sessionStorage.getItem(dedupeKey)) {
          sessionStorage.setItem(dedupeKey, '1');
          dispatch(authenticateWithStravaAction(c));
        }
        return;
      }
      if (legacyNoState) {
        const dedupeKey = stravaOAuthCodeDispatchKey(c);
        if (!sessionStorage.getItem(dedupeKey)) {
          sessionStorage.setItem(dedupeKey, '1');
          dispatch(authenticateWithStravaAction(c));
        }
        return;
      }

      sessionStorage.removeItem(STRAVA_OAUTH_STATE_STORAGE_KEY);
      setStateMismatchMessage(
        'This sign-in link is invalid or expired. Use “Connect with Strava” again.',
      );
      navigate({ pathname: '/', search: '' }, { replace: true });
      return;
    }

    dispatch(authenticateWithStravaAction(undefined));
  }, [location.search, navigate, dispatch]);

  useEffect(() => {
    if (isSuccessful && stravaSession) {
      if (code) {
        navigate('/', { replace: true });
      }
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, [code, isSuccessful, stravaSession, navigate]);

  const reduxSignInError =
    !isAuthLoading &&
    authResponse !== undefined &&
    authResponse.isSuccessful === false
      ? stravaApiErrorUserMessage(authResponse.error)
      : null;

  const signInError =
    stateMismatchMessage || urlOAuthMessage || reduxSignInError;

  const completingOAuth = Boolean(code);

  return (
    <>
      <Header />
      <div className="App">
        {authorized ? (
          <Routes />
        ) : isAuthLoading ? (
          <SignInShell>
            <Paper
              elevation={0}
              sx={{
                maxWidth: 360,
                width: '100%',
                py: 5,
                px: 4,
                textAlign: 'center',
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'rgba(0,0,0,0.06)',
                boxShadow: '0 12px 40px rgba(15, 23, 42, 0.08)',
              }}
              aria-busy="true"
              aria-live="polite"
            >
              <CircularProgress aria-label="Loading session" sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary">
                {completingOAuth
                  ? 'Finishing Strava sign-in…'
                  : 'Checking your Strava session…'}
              </Typography>
            </Paper>
          </SignInShell>
        ) : (
          <Connect
            signInError={signInError}
            onDismissSignInError={clearSignInErrors}
            onBeforeStravaRedirect={clearSignInErrors}
          />
        )}
      </div>
    </>
  );
};

export default App;
