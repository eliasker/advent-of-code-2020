const fs = require("fs");
const path = "./day2/day2_input.txt";

const text = fs.readFileSync(path, "utf-8");
const inputLines = text.split("\n");

interface Password {
  lowerLimit: number;
  upperLimit: number;
  letter: string;
  characters: string;
}

// '+' is an unary operator that converts an operand into a number
const splitLine = (line: string): Password => {
  let values = line.split(" ");
  return {
    lowerLimit: +values[0].split("-")[0],
    upperLimit: +values[0].split("-")[1],
    letter: values[1].charAt(0),
    characters: values[2].trim(),
  };
};

const part1_isValid = (password: Password): boolean => {
  let amount = password.characters.split(password.letter).length - 1;
  return amount >= password.lowerLimit && amount <= password.upperLimit;
};

const part2_isValid = (password: Password): boolean => {
  const letter_a = password.characters.charAt(password.lowerLimit - 1);
  const letter_b = password.characters.charAt(password.upperLimit - 1);
  let found = 0;
  if (letter_a === password.letter) found++;
  if (letter_b === password.letter) found++;
  return found === 1;
};

const checkPasswords = (
  lines: string[],
  isValid: (password: Password) => boolean
): number => {
  let valid = 0;
  lines.forEach((line) => {
    if (isValid(splitLine(line))) {
      valid++;
    }
  });
  return valid;
};

console.log(`Part 1 has ${checkPasswords(inputLines, part1_isValid)} valid passwords`);
console.log(`Part 2 has ${checkPasswords(inputLines, part2_isValid)} valid passwords`);
