/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IProductResponse } from 'src/models';
import MockAdapter from 'axios-mock-adapter';
import { getProduct } from 'src/api';
import { axiosApi } from 'src/utils';

describe(`[api] ${getProduct.name}`, () => {
  const mock: MockAdapter = new MockAdapter(axiosApi);
  const url = process.env.REACT_APP_API_END_POINT ?? '';

  describe('When the API call is successful', () => {
    const id = '12345';
    const mockProducts: IProductResponse = {
      isSuccessful: true,
      product: {
        category: 'bike',
        id: '12345',
        name: 'bob',
        price: 100,
      },
    };

    it('returns a successful empty response', async () => {
      mock.onGet(`${url}/${id}`).reply(200, mockProducts);

      await getProduct(id).then((res: IProductResponse) => {
        expect(res.isSuccessful).toBe(true);
        expect(res.error).toBeUndefined();
        expect(res.product).toBeDefined();
      });
    });
  });

  describe('When the API call is fails', () => {
    const id = '1236';

    it('returns a failed response', async () => {
      mock.onGet(`${url}/`).reply(404);

      await getProduct(id).then((res: IProductResponse) => {
        expect(res.isSuccessful).toBe(false);
        expect(res.error).toBeDefined();
        expect(res.product).toBeUndefined();
      });
    });
  });
});
