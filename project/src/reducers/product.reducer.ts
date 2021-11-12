import { createReducer } from '@reduxjs/toolkit';
import {
  fetchAllProductsDoneAction,
  isDeletingAction,
  isSavingAction,
  setDeleteModalOpenAction,
  setDeleteProductDoneAction,
  setSaveProductDoneAction,
  setSelectedProductsAction,
} from 'src/actions';
import { IProductState } from 'src/models/product.model';

export const productInitialState: IProductState = {
  deleteModalOpen: false,
  isSaving: false,
  isDeleting: false,
  selectedProducts: [],
};

export default createReducer(productInitialState, (builder) =>
  builder
    .addCase(isSavingAction, (state, { payload }) => ({
      ...state,
      isSaving: payload,
    }))
    .addCase(isDeletingAction, (state, { payload }) => ({
      ...state,
      isDeleting: payload,
    }))
    .addCase(setDeleteModalOpenAction, (state, { payload }) => ({
      ...state,
      deleteModalOpen: payload,
    }))
    .addCase(setSelectedProductsAction, (state, { payload }) => ({
      actionTriggerRefetching: undefined,
      ...state,
      selectedProducts: payload,
    }))
    .addCase(fetchAllProductsDoneAction, (state, { payload }) => ({
      ...state,
      productListResponse: payload,
    }))
    .addCase(setSaveProductDoneAction, (state, { payload }) => ({
      ...state,
      productSaveResponse: payload,
    }))
    .addCase(setDeleteProductDoneAction, (state, { payload }) => ({
      ...state,
      deleteProductResponse: payload,
    })),
);
