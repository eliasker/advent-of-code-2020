import { readLines } from "../util/files";
const input = readLines("./day11/day11_input.txt");
const test = readLines("./day11/test.txt");

// Part 1:
// tiles: "." is floor, "L": empty seat, "#": seat is taken
// following rules are applied to every seat simultaneously:
// 1) empty seat gets occupied if adjacent squares are empty or floor
// 2) seat becomes empty if 4 or more adjacent seats are occupied
// during 1st round everyone materializes next to a seat and sits on it :D?
const offset = [
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
];

const checkAdjacent = (map: string[], x: number, y: number): number => {
  let adj = 0;

  offset.forEach((offxy) => {
    try {
      const adjacent = map[y + offxy.y].charAt(x + offxy.x);
      if (adjacent === "#") adj++;
    } catch (e) {}
  });
  return adj;
};
// part 2, not yet working, what a mess...  (-_-)
const checkAdjacent2 = (map: string[], x: number, y: number): number => {
  let adj = 0;
  let i = 1;
  offset.forEach((offxy) => {
    while (true) {
      let newx = x + offxy.x * i;
      let newy = y + offxy.y * i;
      if (newx >= map[0].length || newx < 0 || newy >= map.length || newy < 0) {
        break;
      } else if (map[newy].charAt(newx) === "#") {
        adj++;
        break;
      } else if (map[newy].charAt(newx) === "L") {
        break;
      }
      i++;
    }
  });

  return adj;
};

const loopSeats = (
  currentMap: string[],
  maxOccupied: number,
  onlyNext: boolean
) => {
  let newMap = [];
  currentMap.forEach((line, y) => {
    let newRow = "";
    line.split("").forEach((char, x) => {
      if (char === ".") {
        newRow += ".";
      } else if (char === "L") {
        if (onlyNext) {
          checkAdjacent(currentMap, x, y) === 0
            ? (newRow += "#")
            : (newRow += "L");
        } else {
          if (checkAdjacent2(currentMap, x, y) === 0) {
            newRow += "#";
          } else {
            newRow += "L";
          }
        }
      } else if (char === "#") {
        if (onlyNext) {
          if (checkAdjacent(currentMap, x, y) >= maxOccupied) {
            newRow += "L";
          } else {
            newRow += "#";
          }
        } else {
          if (checkAdjacent2(currentMap, x, y) >= maxOccupied) {
            newRow += "L";
          } else {
            newRow += "#";
          }
        }
      }
    });
    newMap.push(newRow);
  });
  return newMap;
};

const calculateOccupied = (map: string[]) => {
  let occupied = 0;
  map.forEach((line) =>
    line.split("").forEach((char) => (char === "#" ? occupied++ : occupied))
  );

  return occupied;
};
const findBalance = (
  initial: string[],
  maxOccupied: number,
  onlyNext: boolean
) => {
  let prev = initial;
  while (true) {
    let newMap = loopSeats(prev, maxOccupied, onlyNext);
    if (JSON.stringify(prev) === JSON.stringify(newMap)) break;
    prev = newMap;
  }
  console.log(prev);

  return calculateOccupied(prev);
};

console.log("--- Day 11 ---");
console.log(`Part 1: ${findBalance(input, 4, true)} seats end up occupied.`);
console.log(`Part 2: ${findBalance(test, 5, false)} seats end up occupied.`);
