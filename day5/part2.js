// @TODO - this works with example numbers, but not with the real numbers. Not sure if it's just slow or has a bug.
// Will complete other days and try to get back to this.
const fs = require('fs');
const readline = require('readline');

// const fileStream = fs.createReadStream('input.txt');
const fileStream = fs.createReadStream('example.txt');
const fileLines = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

//seeds: 79 14 55 13
let seedPairsArr = [79, 14, 55, 13];
// let seedPairsArr = [858905075, 56936593, 947763189, 267019426, 206349064, 252409474, 660226451, 92561087, 752930744, 24162055, 75704321, 63600948, 3866217991, 323477533, 3356941271, 54368890, 1755537789, 475537300, 1327269841, 427659734];
let seedPairsMap = new Map();

seedPairsArr.forEach((seed, index) => {
  if (index % 2 === 0) {
    seedPairsMap.set(seed, seedPairsArr[index + 1]);
  }
});

const isInRange = (address, rangeStart, range) => {
  return address >= rangeStart && address < rangeStart + range;
}

let lines = [];
let mapName = '';
fileLines.on('line', (input) => {
  if (input !== '') {
    if (input.includes(' map:')) {
      mapName = input.split(' ')[0];
      lines.push({
        name: mapName,
        instructionsArr: []
      });
    } else {
      lines.find((line) => line.name === mapName).instructionsArr.push(input);
    }
  }
});

fileLines.on('pause', () => {
  const sortedLines = lines.map((line) => {
    line.instructionsArr = line.instructionsArr.sort((a, b) => {
      const [aDestinationRangeStart, aSourceRangeStart, aRange] = a.split(' ');
      const [bDestinationRangeStart, bSourceRangeStart, bRange] = b.split(' ');

      return parseInt(aSourceRangeStart) - parseInt(bSourceRangeStart);
    })
    return line;
  });

  let smallest = 0;
  seedPairsMap.forEach((value, key) => {
    console.log('key: ', key);
    for (let i = 0; i <= value; i++) {
      const seed = key + i;
      let currentAddress = seed;

      sortedLines.forEach((line) => {
        const found = line.instructionsArr.find((instruction) => {
            const [
              destinationRangeStart,
              sourceRangeStart,
              range,
            ] = instruction.split(' ');

            return isInRange(currentAddress, parseInt(sourceRangeStart), parseInt(range));
        });

        if (found) {
          const [
            destinationRangeStart,
            sourceRangeStart,
            range,
          ] = found.split(' ');
          const add = (parseInt(currentAddress) - parseInt(sourceRangeStart)) + parseInt(destinationRangeStart);
          currentAddress = parseInt(add);
        } else {
          currentAddress = parseInt(currentAddress);
        }
      });

      if (currentAddress < smallest || smallest === 0) {
        smallest = currentAddress;
      }
    }
  });
  console.log('smallest: ', smallest);
});
