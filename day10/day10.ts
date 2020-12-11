import { readNumbers } from "../util/files";

// adapters rated for specific output joltage
// output can be 1-3 lower than adapters rating
// your device is 3 jolts higher than highest adapter
// treat the charging outlet as 0

const test = readNumbers("./day10/test.txt");
const input = readNumbers("./day10/day10_input.txt");
const sortedTest = test.sort((a, b) => a - b);
const sortedInput = input.sort((a, b) => a - b);

// charging outlet has rating of 0
// your devices built in rating is adapter with biggest rating + 3
const findDifferences = (sortedAdapters: number[]): number[] => {
  let prev = sortedAdapters[0];
  let diff1 = 1; // charging outlet
  let diff3 = 1; // your device
  sortedAdapters.forEach((adapter, index) => {
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

console.log("--- Day 10 ---");
console.log(`Part 1: ${multiplyDifferences(findDifferences(input))}`);
console.log(`Part 2:`);
