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

const playRound = (deck1: number[], deck2: number[]) => {
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
}

const playGame = (deck1: number[], deck2: number[]): number => {
  let rounds = 0;
  while (rounds < 100) {
    if (deck1.length === 0 || deck2.length === 0) break;
    playRound(deck1, deck2)
    rounds++;
  }
  const winningDeck = deck1.length === 0 ? deck2 : deck1;
  return calculateScore(winningDeck);
}

// Before dealing top card --> check repetition in game state
// If state has been played before player 1 wins instantly
// Otherwise draw top card
// If drawn cards value === number of cards left in deck for both players
//  --> winner is determined by playing a sub-game
//      copy number of cards equal to the drawn cards value
// else determine winner by value of card
const playRecursive =
  (deck1: number[], deck2: number[], p2: boolean): { p1_wins: boolean, deck: number[] } => {
    let previousRounds = new Set();
    while (true) {
      if (deck1.length === 0 || deck2.length === 0) break;
      const state = deck1.join(",") + "             " + deck2.join(",");
      if (previousRounds.has(state)) {
        return { p1_wins: true, deck: deck1 }
      }
      previousRounds.add(state);
      const card1 = deck1.shift();
      const card2 = deck2.shift();
      let p1_wins = false;
      if (deck1.length >= card1 && deck2.length >= card2) {
        const newDeck1 = deck1.slice(0, card1);
        const newDeck2 = deck2.slice(0, card2);
        p1_wins = playRecursive(newDeck1, newDeck2, p2).p1_wins;
      } else {
        p1_wins = card1 > card2;
      } if (p1_wins) {
        deck1.push(card1);
        deck1.push(card2);
      } else {
        deck2.push(card2);
        deck2.push(card1);
      }
    }
    return deck1.length > deck2.length ? { p1_wins: true, deck: deck1 } : { p1_wins: false, deck: deck2 }
  }

console.log("--- Day 22 ---");
console.log(
  `Part 1: Winning player's score: ${playGame(Array.from(deck1), Array.from(deck2))}`
);
const winningDeck = playRecursive(Array.from(deck1), Array.from(deck2), true);
console.log(
  `Part 2: ${calculateScore(winningDeck.deck)}`
);
