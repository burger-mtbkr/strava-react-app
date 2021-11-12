import { createReducer } from '@reduxjs/toolkit';
import { fetchAllProductsDoneAction } from 'src/actions';
import { IProductState } from 'src/models/product.model';

export const productInitialState: IProductState = {
  deleteModalOpen: false,
  isSaving: false,
  isDeleting: false,
  selectedProducts: [],
};

export default createReducer(productInitialState, (builder) =>
  builder.addCase(fetchAllProductsDoneAction, (state, { payload }) => ({
    ...state,
    productListResponse: payload,
  })),
);
