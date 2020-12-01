const input = require("./day1_input.json");
//const testNumbers = [1721, 979, 366, 299, 675, 1456];

const sum = (a: number, b: number): number => a + b;
const multiply = (a: number, b: number): number => a * b;

const findPair = (numbers: number[]): number[] => {
  let result = [];
  for (let index_a = 0; index_a < numbers.length - 1; index_a++) {
    for (let index_b = 1; index_b < numbers.length; index_b++) {
      if (
        index_a !== index_b &&
        sum(numbers[index_a], numbers[index_b]) === 2020
      ) {
        result.push(numbers[index_a]);
        result.push(numbers[index_b]);
        break;
      }
    }
    if (result.length === 2) {
      break;
    }
  }
  return result;
};

const findSolution = (numbers: number[]): void => {
  const found = findPair(numbers);
  if (found.length === 2) {
    console.log(`${found[0]} + ${found[1]} = ${sum(found[0], found[1])}`);
    console.log(`${found[0]} * ${found[1]} = ${multiply(found[0], found[1])}`);
  } else console.log("no solution found");
};

findSolution(input.numbers);
