import { rootInitialState, TStoreState } from 'src/reducers';
import {
  getDeleteModalOpen,
  getDeleteProductResponse,
  getEditProduct,
  getProductSaveResponse,
  getSelectedProducts,
  selectAllProducts,
  selectIsSaving,
} from './product.selector';

const product = {
  id: '1111',
  name: 'name',
  category: 'category',
  price: 100,
};

const allProducts = [
  product,
  {
    id: '2222',
    name: 'name 1',
    category: 'category 1',
    price: 100,
  },
  {
    id: '3333',
    name: 'name 2',
    category: 'category 2',
    price: 100,
  },
];

const deleteProductResponse = {
  id: '3333',
  error: new Error('its failed'),
  isSuccessful: false,
};

const productSaveResponse = {
  product,
  error: undefined,
  isSuccessful: true,
};

const state: TStoreState = {
  ...rootInitialState,
  app: {
    title: 'Hello world',
  },
  product: {
    deleteModalOpen: true,
    isSaving: true,
    isDeleting: true,
    productListResponse: {
      products: allProducts,
      error: undefined,
      isSuccessful: true,
    },
    selectedProducts: [product],
    productSaveResponse,
    deleteProductResponse,
  },
};

describe(`[selectors] Product`, () => {
  // test(`${getProductsLoadingState.name} should return the loading state`, () => {
  //   expect(getProductsLoadingState(state)).toEqual(true);
  // });

  test(`${selectAllProducts.name} should return the fetched products state`, () => {
    expect(selectAllProducts(state)).toEqual(allProducts);
  });

  test(`${getEditProduct.name} should return the first selected product for edit products state`, () => {
    expect(getEditProduct(state)).toEqual(product);
  });

  test(`${getSelectedProducts.name} should return the selected products state`, () => {
    expect(getSelectedProducts(state)).toEqual([product]);
  });

  test(`${selectIsSaving.name} should return the is saving state`, () => {
    expect(selectIsSaving(state)).toEqual(true);
  });

  test(`${getProductSaveResponse.name} should return save response state`, () => {
    expect(getProductSaveResponse(state)).toEqual(productSaveResponse);
  });

  test(`${getDeleteModalOpen.name} should return delete modal open state`, () => {
    expect(getDeleteModalOpen(state)).toEqual(true);
  });

  test(`${getDeleteProductResponse.name} should return delete modal open state`, () => {
    expect(getDeleteProductResponse(state)).toEqual(deleteProductResponse);
  });
});
