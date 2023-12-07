const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('input.txt');
// const fileStream = fs.createReadStream('example.txt');
const fileLines = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

//seeds: 79 14 55 13
// let seeds = [79, 14, 55, 13];
let seeds = [858905075, 56936593, 947763189, 267019426, 206349064, 252409474, 660226451, 92561087, 752930744, 24162055, 75704321, 63600948, 3866217991, 323477533, 3356941271, 54368890, 1755537789, 475537300, 1327269841, 427659734];
let finalAddressMap = new Map();
let passMap = new Map();

seeds.map((seed) => {
  finalAddressMap.set(seed, seed);
  passMap.set(seed, false);
});

const isInRange = (address, rangeStart, range) => {
  return address >= rangeStart && address < rangeStart + range;
}

let currentAddress;
fileLines.on('line', (input) => {
  seeds.map((seed) => {
    if (input !== '' && !input.includes(' map:')) {
      const [
        destinationRangeStart,
        sourceRangeStart,
        range,
      ] = input.split(' ');
      currentAddress = parseInt(finalAddressMap.get(seed));

      if (
        isInRange(
          currentAddress,
          parseInt(sourceRangeStart),
          parseInt(range)) &&
          passMap.get(seed) === false
      ) {
        const add = (parseInt(currentAddress) - parseInt(sourceRangeStart)) + parseInt(destinationRangeStart);
        currentAddress = parseInt(add);
        passMap.set(seed, true);
      } else {
        currentAddress = parseInt(currentAddress);
      }

      finalAddressMap.set(seed, currentAddress);
    } else if (input.includes(' map:')) {
      passMap.set(seed, false);
    }
  })
});

fileLines.on('pause', () => {
  console.log('Total: ', finalAddressMap);
  const valuesArray = Array.from(finalAddressMap.values())
  const sorted = valuesArray.sort((a, b) => a - b);
  console.log('sorted: ', sorted);
});
