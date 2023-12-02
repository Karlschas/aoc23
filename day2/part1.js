const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('input.txt');
const lines = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

// 12 red cubes, 13 green cubes, and 14 blue cubes
const cubeLimitation = {
  red: 12,
  green: 13,
  blue: 14,
};

let total = 0;
let gameNr = 1;
lines.on('line', (input) => {
  // console.log(`${input}`);
  const gameTitle = input.split(":")[0];
  const gameIterations = input.split(":")[1];
  const subIterations = gameIterations.split(";");
  let gamePossible = true;

  subIterations.forEach((subIteration) => {
    // console.log('-------------');
    const colorPulls = subIteration.split(",");
    colorPulls.forEach((colorPull) => {
      // console.log('pull: ', colorPull);
      const color = colorPull.split(" ")[2];
      const cubes = colorPull.split(" ")[1];

      if (cubes > cubeLimitation[color]) {
        gamePossible = false;
      }
    });
  });

  if (gamePossible) {
    console.log(`Game ${gameNr} possible`);
    total += gameNr;
  }

  gameNr += 1;
});

lines.on('pause', () => {
  console.log('Total: ', total);
});
