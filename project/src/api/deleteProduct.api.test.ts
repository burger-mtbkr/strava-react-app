/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { IDeleteProductResponse } from 'src/models';
import MockAdapter from 'axios-mock-adapter';
import { deleteProduct } from 'src/api';
import { axiosApi } from 'src/utils';

describe(`[api] ${deleteProduct.name}`, () => {
  const mock: MockAdapter = new MockAdapter(axiosApi);
  const url = process.env.REACT_APP_API_END_POINT ?? '';

  describe('When the API call is successful', () => {
    const id = '12345';

    it('returns a successful empty response', async () => {
      mock.onDelete(`${url}/${id}`).reply(204);

      await deleteProduct(id).then((res: IDeleteProductResponse) => {
        expect(res.id).toBe('12345');
        expect(res.error).toBeUndefined();
        expect(res.isSuccessful).toBe(true);
      });
    });
  });

  describe('When the API call is fails', () => {
    const id = '1236';

    it('returns a failed response', async () => {
      mock.onDelete(`${url}/`).reply(404);

      await deleteProduct(id).then((res: IDeleteProductResponse) => {
        expect(res.id).toBe('1236');
        expect(res.error).toBeDefined();
        expect(res.isSuccessful).toBe(false);
      });
    });
  });
});
