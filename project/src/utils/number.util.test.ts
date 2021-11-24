import { roundNumber } from './number.util';

describe(`${roundNumber.name}`, () => {
  const testValues = [
    {
      number: 1213.4545,
      dp: 2,
      expected: 1213.45,
    },
    {
      number: 1213.4545,
      dp: 3,
      expected: 1213.455,
    },
    {
      number: 1213.4545,
      dp: 0,
      expected: 1213,
    },
  ];

  it.each(testValues)(
    'should round number correctly to the specified decimal places.',
    (testValue) => {
      const number = roundNumber(testValue.number, testValue.dp);

      expect(number).toEqual(testValue.expected);
    },
  );
});
