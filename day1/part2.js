const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('input.txt');
// const fileStream = fs.createReadStream('specialCases.txt');
const lines = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

const strDigits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const conflicts = [
  {"oneight": "18"},
  {"twone": "21"},
  {"threeight": "38"},
  {"fiveight": "58"},
  {"eightwo": "82"},
  {"eighthree": "83"},
  {"nineight": "98"},
];

const parseNumbers = (str) => {
  conflicts.forEach((conflict) => {
    const key = Object.keys(conflict)[0];
    const value = Object.values(conflict)[0];

    if (str.includes(key)) {
      str = str.replaceAll(key, value);
    }
  });

  strDigits.forEach((strDigit, index) => {
    if (str.includes(strDigit)) {
      str = str.replaceAll(strDigit, index + 1);
    }
  });

  return str.replace(/\D/g, "");
}

let total = 0;
lines.on('line', (input) => {
  console.log(`Received: ${input}`);

  const numbersArr = parseNumbers(input);

  // console.log('after parse ', numbersArr);

  const firstDigitStr = numbersArr[0];
  const lastDigitStr = numbersArr[numbersArr.length - 1];

  const lineNumber = Number(firstDigitStr + lastDigitStr)
  total += lineNumber;

  // console.log(numbers);
  // console.log(numbersArr);
  // console.log(firstDigitStr);
  // console.log(lastDigitStr);
  // console.log(lineNumber);
  console.log(firstDigitStr, lastDigitStr);
});

lines.on('pause', () => {
  console.log('Total: ', total);
});
