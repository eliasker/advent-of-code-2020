import { readNumbers } from "../util/files";

// adapters are rated for specific output "joltage"
// previous output can be 1-3 lower than following rating
// rating of your device is 3 jolts higher than highest adapter
// treat the charging outlet as 0
const test = readNumbers("./day10/test.txt");
const input = readNumbers("./day10/day10_input.txt");
const sortedTest = test.sort((a, b) => a - b);
const sortedInput = input.sort((a, b) => a - b);

// forming chain is easier if adapters are sorted
// charging outlet (rating: 0) is inserted at the beginning
// devices (rating: largest + 3) is added to the end
const initialize = (numbers: number[]): number[] => {
  let sorted = numbers.sort((a, b) => a - b);
  sorted.unshift(0);
  const largest = sorted[sorted.length - 1];
  sorted.push(largest + 3);
  return sorted;
};

const findDifferences = (adapters: number[]): number[] => {
  let prev = adapters[0];
  let diff1 = 0;
  let diff3 = 0;
  adapters.forEach((adapter) => {
    if (adapter - prev === 1) {
      diff1++;
    } else if (adapter - prev === 3) {
      diff3++;
    }
    prev = adapter;
  });
  return [diff1, diff3];
};

const multiplyDifferences = (diff: number[]): number => {
  return diff[0] * diff[1];
};

let memo = {};
const findCombinations = (adapters: number[]) => {
  const key = adapters.join(",");
  if (key in memo) {
    return memo[key];
  }
  let result = 1;
  for (let i = 1; i < adapters.length - 1; i++) {
    if (adapters[i + 1] - adapters[i - 1] <= 3) {
      const newAdapters = [adapters[i - 1]].concat(adapters.slice(i + 1));
      result += findCombinations(newAdapters);
    }
  }
  memo[key] = result;
  return result;
};

const initialized = initialize(input);

console.log("--- Day 10 ---");
console.log(
  `Part 1: Number of 1&3 differences in adapters multiplied is: ${multiplyDifferences(
    findDifferences(initialized)
  )}`
);

console.log(
  `Part 2: Number of distinct adapter arrangements: ${findCombinations(
    initialized
  )}`
);
