import axios from 'axios';

/** Persisted for one authorize → callback round trip (CSRF / session fixation). */
export const STRAVA_OAUTH_STATE_STORAGE_KEY = 'strava_oauth_state';

/** Avoids dispatching two token exchanges for the same code (e.g. React StrictMode). */
export const stravaOAuthCodeDispatchKey = (code: string): string =>
  `strava_oauth_code_dispatched:${code}`;

export const generateOAuthState = (): string => {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
};

export const buildStravaAuthorizeUrl = (): string => {
  const clientId = import.meta.env.VITE_STRAVA_CLIENT_ID ?? '';
  const redirectUri = import.meta.env.VITE_STRAVA_CALLBACK_URL ?? '';
  const state = generateOAuthState();
  sessionStorage.setItem(STRAVA_OAUTH_STATE_STORAGE_KEY, state);

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: 'activity:read_all',
    state,
  });

  return `https://www.strava.com/oauth/authorize?${params.toString()}`;
};

export const stravaOAuthErrorUserMessage = (
  errorCode: string,
  description: string | null,
): string => {
  const decoded = description?.replace(/\+/g, ' ').trim();
  if (decoded) return decoded;

  switch (errorCode) {
    case 'access_denied':
      return 'You canceled Strava sign-in. Connect again whenever you want to continue.';
    case 'invalid_request':
      return 'Strava could not start sign-in. Check that this app’s callback URL matches your Strava API settings.';
    case 'invalid_scope':
      return 'Strava rejected the requested permissions. The app may need updated API settings.';
    default:
      return 'Strava sign-in did not complete. Please try again.';
  }
};

export const stravaApiErrorUserMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string } | undefined;
    const msg = data?.message;
    if (typeof msg === 'string' && msg.length > 0) return msg;

    const status = error.response?.status;
    if (status === 400 || status === 401) {
      return 'Strava rejected the sign-in. Try connecting again from the button below.';
    }
    if (status === 429) {
      return 'Strava is rate-limiting requests. Wait a minute and try again.';
    }
  }

  return 'Could not reach Strava. Check your connection and try again.';
};
