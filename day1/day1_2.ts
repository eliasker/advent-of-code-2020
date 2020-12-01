import { sumArray, multiplyArray } from "../util/math";

const input = require("./day1_input.json");

const findNumbers = (numbers: number[], target: number): number[] => {
  let found = [];

  for (let index_a = 0; index_a < numbers.length; index_a++) {
    const wanted = target - numbers[index_a]; // wanted is number_b + number_c
    let set = new Set<number>();

    for (let index_b = index_a + 1; index_b < numbers.length; index_b++) {
      let number_c = wanted - numbers[index_b];

      if (set.has(wanted - numbers[index_b])) {
        found = [numbers[index_a], numbers[index_b], number_c];
      } else {
        set.add(numbers[index_b]);
      }
    }
  }
  return found;
};

// using testNumbers found numbers should be 979, 366, 675
//const testNumbers = [1721, 979, 366, 299, 675, 1456];
//console.log(findNumbers(testNumbers, 2020));

const values2 = findNumbers(input.numbers, 2020);
console.log(
  `Found: ${values2}, sum: ${sumArray(
    values2
  )}, found numbers multiplied: ${multiplyArray(values2)}`
);
