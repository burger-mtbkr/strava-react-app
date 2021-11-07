import { IFetchProductResponse } from 'src/models';
import MockAdapter from 'axios-mock-adapter';
import { axiosApi } from 'src/utils';
import { getAllProducts } from 'src/api';

describe(`[api] ${getAllProducts.name}`, () => {
  const mock: MockAdapter = new MockAdapter(axiosApi);
  const url = process.env.REACT_APP_API_END_POINT ?? '';

  describe('When the API call is successful', () => {
    const mockProducts: IFetchProductResponse = {
      isSuccessful: true,
      products: [
        {
          category: 'bike',
          id: '12345',
          name: 'bob',
          price: 100,
        },
      ],
    };

    it('returns a successful empty response', async () => {
      mock.onGet(`${url}`).reply(200, mockProducts);

      await getAllProducts().then((res: IFetchProductResponse) => {
        expect(res.isSuccessful).toBe(true);
        expect(res.error).toBeUndefined();
        expect(res.products).toBeDefined();
      });
    });
  });

  describe('When the API call is fails', () => {
    it('returns a failed response', async () => {
      mock.onGet(`${url}`).reply(404);

      await getAllProducts().then((res: IFetchProductResponse) => {
        expect(res.isSuccessful).toBe(false);
        expect(res.error).toBeDefined();
        expect(res.products).toBeUndefined();
      });
    });
  });
});
