import * as _ from "lodash";
import { readLines } from "../util/files";
const input = readLines("./day17/day17_input.txt");
const test = [".#.", "..#", "###"];

// pocket dimension contains an infinite 3-dimensional grid
// at every coordinate (x,y,z) exists a single cube
// cube is either active "#" or inactive "."
// during cycle all cubes follow these rules simultaneously
//    1) active has 2-3 neighbors? stays active, otherwise becomes inactive
//    2) inactive becomes active if 3 neighbors are active

// iamverysmart :D
const offset = [
  { x: -1, y: 1, z: -1 },
  { x: 0, y: 1, z: -1 },
  { x: 1, y: 1, z: -1 },
  { x: -1, y: 0, z: -1 },
  { x: 0, y: 0, z: -1 },
  { x: 1, y: 0, z: -1 },
  { x: -1, y: -1, z: -1 },
  { x: 0, y: -1, z: -1 },
  { x: 1, y: -1, z: -1 },

  { x: -1, y: 1, z: 0 },
  { x: 0, y: 1, z: 0 },
  { x: 1, y: 1, z: 0 },
  { x: -1, y: 0, z: 0 },
  { x: 1, y: 0, z: 0 },
  { x: -1, y: -1, z: 0 },
  { x: 0, y: -1, z: 0 },
  { x: 1, y: -1, z: 0 },

  { x: -1, y: 1, z: 1 },
  { x: 0, y: 1, z: 1 },
  { x: 1, y: 1, z: 1 },
  { x: -1, y: 0, z: 1 },
  { x: 0, y: 0, z: 1 },
  { x: 1, y: 0, z: 1 },
  { x: -1, y: -1, z: 1 },
  { x: 0, y: -1, z: 1 },
  { x: 1, y: -1, z: 1 },
];

// for each add active cubes in neighboring (offset xyz) coordinates
// if offset xyz doesn't exist --> add it to map with inactive cube

const initialize = (lines: string[]): Map<string, string> => {
  const initialState = new Map<string, string>();
  lines.forEach((line, y) =>
    line
      .split("")
      .forEach((char, x) => initialState.set(`${x},${y},${0}`, char))
  );
  return initialState;
};
let toofew = 0;
let toomany = 0;
let limitsok = 0;
const iterate = (state: Map<string, string>) => {
  /*
  let temp = state//_.cloneDeep(state);
  let current = state//_.cloneDeep(state);
  */
 let temp = _.cloneDeep(state);
 let current = _.cloneDeep(state);

  for (let i = 0; i < 6; i++) {
    current.forEach((value, key) => {
      let nearby = 0;
      for (let j = 0; j < offset.length; j++) {
        if (nearby > 3) break;
        const coordinates = key.split(",");
        const adjacent = `${+coordinates[0] + offset[j].x},${
          +coordinates[1] + offset[j].y
        },${+coordinates[2] + offset[j].z}`;
        if (current.has(adjacent)) {
          current.get(adjacent) === "#" ? nearby++ : nearby;
        } else {
          temp.set(adjacent, ".");
        }
      }
      // if value === "#", cube is active
      // check adjacent (offset) for other cubes
      // 2-3 is fine, inactivevate
      if (value === "#") {
        if (nearby < 2) {
          toofew++;
          temp.set(key, ".");
        } else if (nearby > 3) {
          toomany++;
          temp.set(key, ".");
        } else {
          limitsok++;
          temp.set(key, "#");
        }
      }
      // else  if value === "." cube is inactive
      // check adjacent, if 3 active neighbors activate
      else if (value === "." && nearby === 3) {
        temp.set(key, "#")
      }
    });

    current = _.cloneDeep(temp);
    //_.cloneDeep(current);
    let count = 0;
    current.forEach((value, key) => {
      if (value === "#") count++;
    });
    console.log(count)
  }
  return current;
};

const initial = initialize(test);

const final = iterate(initial);
const countHashes = (map) => {
  let count = 0;
  map.forEach((value, key) => {
    if (value === "#") count++;
  });
  return count;
};

//console.log(countHashes(final));
//console.log(toofew, toomany, limitsok);
