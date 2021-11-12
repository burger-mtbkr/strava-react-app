import {
  IFetchProductResponse,
  IDeleteProductResponse,
  IProductResponse,
  ProductListItem,
} from 'src/models';
import {
  isSavingAction,
  isDeletingAction,
  setDeleteModalOpenAction,
  setSelectedProductsAction,
  fetchAllProductsDoneAction,
  setSaveProductDoneAction,
  setDeleteProductDoneAction,
} from 'src/actions';
import reducer, { productInitialState } from 'src/reducers/product.reducer';

describe(`[reducers] product reducer`, () => {
  it(`reduces ${isSavingAction.name} correctly when set to true`, () => {
    const state = reducer(productInitialState, isSavingAction(true));
    expect(state.isSaving).toEqual(true);
  });

  it(`reduces ${isSavingAction.name} correctly when set to false`, () => {
    const state = reducer(productInitialState, isSavingAction(false));
    expect(state.isSaving).toEqual(false);
  });

  it(`reduces ${isDeletingAction.name} correctly when set to true`, () => {
    const state = reducer(productInitialState, isDeletingAction(true));
    expect(state.isDeleting).toEqual(true);
  });

  it(`reduces ${isDeletingAction.name} correctly when set to false`, () => {
    const state = reducer(productInitialState, isDeletingAction(false));
    expect(state.isDeleting).toEqual(false);
  });

  it(`reduces ${setDeleteModalOpenAction.name} correctly when set to true`, () => {
    const state = reducer(productInitialState, setDeleteModalOpenAction(true));
    expect(state.deleteModalOpen).toEqual(true);
  });

  it(`reduces ${setDeleteModalOpenAction.name} correctly when set to false`, () => {
    const state = reducer(productInitialState, setDeleteModalOpenAction(false));
    expect(state.deleteModalOpen).toEqual(false);
  });

  it(`reduces ${setSelectedProductsAction.name} correctly when setting a list of items`, () => {
    const selectedItems = [
      {
        id: '12345',
        name: 'Item 1',
        category: 'Category 1',
        price: 100,
      },
      {
        id: '123456',
        name: 'Item 2',
        category: 'Category 2',
        price: 100,
      },
    ];

    const state = reducer(
      productInitialState,
      setSelectedProductsAction(selectedItems),
    );
    expect(state.selectedProducts).toHaveLength(2);
    expect(state.selectedProducts[0]).toMatchObject(selectedItems[0]);
    expect(state.selectedProducts[1]).toMatchObject(selectedItems[1]);
  });

  it(`reduces ${setSelectedProductsAction.name} correctly when setting a empty list of items`, () => {
    const selectedItems: ProductListItem[] = [];

    const state = reducer(
      productInitialState,
      setSelectedProductsAction(selectedItems),
    );
    expect(state.selectedProducts).toHaveLength(0);
  });

  it(`reduces ${fetchAllProductsDoneAction.name} correctly`, () => {
    const response: IFetchProductResponse = {
      isSuccessful: true,
      products: [
        {
          id: '12345',
          name: 'Item 1',
          category: 'Category 1',
          price: 100,
        },
        {
          id: '123456',
          name: 'Item 2',
          category: 'Category 2',
          price: 100,
        },
      ],
    };

    const state = reducer(
      productInitialState,
      fetchAllProductsDoneAction(response),
    );
    expect(state.productListResponse).toMatchObject(response);
  });

  it(`reduces ${setSaveProductDoneAction.name} correctly`, () => {
    const response: IProductResponse = {
      isSuccessful: true,
      product: {
        id: '12345',
        name: 'Item 1',
        category: 'Category 1',
        price: 100,
      },
    };

    const state = reducer(
      productInitialState,
      setSaveProductDoneAction(response),
    );
    expect(state.productSaveResponse).toMatchObject(response);
  });

  it(`reduces ${setDeleteProductDoneAction.name} correctly`, () => {
    const response: IDeleteProductResponse = {
      isSuccessful: true,
      id: '12345',
    };

    const state = reducer(
      productInitialState,
      setDeleteProductDoneAction(response),
    );
    expect(state.deleteProductResponse).toMatchObject(response);
  });
});
