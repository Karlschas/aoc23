const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('input.txt');
const lines = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let total = 0;
lines.on('line', (input) => {
  // console.log(`${input}`);
  let lineTotal = 0;
  const cardNumbers = input.split(':')[1];
  const [winningNumbers, drawnNumbers] = cardNumbers.split('|');
  const winningNumbersArray = winningNumbers.split(' ').filter((x) => x !== '');
  const drawnNumbersArray = drawnNumbers.split(' ').filter((x) => x !== '');

  // console.log('winningNumbers: ', winningNumbersArray);
  // console.log('drawn: ', drawnNumbersArray);

  drawnNumbersArray.forEach((number) => {
    if (winningNumbersArray.includes(number)) {
      if (lineTotal === 0) {
        lineTotal = 1;
      } else {
        lineTotal *= 2;
      }
    }
  });

  total += lineTotal;
});

lines.on('pause', () => {
  console.log('Total: ', total);
});
