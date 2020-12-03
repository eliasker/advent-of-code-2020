import { readLines } from "../util/files";
import { sumArray, multiplyArray } from "../util/math";

const lines = readLines("./day3/day3_input.txt");

// traverse map from top left square to the bottom
// movement: go right 3 positions & down 1 position
// count trees you encouter when traversing
// . is open square, # is tree
// if new position is tree --> trees++

// y_max === lines.length, x_max === line.length
// map is a repeating pattern
//    --> x wraps around
// do until y === y_max

const isTree = (char: string): boolean => {
  return char === "#";
};

const traverse = (map: string[], move_x: number, move_y: number): number => {
  const y_max = map.length - 1;
  const x_max = map[0].length - 1;

  let treeCount = 0;
  let x = 0;

  for (let y = 0; y <= y_max; y += move_y) {
    let current_position = map[y].charAt(x);

    if (isTree(current_position)) treeCount++;
    //console.log(`${map[y]} (${x},${y}): ${map[y].charAt(x)}`);

    x += move_x;
    if (x > x_max) {
      x -= x_max + 1;
    }
  }
  return treeCount;
};

// Part 1
console.log(`Part 1: Found ${traverse(lines, 3, 1)} trees`);

// Part 2
const movements = [
  { move_x: 1, move_y: 1 },
  { move_x: 3, move_y: 1 },
  { move_x: 5, move_y: 1 },
  { move_x: 7, move_y: 1 },
  { move_x: 1, move_y: 2 },
];

const trees = movements.map(({ move_x, move_y }) =>
  traverse(lines, move_x, move_y)
);
console.log(`Part 2: Found ${sumArray(trees)}, multiplied values to ${multiplyArray(trees)}`);
