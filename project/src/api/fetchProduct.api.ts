import axios from 'axios';
import { IProductResponse, Product } from 'src/models';
import { isSuccessfulResponse, axiosApi } from 'src/utils';

export const getProduct = async (id: string): Promise<IProductResponse> => {
  const url = process.env.REACT_APP_API_END_POINT ?? '';

  try {
    const response = await axiosApi.get(`${url}/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (isSuccessfulResponse(response)) {
      return {
        product: response.data as Product,
        isSuccessful: true,
      };
    }
    return {
      product: undefined,
      isSuccessful: false,
      error: new Error('An error has occured'),
    };
  } catch (error) {
    return {
      product: undefined,
      isSuccessful: false,
      error: axios.isAxiosError(error)
        ? error
        : new Error('An error has occured'),
    };
  }
};
