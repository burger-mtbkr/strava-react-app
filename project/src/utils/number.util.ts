/* eslint-disable no-restricted-properties */
export const roundNumber = (numberValue: number, decimal: number): number => {
  if (typeof numberValue !== 'number' || typeof decimal !== 'number') {
    return 0.0;
  }
  const numSign = numberValue >= 0 ? 1 : -1;
  const pow: number = Math.pow(10, decimal);
  const powerNumber: number =
    Math.round(numberValue * Math.pow(10, decimal) + numSign * 0.0001) / pow;
  return Number(powerNumber.toFixed(decimal));
};
