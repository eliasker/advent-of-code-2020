import { readLines } from "../util/files";

const input = readLines("./day7/day7_input.txt");

const initialize = (lines: string[]) => {
  let outer = []; // bags that can contain "shiny gold"
  let inspect = []; // bags that can maybe contain outerBags
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

const findRequired = (outer: string[], inspect:  string[], block: string[])=> {
  return 0
}

const initial = initialize(input);

console.log("Day 7");
console.log(
  `Part 1: ${findPossible(
    initial[0],
    initial[1],
    initial[2]
  )} bags can eventually contain shiny gold bag.`
);

console.log(`Part 2: ${findRequired(initial[0], initial[1], initial[2])} bags are required inside shiny gold bag.`)