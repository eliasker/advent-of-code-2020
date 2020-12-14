import { readLines } from "../util/files";
const input = readLines("./day12/day12_input.txt");

enum Direction {
  N = 0,
  S = 180,
  E = 90,
  W = 270,
}

class Ship {
  // ship starts facing east
  direction: number = 90; // N=0, S=180, E=90, W=270
  north: number = 0;
  south: number = 0;
  east: number = 0;
  west: number = 0;

  public executeInstruction(instr: string): void {
    const dir = instr.slice(0, 1);
    const value = +instr.slice(1);
    if (dir === "L" || dir === "R") {
      this.turn(dir, value);
    } else {
      this.move(dir, value);
    }
  }

  public turn(dir: string, value: number): void {
    if (dir === "L") {
      this.direction += 360 - value;
    } else if (dir === "R") {
      this.direction += value;
    }
    this.direction = this.direction % 360;
  }

  // F - forward, gets ships current direction
  // and calls move again with corresponding dir
  public move(dir: string, value: number): void {
    if (dir === "N") this.north += value;
    else if (dir === "S") this.south += value;
    else if (dir === "E") this.east += value;
    else if (dir === "W") this.west += value;
    else if (dir === "F") {
      this.move(Direction[this.direction], value);
    }
  }
}

// calculate manhattan distance
// sum of the absolute values of its east/west position
// and north / south position
const manhattanDistance = (
  north: number,
  south: number,
  east: number,
  west: number
): number => {
  let manhattan = 0;
  const northsouth = Math.abs(north - south);
  const eastwest = Math.abs(east - west);
  manhattan = northsouth + eastwest;
  return manhattan;
};

const part1 = (lines: string[]) => {
  const ship = new Ship();
  lines.forEach((line) => ship.executeInstruction(line));
  return manhattanDistance(ship.north, ship.south, ship.east, ship.west);
};

console.log("--- Day 12 ---");
console.log(`Part 1: ${part1(input)}`);
/*
console.log(`Part 2:`);
*/
