const fs = require('fs');
const readline = require('readline');

// const fileStream = fs.createReadStream('input.txt');
const fileStream = fs.createReadStream('example.txt');
const lines = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let total = 0;
lines.on('line', (input) => {
  console.log('Input: ', input);

});

lines.on('pause', () => {

  console.log('Total: ', total);
});
