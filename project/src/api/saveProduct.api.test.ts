import { IProductResponse } from 'src/models';
import MockAdapter from 'axios-mock-adapter';
import { saveProduct } from 'src/api';
import { axiosApi } from 'src/utils';

describe(`[api] ${saveProduct.name}`, () => {
  const mock: MockAdapter = new MockAdapter(axiosApi);
  const url = process.env.REACT_APP_API_END_POINT ?? '';

  describe('When saving a new product', () => {
    const newProduct = {
      category: 'bike',
      name: 'bob',
      price: 100,
    };

    const newProductCreated = {
      id: '12345',
      category: 'bike',
      name: 'bob',
      price: 100,
    };
    describe('When the API call is successful', () => {
      it('returns a successful response', async () => {
        mock.onPost(`${url}`).reply(201, newProductCreated);
        await saveProduct(newProduct).then((res: IProductResponse) => {
          expect(res.isSuccessful).toBe(true);
          expect(res.error).toBeUndefined();
          expect(res.product).toBeDefined();
        });
      });
    });

    describe('When the API call fails', () => {
      it('returns a failed response', async () => {
        mock.onPost(`${url}`).reply(500);
        await saveProduct(newProduct).then((res: IProductResponse) => {
          expect(res.isSuccessful).toBe(false);
          expect(res.error).toBeDefined();
          expect(res.product).toMatchObject(newProduct);
        });
      });
    });
  });

  describe('When updating an existing product', () => {
    const product = {
      id: '12345',
      category: 'bike',
      name: 'bob',
      price: 100,
    };

    describe('When the API call is successful', () => {
      it('returns a successful response', async () => {
        mock.onPut(`${url}`).reply(204, product);
        await saveProduct(product).then((res: IProductResponse) => {
          expect(res.isSuccessful).toBe(true);
          expect(res.error).toBeUndefined();
          expect(res.product).toBeDefined();
        });
      });
    });

    describe('When the API call fails', () => {
      it('returns a failed response', async () => {
        mock.onPut(`${url}`).reply(500);
        await saveProduct(product).then((res: IProductResponse) => {
          expect(res.isSuccessful).toBe(false);
          expect(res.error).toBeDefined();
          expect(res.product).toMatchObject(product);
        });
      });
    });
  });
});
