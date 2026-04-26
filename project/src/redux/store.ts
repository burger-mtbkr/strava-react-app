/* eslint-disable import/no-unresolved */
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { reducer } from 'src/reducers';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux';
import rootSaga from 'src/sagas/root.saga';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistReducer(
    {
      key: 'rootState',
      storage,
    },
    combineReducers({
      ...reducer,
    }),
  ),
  devTools:
    (typeof process !== 'undefined' ? process.env.NODE_ENV : 'development') !==
    'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .prepend(sagaMiddleware)
      .concat(logger),
});

sagaMiddleware.run(rootSaga);

/** Single instance — do not call `persistStore` inside render (Strict Mode breaks otherwise). */
export const persistor = persistStore(store);
