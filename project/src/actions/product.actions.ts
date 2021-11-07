import {
  IFetchProductResponse,
  IProductResponse,
  Product,
  ProductListItem,
  IDeleteProductResponse,
} from 'src/models/';
import { createAction } from '@reduxjs/toolkit';

const PRODUCT_PREFIX = 'PRODUCT';

/* APP STATE */
export const setDeleteModalOpenAction = createAction<boolean>(
  `${PRODUCT_PREFIX}_SET_DELETE_MODAL_OPEN`,
);

export const setSelectedProductsAction = createAction<ProductListItem[]>(
  `${PRODUCT_PREFIX}_SET_SELECTED_PRODUCTS`,
);

export const isLoadingAction = createAction<boolean>(
  `${PRODUCT_PREFIX}/API/PRODUCTS_IS_LOADING`,
);

/* LOAD PRODUCT */
export const fetchProductAction = createAction<string>(
  `${PRODUCT_PREFIX}/API/FETCH_PRODUCT`,
);

export const fetchProductDoneAction = createAction<IProductResponse>(
  `${PRODUCT_PREFIX}/API/FETCH_PRODUCT_DONE`,
);

/* LOAD ALL PRODUCTS */
export const fetchAllProductsAction = createAction(
  `${PRODUCT_PREFIX}/API/FETCH_ALL_PRODUCTS`,
);

export const fetchAllProductsDoneAction = createAction<IFetchProductResponse>(
  `${PRODUCT_PREFIX}/API/FETCH_ALL_PRODUCTS_DONE`,
);

/* SAVE PRODUCT */
export const isSavingAction = createAction<boolean>(
  `${PRODUCT_PREFIX}API/SAVE_PRODUCT_IS_SAVING`,
);

export const saveProductAction = createAction<Product>(
  `${PRODUCT_PREFIX}/API/SAVE_PRODUCT`,
);

export const setSaveProductDoneAction = createAction<IProductResponse>(
  `${PRODUCT_PREFIX}/API/SAVE_PRODUCT_DONE`,
);

/* DELETE PRODUCT */

export const isDeletingAction = createAction<boolean>(
  `${PRODUCT_PREFIX}API/DELETE_PRODUCT_IS_DELETING`,
);

export const deleteProductAction = createAction<string>(
  `${PRODUCT_PREFIX}/API/DELETE_PRODUCT`,
);

export const setDeleteProductDoneAction = createAction<IDeleteProductResponse>(
  `${PRODUCT_PREFIX}/API/DELETE_PRODUCT_DONE`,
);
