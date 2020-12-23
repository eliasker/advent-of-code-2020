import { deck1, deck2 } from "./day22_input";

const testdeck1 = [9, 2, 6, 3, 1];
const testdeck2 = [5, 8, 4, 7, 10];

const calculateScore = (deck: number[]): number => {
  let score = 0;
  let multiplier = deck.length;
  deck.forEach((card) => {
    score += (card * multiplier);
    multiplier--;
  });
  return score;
}

const playGame = (deck1: number[], deck2: number[]): number => {
  let rounds = 0;
  while (rounds < 100) {
    if (deck1.length === 0 || deck2.length === 0) break;
    const card1 = deck1.shift();
    const card2 = deck2.shift();
    if (card1 > card2) {
      deck1.push(card1);
      deck1.push(card2);
    } else if (card1 < card2) {
      deck2.push(card2);
      deck2.push(card1);
    } else {
      deck1.push(card1);
      deck2.push(card2);
    }
    console.log(deck1, deck2)
    rounds++;
  }
  const winningDeck = deck1.length === 0 ? deck2 : deck1;
  return calculateScore(winningDeck);
  console.log("game over, rounds:", rounds, "deck1: ", deck1, "deck2", deck2);
}


console.log("--- Day 22 ---");
console.log(
  `Part 1: Winning player's score: ${playGame(deck1, deck2)}`
);
console.log(
  `Part 2: `
);
