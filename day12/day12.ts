import { readLines } from "../util/files";
const input = readLines("./day12/day12_input.txt");

enum Direction {
  N = 0,
  S = 180,
  E = 90,
  W = 270,
}

class Waypoint {
  north: number;
  east: number;
  south: number;
  west: number;

  constructor(north: number, east: number, south: number, west: number) {
    this.north = north;
    this.east = east;
    this.south = south;
    this.west = west;
  }

  public moveWaypoint(dir: string, value: number): void {
    if (dir === "N") this.north += value;
    else if (dir === "E") this.east += value;
    else if (dir === "S") this.south += value;
    else if (dir === "W") this.west += value;
  }

  public rotateWaypoint(dir: string, value: number): void {
    let rotate = 0;
    if (dir === "R") {
      rotate += value;
    } else if (dir === "L") {
      rotate += 360 - value;
    }
    const prevValues = this.getValues();
    if (rotate === 90) {
      this.north = prevValues.west;
      this.east = prevValues.north;
      this.south = prevValues.east;
      this.west = prevValues.south;
    } else if (rotate === 180) {
      this.north = prevValues.south;
      this.east = prevValues.west;
      this.south = prevValues.north;
      this.west = prevValues.east;
    } else if (rotate === 270) {
      this.north = prevValues.east;
      this.east = prevValues.south;
      this.south = prevValues.west;
      this.west = prevValues.north;
    }
  }
  public getValues() {
    return {
      north: this.north,
      east: this.east,
      south: this.south,
      west: this.west,
    };
  }
}

class WaypointShip {
  target = new Waypoint(1, 10, 0, 0);
  north: number = 0;
  south: number = 0;
  east: number = 0;
  west: number = 0;

  public executeInstruction(instr: string): void {
    const dir = instr.slice(0, 1);
    const value = +instr.slice(1);
    if (dir === "F") {
      this.move(value);
    } else if (dir === "R" || dir === "L") {
      this.target.rotateWaypoint(dir, value);
    } else if (dir === "N" || dir === "E" || dir === "S" || dir === "W") {
      this.target.moveWaypoint(dir, value);
    }
  }

  public move(times: number): void {
    const waypointValues = this.target.getValues();
    this.north += waypointValues.north * times;
    this.east += waypointValues.east * times;
    this.south += waypointValues.south * times;
    this.west += waypointValues.west * times;
  }
}

class SimpleShip {
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
  const ship = new SimpleShip();
  lines.forEach((line) => ship.executeInstruction(line));
  return manhattanDistance(ship.north, ship.south, ship.east, ship.west);
};

const part2 = (lines: string[]) => {
  const wpShip = new WaypointShip();
  lines.forEach((line) => wpShip.executeInstruction(line));
  return manhattanDistance(
    wpShip.north,
    wpShip.south,
    wpShip.east,
    wpShip.west
  );
};

console.log("--- Day 12 ---");
console.log(`Part 1: Using input as directions the sailed ${part1(input)} units (Manhattan distance).`);
console.log(`Part 2: Navigating with waypoints ship sailed ${part2(input)} units (Manhattan distance).`); 
