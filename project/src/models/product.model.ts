import { AxiosError } from 'axios';
import * as yup from 'yup';
import { SchemaOf } from 'yup';

export type Product = {
  id?: string;
  name: string;
  category: string;
  price: number;
};

export type ProductListItem = Product & {
  id: string;
};

export interface IFetchProductResponse {
  products?: ProductListItem[];
  error?: AxiosError | Error;
  isSuccessful?: boolean;
}

export interface IProductResponse {
  product: Product | undefined;
  error?: AxiosError | Error;
  isSuccessful?: boolean;
}

export interface IDeleteProductResponse {
  id: string;
  error?: AxiosError | Error;
  isSuccessful?: boolean;
}

export interface IProductState {
  deleteModalOpen: boolean;
  isLoading: boolean;
  isSaving: boolean;
  isDeleting: boolean;
  productListResponse?: IFetchProductResponse;
  selectedProducts: ProductListItem[];
  productSaveResponse?: IProductResponse;
  deleteProductResponse?: IDeleteProductResponse;
}

export const productSchema: SchemaOf<Product> = yup
  .object()
  .shape({
    id: yup.string().notRequired().nullable(),
    name: yup.string().required('Name is required'),
    category: yup.string().required('Category is required'),
    price: yup
      .number()
      .typeError('Price is required')
      .min(0, 'Price must be greater than 0')
      .required('Price is required'),
  })
  .required();
