import { readNumbers } from "../util/files";
import { SumQueue } from "../util/dataStructures";

const input = readNumbers("./day9/day9_input.txt");

// preamble consists of 25 previous numbers
const PREAMBLE_LENGTH = 25;

// tries to find a pair of numbers from an array of numbers
// sum of pair must be equal to wanted
const findPair = (wanted: number, preamble: number[]): boolean => {
  let map = new Map();
  for (let i = 0; i < preamble.length; i++) {
    if (map[preamble[i]]) return true;
    map[wanted - preamble[i]] = preamble[i];
  }
  return false;
};

// number is invalid if it is not the sum of two of the 25 numbers before it
const findInvalidNumber = (
  preambleLength: number,
  numbers: number[]
): number => {
  for (let i = preambleLength; i < numbers.length; i++) {
    let preamble = numbers.slice(i - preambleLength, i);
    if (!findPair(numbers[i], preamble)) return numbers[i];
  }
  return 0;
};

// add numbers to queue until queue.getSum() === wanted
// if (queue.getSum() > wanted) it dequeues enough numbers so that sum < wanted
const findContiguousSet = (wanted: number, numbers: number[]): number[] => {
  const queue = new SumQueue();
  for (let i = 0; i < numbers.length; i++) {
    if (queue.getSum() === wanted && queue.getSize() > 1) {
      return queue.getValues();
    }
    queue.enqueue(numbers[i]);
    while (queue.getSum() > wanted) {
      queue.dequeue();
    }
  }
  return queue.getValues();
};

// find invalid number
// then find contiguous set that adds up to that number
// then add smallest and largest numbers together in that set
const findWeakness = (preambleLength: number, numbers: number[]): number => {
  const invalidNumber = findInvalidNumber(preambleLength, numbers);
  const contiguousSet = findContiguousSet(invalidNumber, numbers);
  const sortedSet = contiguousSet.sort((a, b) => a - b);
  return sortedSet[0] + sortedSet[sortedSet.length - 1];
};

console.log("--- Day 9 ---");
console.log(
  `Part 1: First number that can't be summed: 
  ${findInvalidNumber(PREAMBLE_LENGTH, input)}`
);
console.log(
  `Part 2: Smallest and largest numbers in contiguous set summed: 
  ${findWeakness(PREAMBLE_LENGTH, input)}`
);
