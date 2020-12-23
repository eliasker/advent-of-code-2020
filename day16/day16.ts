import { readLines } from "../util/files";
import { sumArray } from "../util/math";

// puzzle input can be split into three separate parts
// values from other tickets and my ticket
const nearbyTickets = readLines("./day16/nearbyTickets.txt");
const myTicket =
  "109,199,223,179,97,227,197,151,73,79,211,181,71,139,53,149,137,191,83,193";
// each ticket has these fields with limits, example "row: 6-11 or 33-44"
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

// sorts nearby tickets and returns an object that contains
//   1) a set containing only valid tickets
//   2) a list of numbers that caused errors in invalid tickets
const inspectTickets = (
  ticketList: string[],
  ticketFieldMap: Map<any, any>
): { errors: number[]; valids: string[] } => {
  const errors = [];
  const validTickets = new Set<string>();
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
      found ? validTickets.add(ticket) : errors.push(+tv);
    });
  });
  return { errors: errors, valids: Array.from(validTickets) };
};


// Part 2: work in progress
const matchFields = (
  tickets: string[],
  fields: Map<any, any>,
  myTicket: string
) => {
  const test = tickets[24].split(",");
  const found = new Map<string, number[]>();

  function findField(array: number[]) {
    let possible = new Map<number, string[]>();
    array.forEach((number) => possible.set(number, new Array<string>()));

    array.forEach((number) => {
      fields.forEach((value, key) => {
        if (number >= value.low1 && number <= value.high1) {
          possible.get(number).push(key);
        }
        if (number >= value.low2 && number <= value.high2) {
          possible.get(number).push(key);
        }
      });
    });
    let i = 1;
    possible.forEach((value, key) => {
      i++;
      console.log(i, key, value.length);
      
    });

    console.log();
  }

  //for (let i = 0; i < 20; i++) {
  for (let i = 0; i < 1; i++) {
    let array = [];
    tickets.forEach((ticket) => {
      array.push(+ticket.split(",")[i]);
    });
    findField(array);
  }
};

const testMap = new Map();
testMap.set("class", { low1: 1, high1: 3, low2: 5, high2: 7 });
testMap.set("row", { low1: 6, high1: 11, low2: 33, high2: 44 });
testMap.set("weat", { low1: 13, high1: 40, low2: 45, high2: 50 });
const testTickets = ["7,3,47", "40,4,50", "55,2,20", "38,6,12"];
//console.log("test", part1(testTickets, testMap));

const inspectedTickets = inspectTickets(nearbyTickets, ticketFields);
const validTickets = inspectedTickets.valids;

matchFields(validTickets, ticketFields, myTicket);
console.log(validTickets.filter((asdf) => +asdf.split(",")[0] === 12));
/*
console.log("--- Day 16 ---");
console.log(
  `Part 1: Sum of all of the invalid values (ticket scanning error rate) ${sumArray(
    inspectedTickets.errors
  )}`
);
console.log(`Part 2: `);
*/
