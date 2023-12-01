const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('input.txt');
const lines = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let total = 0;
lines.on('line', (input) => {
  console.log(`Received: ${input}`);

  const numbers = input.replace(/\D/g, "");
  const numbersArr = numbers.split("");

  const firstDigitStr = numbersArr[0];
  const lastDigitStr = numbersArr[numbersArr.length - 1];

  const lineNumber = Number(firstDigitStr + lastDigitStr)
  total += lineNumber;

  console.log(numbers);
  // console.log(numbersArr);
  // console.log(firstDigitStr);
  // console.log(lastDigitStr);
  console.log(lineNumber);
});

lines.on('pause', () => {
  console.log('Total: ', total);
});
