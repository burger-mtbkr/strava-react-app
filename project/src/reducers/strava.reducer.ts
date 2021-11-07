import { authenticateStrava } from 'src/api';
import { createReducer } from '@reduxjs/toolkit';
import {
  fetchAllProductsDoneAction,
  fetchStravaActivities,
  isDeletingAction,
  isLoadingAction,
  isSavingAction,
  setDeleteModalOpenAction,
  setDeleteProductDoneAction,
  setSaveProductDoneAction,
  setSelectedProductsAction,
} from 'src/actions';
import { IStravaState } from 'src/models/strava.model';

export const productInitialState: IStravaState = {
  isLoading: false,
  athlete: undefined,
  athleteStats: undefined,
  activities: [],
  stravaSession: undefined,
};

export default createReducer(productInitialState, (builder) =>
  builder
    .addCase(isLoadingAction, (state, { payload }) => ({
      ...state,
      isLoading: payload,
    }))
    .addCase(fetchStravaActivities, (state, { payload }) => ({
      ...state,
      activitiesResponse: payload,
    }))
    .addCase(authenticateStrava, (state, { payload }) => ({
      ...state,
      auth: payload,
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
