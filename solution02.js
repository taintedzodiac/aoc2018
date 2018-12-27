var input = require('fs').readFileSync('input02.txt').toString().split('\n');

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

let commonLetters = null;

for (let code1 of inputArray) {
  for (let code2 of inputArray.slice(inputArray.indexOf(code1))) {
    const chars1 = [...code1];
    const chars2 = [...code2];

    const matches = chars1.filter((c, i) => c === chars2[i]);
    if (matches.length === code1.length - 1) {
      commonLetters = matches.join('');
    }
  }

  if (commonLetters !== null) break;
}

console.log(commonLetters);