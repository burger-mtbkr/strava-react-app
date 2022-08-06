import { mockStreamSet } from 'src/test/mocks';
import { formatLineDataFromStream } from './lineGraph.util';

describe(`${formatLineDataFromStream.name}`, () => {
  it('should decodePolyline correctly', () => {
    const expectedResult = [
      {
        x: 0.2,
        y: 18,
      },
      {
        x: 0.5,
        y: 19,
      },
      {
        x: 0.8,
        y: 20.2,
      },
      {
        x: 1.1,
        y: 22.2,
      },
      {
        x: 1.5,
        y: 22.4,
      },
      {
        x: 1.9,
        y: 22.6,
      },
      {
        x: 2.3,
        y: 23.6,
      },
      {
        x: 2.8,
        y: 24.6,
      },
      {
        x: 3.2,
        y: 24.4,
      },
      {
        x: 3.8,
        y: 23.2,
      },
    ];

    const resultData = formatLineDataFromStream(mockStreamSet);
    expect(resultData).toEqual(expectedResult);
  });
});
