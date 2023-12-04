const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('input.txt');
// const fileStream = fs.createReadStream('scratch.txt');
const fileLines = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let total = 0;
let cards = [];
let cardsCount = [];

fileLines.on('line', (input) => {
  cards.push(input);
  cardsCount.push(1);
});

fileLines.on('pause', () => {
  for (let i = 0; i < cards.length; i++) {
    // console.log('line ', i, ': ', cards[i]);
    const [winningNumbers, drawnNumbers] = cards[i].split('|');
    const winningNumbersArray = winningNumbers.split(' ').filter((x) => x !== '');
    const drawnNumbersArray = drawnNumbers.split(' ').filter((x) => x !== '');

    const matches = winningNumbersArray.filter((n) => drawnNumbersArray.includes(n));

    if (matches.length > 0) {
      for (let j = 1; j <= matches.length; j++) {
        if (cardsCount[i + j]) {
          cardsCount[i + j] += cardsCount[i];
        }
      }
    }
  };

  total = cardsCount.reduce((a, b) => a + b, 0);

  console.log('Total: ', total);
});
