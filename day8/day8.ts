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
let accumulator = 0;
let current = 0;

const executeInstruction = (instruction: Instruction) => {
  instruction.times++;
  switch (instruction.operation) {
    case "acc":
      accumulator += instruction.argument;
      return 1;
    case "nop":
      return 1;
    case "jmp":
      return instruction.argument;
  }
};


const loadBootsector = (instructions: Instruction[]) => {
  while (instructions[current].times < 1) {
    console.log(
      instructions[current],
      "index:",
      current,
      "accumulator:",
      accumulator
    );
    current += executeInstruction(instructions[current]);
    current < instructions.length - 1
      ? current
      : (current -= instructions.length);
  }
};

const instructions = input.map((line) => parseInstruction(line));
loadBootsector(instructions);
