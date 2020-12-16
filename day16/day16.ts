import { readLines } from "../util/files";
import { sumArray } from "../util/math";

// puzzle input split into three separate parts
// values from other tickets and my ticket
const nearbyTickets = readLines("./day16/nearbyTickets.txt");
const yourTicket =
  "109,199,223,179,97,227,197,151,73,79,211,181,71,139,53,149,137,191,83,193";
// each ticket has these fields with limits,example "row: 6-11 or 33-44"
const fields = require("./fields.json");
const ticketFields = new Map();
const parseRanges = (ranges: string[]) => {
  return {
    low1: +ranges[0].split("-")[0],
    high1: +ranges[0].split("-")[1],
    low2: +ranges[1].split("-")[0],
    high2: +ranges[1].split("-")[1],
  };
};
Object.keys(fields).forEach((key) =>
  ticketFields.set(key, parseRanges(fields[key]))
);

const part1 = (ticketList: string[], ticketFieldMap: Map<any, any>) => {
  const errors = [];
  ticketList.forEach((ticket) => {
    const ticketValues = ticket.split(",");
    ticketValues.forEach((tv) => {
      let found = false;
      ticketFieldMap.forEach((value, key) => {
        if (
          (+tv >= value.low1 && +tv <= value.high1) ||
          (+tv >= value.low2 && +tv <= value.high2)
        ) {
          found = true;
        }
      });
      found ? null : errors.push(+tv);
    });
  });

  return sumArray(errors);
};

const testMap = new Map();
testMap.set("class", { low1: 1, high1: 3, low2: 5, high2: 7 });
testMap.set("row", { low1: 6, high1: 11, low2: 33, high2: 44 });
testMap.set("weat", { low1: 13, high1: 40, low2: 45, high2: 50 });
const testTickets = ["7,3,47", "40,4,50", "55,2,20", "38,6,12"];
//console.log("test", part1(testTickets, testMap));

console.log("--- Day 16 ---");
console.log(
  `Part 1: Sum of all of the invalid values (ticket scanning error rate) ${part1(
    nearbyTickets,
    ticketFields
  )}`
);
console.log(`Part 2: `);
