import { readLines } from "../util/files";
import { findLargest } from "../util/math";

// Seats in the airplane are arranged in 128 rows and 8 column
// Boarding pass has 10 letters ie. "FBFBBFFRLR"
// first 7 charachers will be either F for "front" or B for "back"
// last 3 characters will be either L for "left" or R for "right"
// Locate seat by binary space partitioning
// seatID = row * 8 + column
// "FBFBBFFRLR" should output row 44, column 5, seatID 357

interface Seat {
  row: number;
  column: number;
  seatID: number;
}

const findPosition = (max: number, str: string): number => {
  let boundary_low = 0;
  let boundary_high = max;
  let middle = boundary_high / 2;
  for (let i = 0; i < str.length; i++) {
    const current = str.charAt(i);
    if (current === "B" || current === "R") {
      boundary_high = boundary_high;
      boundary_low = Math.ceil(middle);
    } else if (current === "F" || current === "L") {
      boundary_high = Math.floor(middle);
      boundary_low = boundary_low;
    }
    middle = (boundary_high - boundary_low) / 2 + boundary_low;
  }
  return middle;
};

const calculateSeatID = (row: number, column: number): number => {
  return row * 8 + column;
};

const parseSeat = (seatString: string): Seat => {
  const rowString = seatString.slice(0, 7);
  const columnString = seatString.slice(7);
  const row = findPosition(127, rowString);
  const column = findPosition(7, columnString);
  return { row: row, column: column, seatID: calculateSeatID(row, column) };
};

const findLargestSeatId = (seatLines: string[]): number => {
  const seatIDs = seatLines.map((line) => parseSeat(line).seatID);
  return findLargest(seatIDs);
};

const findEmptySeat = (seatLines: string[]): number => {
  const seats = seatLines.map((line) => parseSeat(line));
  const sortedSeats = seats.sort((a, b) => a.seatID - b.seatID);
  return (
    sortedSeats.find(
      (seat, index) => seat.seatID - sortedSeats[index + 1].seatID !== -1
    ).seatID + 1
  );
};

const input = readLines("./day5/day5_input.txt");
console.log('--- Day 5 ---')
console.log(`Part 1 largest seatID: ${findLargestSeatId(input)}`); // Part 1: 896
console.log(`Part 2 empty seatID is: ${findEmptySeat(input)}`); // Part 2: 659
