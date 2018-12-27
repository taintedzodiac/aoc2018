var input = require('fs').readFileSync('input01.txt').toString().split('\n');

var inputArray = [...input].map(n => parseInt(n));

// Part 1

console.log(inputArray.reduce((sum, n) => sum + n));

// Part 2

const frequencies = {};
let currentFrequency = 0;
let found = false;

function findFrequencies(inputs, currentFrequency) {
  for (let frequencyChange of inputs) {
    if (frequencies[currentFrequency]) {
      found = currentFrequency;
      break;
    }

    frequencies[currentFrequency] = true;

    currentFrequency += frequencyChange;
  }

  return currentFrequency;
}

while (!found) {
  currentFrequency = findFrequencies(inputArray, currentFrequency);
}

console.log(found);