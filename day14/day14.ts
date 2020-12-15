import { readLines } from "../util/files";
const input = readLines("./day14/day14_input.txt");

// parameteres arent correctly initialized
// computer initialization uses bitmasking system

// every line of initialization program (input) either
//    a) updates the bitmask or
//    b) writes a value to memory

// values are 36-bit unsigned integer
// mem[8] = 11 --> write value 11 to memory address 8

// bitmask is a string of 36 bits (2^36)
// current bitmask is applied to values before writing
// a 0 or 1 overwrites the corresponding bit in the value
// X leaves the bit unchanged

// read line --> split(" = ") --> update mask or write value
// mask: update current bitmask
// value: 1) convert to binary
//        2) apply mask
//        3) convert masked binary back to decimal 
//        4) write value to address (overwrite previous)

class ComputerSystem {
  mask: string = "";
  memory = new Map<number, number>();

  public executeInstruction(instr: string, value: string) {
    instr === "mask"
      ? this.updateMask(value)
      : this.writeToMemory(instr, value);
  }

  updateMask(mask: string): void {
    this.mask = mask;
  }

  writeToMemory(address: string, value: string) {
    const addressNum = +address.match(/\d/g).join("");
    const decimal = +value;

    // convert decimal to binary
    let binaryValue = (decimal >>> 0).toString(2);
    // adding leading zeroes
    while (binaryValue.length < 36) binaryValue = "0" + binaryValue;
    // mask binary number
    let maskedBinary = "";
    for (let i = 0; i < 36; i++) {
      this.mask.charAt(i) === "X"
        ? (maskedBinary += binaryValue.charAt(i))
        : (maskedBinary += this.mask.charAt(i));
    }
    this.memory.set(addressNum, parseInt(maskedBinary, 2));
  }

  public sumMemoryValues(): number {
    let sum = 0;
    this.memory.forEach((value, key) => {
      sum += value;
    });
    return sum;
  }

  public printMemory() {
    this.memory.forEach((value, key) => {
      console.log(key, value);
    });
  }
}

const part1 = (lines: string[]): number => {
  const computer = new ComputerSystem();
  lines.forEach((line) => {
    const values = line.split(" = ");
    computer.executeInstruction(values[0], values[1]);
  });
  return computer.sumMemoryValues();
};

console.log("--- Day 14 ---");
console.log(`Part 1: Sum of all values in memory ${part1(input)}`);
console.log(`Part 2:`);
