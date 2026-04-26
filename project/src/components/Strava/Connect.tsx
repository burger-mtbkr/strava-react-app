import type { ReactNode } from 'react';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBikeSharp';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { buildStravaAuthorizeUrl } from 'src/utils/stravaOAuth.util';

export const STRAVA_ORANGE = '#fc5200';

const shellSx = {
  minHeight: 'calc(100vh - 64px - 10px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  px: 2,
  py: { xs: 3, sm: 5 },
  background: 'linear-gradient(165deg, #f4f6f9 0%, #e8ecf2 45%, #eef0f4 100%)',
};

export const SignInShell = ({ children }: { children: ReactNode }) => (
  <Box sx={shellSx}>{children}</Box>
);

type ConnectProps = {
  signInError?: string | null;
  onDismissSignInError?: () => void;
  /** Clears stale errors before sending the user to Strava. */
  onBeforeStravaRedirect?: () => void;
};

const Connect = ({
  signInError = null,
  onDismissSignInError,
  onBeforeStravaRedirect,
}: ConnectProps) => (
  <SignInShell>
    <Paper
      elevation={0}
      sx={{
        maxWidth: 440,
        width: '100%',
        p: { xs: 3, sm: 5 },
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'rgba(0,0,0,0.06)',
        boxShadow: '0 12px 40px rgba(15, 23, 42, 0.08)',
      }}
    >
      <Stack spacing={3} alignItems="center" textAlign="center">
        {signInError ? (
          <Alert
            severity="error"
            variant="outlined"
            onClose={onDismissSignInError}
            role="alert"
            sx={{
              width: '100%',
              textAlign: 'left',
              borderRadius: 2,
            }}
          >
            {signInError}
          </Alert>
        ) : null}
        <Box
          sx={{
            width: 76,
            height: 76,
            borderRadius: 2.5,
            bgcolor: STRAVA_ORANGE,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'common.white',
            boxShadow: '0 8px 24px rgba(252, 82, 0, 0.35)',
          }}
          aria-hidden
        >
          <DirectionsBikeIcon sx={{ fontSize: 42 }} />
        </Box>
        <Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, letterSpacing: '-0.02em', mb: 1 }}
          >
            Sign in with Strava
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.6 }}
          >
            Connect your account to view activities, stats, and maps from your
            Strava data—all in one place.
          </Typography>
        </Box>
        <Button
          fullWidth
          size="large"
          variant="contained"
          startIcon={<DirectionsBikeIcon />}
          type="button"
          onClick={() => {
            onBeforeStravaRedirect?.();
            window.location.assign(buildStravaAuthorizeUrl());
          }}
          sx={{
            bgcolor: STRAVA_ORANGE,
            py: 1.5,
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '1.05rem',
            borderRadius: 2,
            boxShadow: '0 4px 14px rgba(252, 82, 0, 0.4)',
            '&:hover': {
              bgcolor: '#e04a00',
              boxShadow: '0 6px 20px rgba(252, 82, 0, 0.45)',
            },
          }}
        >
          Connect with Strava
        </Button>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ opacity: 0.85 }}
        >
          You will be redirected to Strava to authorize this app. We only
          request access needed to read your activities.
        </Typography>
      </Stack>
    </Paper>
  </SignInShell>
);

export default Connect;
