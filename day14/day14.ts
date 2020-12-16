import { readLines } from "../util/files";
const input = readLines("./day14/day14_input.txt");

// parameteres arent correctly initialized
// computer initialization uses bitmasking system

// every line of initialization program (puzzle input) either
//    a) changes the bitmask or
//    b) writes a value to specific memory address

// values are 36-bit unsigned integers
// mem[8] = 11 --> write value 11 to memory address 8

// bitmask is a string of 36 bits (2^36)
// current bitmask is applied to values before writing
// a 0 or 1 overwrites the corresponding bit in the value
// X leaves the bit unchanged

// read line --> split(" = ") --> update mask or write value

class ComputerSystem {
  mask: string = "";
  memory = new Map<number, number>();
  part: number = 1;

  constructor(part: number) {
    this.part = part;
  }

  public executeInstruction(instr: string, value: string) {
    instr === "mask"
      ? this.updateMask(value)
      : this.part === 1
      ? this.writeToMemory(instr, value)
      : this.writeToMemory2(instr, value);
  }

  updateMask(mask: string): void {
    this.mask = mask;
  }
  // Part 1:
  //  1) convert value to binary
  //  2) apply mask
  //  3) convert masked binary back to decimal
  //  4) write value to address (overwrite previous)
  writeToMemory(address: string, value: string) {
    const addressNum = +address.match(/\d/g).join("");
    const decimal = +value;

    let binaryValue = (decimal >>> 0).toString(2);
    while (binaryValue.length < 36) binaryValue = "0" + binaryValue;
    let maskedBinary = "";
    for (let i = 0; i < 36; i++) {
      this.mask.charAt(i) === "X"
        ? (maskedBinary += binaryValue.charAt(i))
        : (maskedBinary += this.mask.charAt(i));
    }
    this.memory.set(addressNum, parseInt(maskedBinary, 2));
  }

  // Part 2:
  //  1) convert address to binary
  //  2) apply mask to address, go through characters in mask
  //      0: use original char,
  //      1: replace with 1,
  //      X: both 0 and 1 (duplicates addresses)
  //  3) write values to (possibly multiple) address
  writeToMemory2(address: string, value: string) {
    let binaryAddress = (+address.match(/\d/g).join("") >>> 0).toString(2);
    while (binaryAddress.length < 36) binaryAddress = "0" + binaryAddress;
    let addresses = [binaryAddress];

    for (let i = 0; i < this.mask.length; i++) {
      if (this.mask.charAt(i) === "1") {
        addresses = addresses.map(
          (prev) => prev.substr(0, i) + this.mask.charAt(i) + prev.substr(i + 1)
        );
      } else if (this.mask.charAt(i) === "X") {
        addresses = addresses.reduce((acc, prev) => {
          return acc.concat([
            prev.substr(0, i) + "0" + prev.substr(i + 1),
            prev.substr(0, i) + "1" + prev.substr(i + 1),
          ]);
        }, []);
      }
    }

    addresses.forEach((variant) =>
      this.memory.set(parseInt(variant, 2), +value)
    );
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

const runProgram = (lines: string[], part: number): number => {
  const computer = new ComputerSystem(part);
  lines.forEach((line) => {
    const values = line.split(" = ");
    computer.executeInstruction(values[0], values[1]);
  });
  return computer.sumMemoryValues();
};

console.log("--- Day 14 ---");
console.log(`Part 1: Sum of all values in memory ${runProgram(input, 1)}`);
console.log(`Part 2: Sum of all values in memory ${runProgram(input, 2)}`);
