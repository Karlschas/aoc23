const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream('input1.txt');
// const fileStream = fs.createReadStream('example1.txt');
const lines = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let total = 0;
let times = [];
let distances = [];
lines.on('line', (input) => {
  if (input.includes('Time:')) {
    const timesRaw = input.split(':')[1].trim().split(' ');
    times = timesRaw.filter((time) => time !== '');
  } else if (input.includes('Distance:')) {
    const distancesRaw = input.split(':')[1].trim().split(' ');
    distances = distancesRaw.filter((distance) => distance !== '');
  }
});

lines.on('pause', () => {
  console.log('Times: ', times);
  console.log('Distances: ', distances);

  let winningRunsPerRace = [];
  times.forEach((maxTime, index) => {
    const maxDistance = distances[index];
    const winningRuns = []

    // console.log('Time: ', maxTime, 'Distance: ', maxDistance);
    for (let holdTime = 0; holdTime <= maxTime; holdTime++) {
      const distance = holdTime * (maxTime - holdTime);
      // console.log('Hold time: ', holdTime, 'Distance: ', distance);
      if (distance > maxDistance) {
        winningRuns.push(holdTime);
      }
    }

    // console.log('Winning runs: ', winningRuns);
    winningRunsPerRace.push(winningRuns.length);
  });

  total = winningRunsPerRace.reduce((acc, cur) => acc * cur, 1);

  console.log('Total: ', total);
});
