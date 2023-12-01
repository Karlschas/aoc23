const fs = require('fs');
const readline = require('readline');

// const fileStream = fs.createReadStream('input.txt');
const fileStream = fs.createReadStream('specialCases2.txt');
const lines = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

const strDigits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

//deightwoeighteight5
//djdeightwoeightc2six6nine
//9bhxxzseventhreesglvvpjmc83eight9eightwomd


const stringDigitToNumber = (str) => {
  let replacedStr = str;
  // console.log('str ', str);
  strDigits.forEach((strDigit, index) => {
    // console.log('strDigit ', strDigit);
    // console.log('before ', str);
    // console.log('after ', replacedStr);

    if (str.includes(strDigit) && replacedStr.includes(strDigit)) {
      console.log('found ', str, replacedStr, strDigit);
      replacedStr = replacedStr.replaceAll(strDigit, index + 1);
      replacedStr = replacedStr.replace("eigh2", '82');
    } else if (str.includes(strDigit) && !replacedStr.includes(strDigit)) {
      console.log('not found ', str, replacedStr, strDigit);
      if (strDigit === "two") {
        replacedStr = replacedStr.replace("tw", index + 1);
      }
      if (strDigit === "eight") {
        replacedStr = replacedStr.replace("eigh", index + 1);
        replacedStr = replacedStr.replace("ight", index + 1);
      }
      // console.log('after ', replacedStr);
    }
  });

  console.log('fin ', replacedStr);
  return replacedStr;
}

let total = 0;
lines.on('line', (input) => {
  // console.log(`Received: ${input}`);

  const replacedInput = stringDigitToNumber(input);

  // console.log(`Replaced: ${replacedInput}`);

  const numbers = replacedInput.replace(/\D/g, "");
  const numbersArr = numbers.split("");

  const firstDigitStr = numbersArr[0];
  const lastDigitStr = numbersArr[numbersArr.length - 1];

  const lineNumber = Number(firstDigitStr + lastDigitStr)
  total += lineNumber;

  // console.log(numbers);
  // console.log(numbersArr);
  // console.log(firstDigitStr);
  // console.log(lastDigitStr);
  // console.log(lineNumber);
});

lines.on('pause', () => {
  console.log('Total: ', total);
});
