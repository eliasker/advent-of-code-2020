import { multiplyArray } from "../util/math";

const input = require("./day1_input.json");

const findPair = (numbers: number[]): number[] => {
  let result = [];
  for (let index_a = 0; index_a < numbers.length - 1; index_a++) {
    for (let index_b = 1; index_b < numbers.length; index_b++) {
      if (index_a !== index_b && numbers[index_a] + numbers[index_b] === 2020) {
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

const findNumbers = (numbers: number[], target: number): number[] => {
  let found = [];

  for (let index_a = 0; index_a < numbers.length; index_a++) {
    const wanted = target - numbers[index_a]; // wanted is number_b + number_c
    let set = new Set<number>();

    for (let index_b = index_a + 1; index_b < numbers.length; index_b++) {
      let number_c = wanted - numbers[index_b];

      if (set.has(number_c)) {
        found = [numbers[index_a], numbers[index_b], number_c];
      } else {
        set.add(numbers[index_b]);
      }
    }
  }
  return found;
};

const WANTED = 2020;


console.log('--- Day 1 ---')

const values1 = findPair(input.numbers);
console.log(`Part 1: ${values1} sum is: ${WANTED}`);

const values2 = findNumbers(input.numbers, WANTED);
console.log(
  `Part 2: ${values2} sum is: ${WANTED}, found numbers multiplied: ${multiplyArray(
    values2
  )}`
);
