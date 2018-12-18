var input = require('fs').readFileSync('input.txt').toString().split('\n');

var inputArray = [...input];

const counts = { twos: 0, threes: 0 };

// Part 1

for (input of inputArray) {
  const chars = [...input];
  const charCounts = {};

  for (char of chars) {
    if (!(char in charCounts)) charCounts[char] = 0;
    charCounts[char] += 1;
  }

  if (Object.values(charCounts).indexOf(2) > -1) counts.twos++;
  if (Object.values(charCounts).indexOf(3) > -1) counts.threes++;
}

console.log(counts.twos * counts.threes);

// Part 2

