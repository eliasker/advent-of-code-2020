export const sumArray = (numbers: number[]): number => {
  let sum = 0;
  numbers.forEach((number) => (sum += number));
  return sum;
};

export const multiplyArray = (numbers: number[]): number => {
  let result = 1;
  numbers.forEach((number) => (result *= number));
  return result;
};

export const findLargest = (numbers: number[]): number => {
  let largest = numbers[0];
  for (const number of numbers) {
    if (number > largest) largest = number
  }
  return largest;
};
