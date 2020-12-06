import { readLines } from "../util/files";

const input = readLines("./day6/day6_input.txt");

const groupLines = (lines: string[]) => {
  const groups = [];
  let current = [];
  lines.forEach((line) => {
    if (line !== "") {
      current.push(line);
    } else {
      groups.push(current);
      current = [];
    }
  });
  return groups;
};

// ["aab", "bc"] --> ["a", "b", "c"]
const countDifferent = (answers: string[]): string[] => {
  let different = new Set<string>();
  answers.forEach((answer) => {
    answer.split("").forEach((char) => different.add(char));
  });
  return Array.from(different);
};

// ["abc", "ab", "ac"] --> ["a"]
const countCommon = (groupsAnswers: string[]): string[] => {
  let commonAnswers = groupsAnswers[0].split("");
  groupsAnswers.forEach(
    (personsAnswers) =>
      (commonAnswers = commonAnswers.filter((common) =>
        personsAnswers.split("").includes(common)
      ))
  );
  return commonAnswers;
};

const sumAnswers = (lines: string[], operate: (string: []) => string[]): number => {
  const groups = groupLines(lines);
  let sum = 0;
  groups.forEach((group) => (sum += operate(group).length));
  return sum;
};

console.log('--- Day 6 ---')
console.log(`Part 1: ${sumAnswers(input, countDifferent)}`); //Part 1: 6596
console.log(`Part 2: ${sumAnswers(input, countCommon)}`); //Part 2: 3219
