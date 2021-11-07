import { StateFromReducersMapObject } from '@reduxjs/toolkit';
import product, { productInitialState } from './product.reducer';
import app, { appInitialState } from './app.reducer';

export const reducer = {
  product,
  app,
};

export type TAppState = StateFromReducersMapObject<typeof reducer>;
export type TStoreState = TAppState;

export const rootInitialState: TStoreState = {
  app: appInitialState,
  product: productInitialState,
};
