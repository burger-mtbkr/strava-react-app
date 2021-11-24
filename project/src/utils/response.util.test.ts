import { AxiosResponse } from 'axios';
import { isSuccessfulResponse } from './response.util';

describe(`${isSuccessfulResponse.name}`, () => {
  const testValues = [
    {
      status: 500,
      isSuccessfulResponse: false,
    },
    {
      status: 501,
      isSuccessfulResponse: false,
    },
    {
      status: 502,
      isSuccessfulResponse: false,
    },
    {
      status: 403,
      isSuccessfulResponse: false,
    },
    {
      status: 404,
      isSuccessfulResponse: false,
    },
    {
      status: 401,
      isSuccessfulResponse: false,
    },
    {
      status: 204,
      isSuccessfulResponse: true,
    },
    {
      status: 203,
      isSuccessfulResponse: true,
    },
    {
      status: 202,
      isSuccessfulResponse: true,
    },
    {
      status: 201,
      isSuccessfulResponse: true,
    },
    {
      status: 200,
      isSuccessfulResponse: true,
    },
  ];

  it.each(testValues)(
    'should round number correctly to the specified decimal places.',
    (testValue) => {
      const response: AxiosResponse = {
        status: testValue.status,
        data: {},
        statusText: '',
        headers: {},
        config: {},
      };

      const result = isSuccessfulResponse(response);
      expect(result).toEqual(testValue.isSuccessfulResponse);
    },
  );
});
