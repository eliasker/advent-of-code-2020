import { readNumbers } from "../util/files";

const input = readNumbers("./day9/day9_input.txt");

const PREAMBLE_LENGTH = 25;
const findPair = (sum: number, preamble: number[]): boolean => {
  let map = new Map();
  for (let i = 0; i < preamble.length; i++) {
    if (map[preamble[i]]) return true;
    map[sum - preamble[i]] = preamble[i];
  }
  return false;
};

const part1 = (): number => {
  for (let i = PREAMBLE_LENGTH; i < input.length; i++) {
    let preamble = input.slice(i - PREAMBLE_LENGTH, i);
    if (!findPair(input[i], preamble)) return input[i];
  }
  return 0;
};

console.log("--- Day 9 ---");
console.log(`Part 1: First number that can't be summed: ${part1()}`);
console.log(`Part 2:`);
