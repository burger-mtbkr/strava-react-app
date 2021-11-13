import { StateFromReducersMapObject } from '@reduxjs/toolkit';
import strava, { stravaInitialState } from './strava.reducer';
import app, { appInitialState } from './app.reducer';

export const reducer = {
  app,
  strava,
};

export type TAppState = StateFromReducersMapObject<typeof reducer>;
export type TStoreState = TAppState;

export const rootInitialState: TStoreState = {
  app: appInitialState,
  strava: stravaInitialState,
};
