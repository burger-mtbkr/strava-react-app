import axios from 'axios';
import { IFetchProductResponse, ProductListItem } from 'src/models';
import { isSuccessfulResponse, axiosApi } from 'src/utils';

export const getAllProducts = async (): Promise<IFetchProductResponse> => {
  const url = process.env.REACT_APP_API_END_POINT ?? '';

  try {
    const response = await axiosApi.get(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (isSuccessfulResponse(response)) {
      return {
        products: response.data as ProductListItem[],
        isSuccessful: true,
      };
    }
    return {
      isSuccessful: false,
      error: new Error('An error has occured'),
    };
  } catch (error) {
    return {
      isSuccessful: false,
      error: axios.isAxiosError(error)
        ? error
        : new Error('An error has occured'),
    };
  }
};
