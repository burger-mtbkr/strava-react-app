/* eslint-disable import/no-unresolved */
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { reducer } from 'src/reducers';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux';
import rootSaga from 'src/sagas/root.saga';
import { persistReducer } from 'redux-persist';
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
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(sagaMiddleware).concat(logger),
});

sagaMiddleware.run(rootSaga);
