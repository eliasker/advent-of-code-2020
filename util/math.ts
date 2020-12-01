export const sumArray = (numbers: number[]): number => {
  var sum = 0;
  numbers.forEach((number) => (sum += number));
  return sum;
};

export const multiplyArray = (numbers: number[]): number => {
  var result = 1;
  numbers.forEach((number) => (result *= number));
  return result;
};
