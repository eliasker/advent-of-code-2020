import { readLines } from "../util/files";

const input = readLines("./day7/day7_input.txt");

const initialize = (lines: string[]) => {
  let outer = []; // bags that can contain "shiny gold" bags
  let inspect = []; // bags that can maybe contain bags that can contain "shiny gold" bags (and so on... :D)
  let block = []; // dead ends, bags that can't contain other colors

  lines.forEach((line) => {
    const words = line.split(" ");
    const color = [words[0], words[1]].join(" ");
    const contains = words.slice(4).join(" ");
    if (contains.includes("shiny gold")) {
      outer.push(color);
    } else if (contains.includes("no other")) {
      block.push(color);
    } else {
      inspect.push(line);
    }
  });

  return [outer, inspect, block];
};

const findPossible = (outer: string[], inspect: string[], block: string[]) => {
  let newOuter = outer;
  let newInspect = [];
  let newBlock = block;

  inspect.forEach((bag) => {
    const words = bag.split(" ");
    const color = [words[0], words[1]].join(" ");
    const contains = words.slice(4).join(" ");

    if (outer.find((outerColor) => contains.includes(outerColor))) {
      newOuter.push(color);
    } else if (words.length === 8) {
      block.find((blockedColor) => contains.includes(blockedColor))
        ? newBlock.push(color)
        : newInspect.push(bag);
    } else {
      newInspect.push(bag);
    }
  });

  if (inspect.length !== newInspect.length) {
    findPossible(newOuter, newInspect, newBlock);
  }
  return newOuter.length;
};

// Part 2: should've probably mapped values from the very beginning... :D
const mapBags = (lines: string[]): Map<string, string[]> => {
  const bagMap = new Map();

  for (const line of lines) {
    const [bagColor, rules] = line.split(" bags contain ");
    bagMap.set(bagColor, rules.split(", "));
  }
  return bagMap;
};

const countBags = (bagColor: string, map: Map<string, string[]>): number => {
  let result = 0;
  map.get(bagColor).forEach((rule) => {
    if (rule.includes("no other")) {
      return 1;
    } else {
      const words = rule.split(" ");
      const newColor = [words[1], words[2]].join(" ");
      result += +words[0] + +words[0] * countBags(newColor, map);
    }
  });
  return result;
};

const initial = initialize(input);

console.log("Day 7");

console.log(
  `Part 1: ${findPossible(
    initial[0],
    initial[1],
    initial[2]
  )} bags can eventually contain shiny gold bag.`
);

console.log(
  `Part 2: total of ${countBags(
    "shiny gold",
    mapBags(input)
  )} bags are required inside shiny gold bag.`
);
