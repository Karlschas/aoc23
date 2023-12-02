const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('input.txt');
const lines = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let total = 0;
let gameNr = 1;
lines.on('line', (input) => {
  console.log(`${input}`);
  const gameIterations = input.split(":")[1];
  const subIterations = gameIterations.split(";");

  let minimumCubes = {
    red: 1,
    green: 1,
    blue: 1,
  };

  subIterations.forEach((subIteration) => {
    // console.log('-------------');
    const colorPulls = subIteration.split(",");
    colorPulls.forEach((colorPull) => {
      // console.log('pull: ', colorPull);
      const color = colorPull.split(" ")[2];
      const cubes = Number(colorPull.split(" ")[1]);

      if (cubes > minimumCubes[color]) {
        minimumCubes[color] = cubes;
      }
    });
  });

  console.log('Minimum cubes: ', minimumCubes);
  total += minimumCubes.blue * minimumCubes.green * minimumCubes.red;
  console.log('Power: ', minimumCubes.blue * minimumCubes.green * minimumCubes.red);
  console.log('Total: ', total);
  gameNr += 1;
});

lines.on('pause', () => {
  console.log('Total: ', total);
});
