import { IProductResponse } from 'src/models';
import { TStoreState } from 'src/reducers';

export const getProductSaveResponse = (
  state: TStoreState,
): IProductResponse | undefined => state.product.productSaveResponse;
