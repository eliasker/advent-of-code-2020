import { readLines } from "../util/files";

const input = readLines("./day8/day8_input.txt");

interface Instruction {
  operation: string;
  argument: number;
  times: number;
}

const parseInstruction = (line: string): Instruction => {
  const splitLine = line.split(" ");
  return { operation: splitLine[0], argument: +splitLine[1], times: 0 };
};

const loadBootsector = (
  instructions: Instruction[]
): { accumulator: number; lastInstruction: number } => {
  let accumulator = 0;
  let current = 0;
  let temp = JSON.parse(JSON.stringify(instructions));

  while (temp[current].times < 1) {
    temp[current].times++;
    switch (temp[current].operation) {
      case "acc":
        accumulator += temp[current].argument;
        current++;
        break;
      case "nop":
        current++;
        break;
      case "jmp":
        current += temp[current].argument;
        break;
    }
    if (current === instructions.length) break;
    if (current > temp.length - 1) {
      current -= temp.length;
    }
  }  
  return { accumulator: accumulator, lastInstruction: current };
};

// Program should terminate (last line gets executed) by
// changing exactly one "nop" to "jmp" or "jmp" to "nop"
const findCorrect = (instructions: Instruction[]) => {
  let value = 0;
  for (let i = 0; i < instructions.length - 1; i++) {
    let temp = JSON.parse(JSON.stringify(instructions));
    if (temp[i].operation === "jmp") {
      temp[i].operation = "nop";
    } else if (temp[i].operation === "nop") {
      temp[i].operation = "jmp";
    }
    if (temp[i].operation !== "acc") {
      const bootValues = loadBootsector(temp);
      
      if (bootValues.lastInstruction === instructions.length) {
        value = bootValues.accumulator
        break;
      }
    }
  }
  return value;
};

const instructions = input.map((line) => parseInstruction(line));
console.log("--- Day 8 ---");
console.log(
  `Part 1: Value in the accumulator is ${
    loadBootsector(instructions).accumulator
  }`
);
console.log(
  `Part 2: Value after the program terminates succesfully ${findCorrect(instructions)}`
);
