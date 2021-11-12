import { IFetchProductResponse } from 'src/models/';
import { createAction } from '@reduxjs/toolkit';

const PRODUCT_PREFIX = 'PRODUCT';

/* LOAD ALL PRODUCTS */
export const fetchAllProductsAction = createAction(
  `${PRODUCT_PREFIX}/API/FETCH_ALL_PRODUCTS`,
);

export const fetchAllProductsDoneAction = createAction<IFetchProductResponse>(
  `${PRODUCT_PREFIX}/API/FETCH_ALL_PRODUCTS_DONE`,
);
