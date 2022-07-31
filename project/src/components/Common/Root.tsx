/* eslint-disable import/no-unresolved */
import { createTheme, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { StrictMode } from 'react';
import { store } from '../../redux/store';

import App from '../../App';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const persistor = persistStore(store);

const Root = () => (
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={darkTheme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);

export default Root;
