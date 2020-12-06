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
  console.log(groups[groups.length - 1])
  return groups;
};

const countDifferent = (answers: string[]): Set<string> => {
  let different = new Set<string>();
  answers.forEach((answer) => {
    answer.split("").forEach((char) => different.add(char));
  });  
  return different;
};

const sumGroups = (lines: string[]): number => {
  const groups = groupLines(lines);
  let sum = 0;
  groups.forEach((group) => (sum += countDifferent(group).size));
  return sum;
};

console.log(sumGroups(input)); //Part 1: 6596 
