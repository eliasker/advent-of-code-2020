const fs = require("fs");
const path = "./day2/day2_input.txt";

var text = fs.readFileSync(path, "utf-8");
var inputLines = text.split("\n");

interface Password {
  lowerLimit: number;
  upperLimit: number;
  letter: string;
  character: string;
}

// '+' is an unary operator that converts an operand into a number
const splitLine = (line: string): Password => {
  let values = line.split(" ");
  return {
    lowerLimit: +values[0].split("-")[0],
    upperLimit: +values[0].split("-")[1],
    letter: values[1].charAt(0),
    character: values[2].trim(),
  };
};

const isValid = (password: Password): boolean => {
  let amount = password.character.split(password.letter).length - 1;
  return amount >= password.lowerLimit && amount <= password.upperLimit;
};

const checkPasswords = (lines: string[]): number => {
  let valid = 0;
  lines.forEach((line) => {
    if (isValid(splitLine(line))) {
      valid++;
    }
  });
  return valid;
};

// Examples should print 2
//const example = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];
//console.log(checkPasswords(example));

console.log(checkPasswords(inputLines));
