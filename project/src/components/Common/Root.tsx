/* eslint-disable import/no-unresolved */
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { StrictMode } from 'react';
import { persistor, store } from '../../redux/store';

import App from '../../App';

const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#fc5200',
    },
    background: {
      default: '#f4f4f6',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#5c5c66',
    },
    divider: 'rgba(15, 23, 42, 0.08)',
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f4f4f6',
        },
      },
    },
  },
});

const persistLoading = (
  <div
    style={{
      padding: 48,
      textAlign: 'center',
      fontFamily: 'system-ui, sans-serif',
    }}
  >
    Loading…
  </div>
);

const Root = () => (
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={persistLoading} persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={appTheme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);

export default Root;
