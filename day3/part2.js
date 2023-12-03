const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('input.txt');
const fileLines = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

// 140 x 140
let lines = [];
let total = 0;

const numbersReg = /[0-9]{1,3}/g;
const symbolsReg = /[*]/g;
let numbersMap = [];

fileLines.on('line', (input) => {
  lines.push(input);

  while (null != (number = numbersReg.exec(input))) {
    numbersMap.push({
      line: parseInt(lines.length) - 1,
      start: parseInt(number.index),
      end: parseInt(number.index) + parseInt(number[0].length - 1),
      value: parseInt(number[0]),
    });
  }
});

fileLines.on('pause', () => {
  // console.log(numbersMap);
  lines.forEach((line, index, linesArray) => {
    while (null != (symbol = symbolsReg.exec(line))) {
      let adjacentNumbers = [];
      //check left
      if (symbol.index - 1 >= 0) {
        const leftChar = line[symbol.index - 1];
        if (leftChar !== '.') {
          numbersMap.forEach((number) => {
            if (
              number.line === index &&
              number.end === symbol.index - 1
            ) {
              // console.log('found LEFT number', number, symbol[0], symbol.input);
              adjacentNumbers.push(number);
            }
          });
        }
      }

      //check right
      if (symbol.index + 1 <= line.length) {
        const rightChar = line[symbol.index + 1];
        if (rightChar !== '.') {
          numbersMap.forEach((number) => {
            if (
              number.line === index &&
              number.start === symbol.index + 1
            ) {
              // console.log('found RIGHT number', number, symbol[0], symbol.input);
              adjacentNumbers.push(number);
            }
          });
        }
      }

      // //check top
      if (index - 1 >= 0) {
        const topChar = linesArray[index - 1][symbol.index];
        if (topChar !== '.') {
          numbersMap.forEach((number) => {
            if (
              number.line === index - 1 &&
              number.start <= symbol.index &&
              number.end >= symbol.index
            ) {
              // console.log('found TOP number', number, symbol[0], symbol.input);
              adjacentNumbers.push(number);
            }
          });
        }
      }

      // //check bottom
      if (index + 1 <= linesArray.length) {
        const bottomChar = linesArray[index + 1][symbol.index];
        if (bottomChar !== '.') {
          numbersMap.forEach((number) => {
            if (
              number.line === index + 1 &&
              number.start <= symbol.index &&
              number.end >= symbol.index
            ) {
              // console.log('found BOTTOM number', number, symbol[0], symbol.input);
              adjacentNumbers.push(number);
            }
          });
        }
      }

      // //check top left
      if (index - 1 >= 0 && symbol.index - 1 >= 0) {
        const topLeftChar = linesArray[index - 1][symbol.index - 1];
        if (topLeftChar !== '.') {
          numbersMap.forEach((number) => {
            if (
              number.line === index - 1 &&
              number.start <= symbol.index - 1 &&
              number.end >= symbol.index - 1
            ) {
              // console.log('found TOP LEFT number', number, symbol[0], symbol.input);
              adjacentNumbers.push(number);
            }
          });
        }
      }

      // //check top right
      if (index - 1 >= 0 && symbol.index + 1 <= line.length) {
        const topRightChar = linesArray[index - 1][symbol.index + 1];
        if (topRightChar !== '.') {
          numbersMap.forEach((number) => {
            if (
              number.line === index - 1 &&
              //@TODO check this
              number.start <= symbol.index + 1 &&
              number.end >= symbol.index + 1
            ) {
              // console.log('found TOP RIGHT number', number, symbol[0], symbol.input);
              adjacentNumbers.push(number);
            }
          });
        }
      }

      // //check bottom left
      if (index + 1 <= linesArray.length && symbol.index - 1 >= 0) {
        const bottomLeftChar = linesArray[index + 1][symbol.index - 1];
        if (bottomLeftChar !== '.') {
          numbersMap.forEach((number) => {
            if (
              number.line === index + 1 &&
              number.start <= symbol.index - 1 &&
              number.end >= symbol.index - 1
            ) {
              // console.log('found BOTTOM LEFT number', number, symbol[0], symbol.input);
              adjacentNumbers.push(number);
            }
          });
        }
      }

      // //check bottom right
      if (index + 1 <= linesArray.length && symbol.index + 1 <= line.length) {
        const bottomRightChar = linesArray[index + 1][symbol.index + 1];
        if (bottomRightChar !== '.') {
          numbersMap.forEach((number) => {
            if (
              number.line === index + 1 &&
              number.start <= symbol.index + 1 &&
              number.end >= symbol.index + 1
            ) {
              // console.log('found BOTTOM RIGHT number', number, symbol[0], symbol.input);
              adjacentNumbers.push(number);
            }
          });
        }
      }

      console.log('adjacentNumbers BEFORE', adjacentNumbers);

      const filteredAdjacentNumbers = adjacentNumbers.filter((num, index, self) =>
        index === self.findIndex((t) => (
          t.value === num.value && t.line === num.line && t.start === num.start
      )));

      console.log('adjacentNumbers AFTER', filteredAdjacentNumbers);

      if (filteredAdjacentNumbers.length === 2) {
        total += filteredAdjacentNumbers[0].value * filteredAdjacentNumbers[1].value;
      }
    }
  });

  console.log(total);
});