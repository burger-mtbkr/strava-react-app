import { StateFromReducersMapObject } from '@reduxjs/toolkit';
import product, { productInitialState } from './product.reducer';
import strava, { stravaInitialState } from './strava.reducer';
import app, { appInitialState } from './app.reducer';

export const reducer = {
  app,
  product,
  strava,
};

export type TAppState = StateFromReducersMapObject<typeof reducer>;
export type TStoreState = TAppState;

export const rootInitialState: TStoreState = {
  app: appInitialState,
  product: productInitialState,
  strava: stravaInitialState,
};
