const input = require('fs').readFileSync('04/input.txt').toString().split('\n');

const inputArray = [...input.sort()];

const regexGuardNumber = new RegExp(/#\d+/g);
const regexMinute = new RegExp(/\d{2}:\d{2}/g);

let guardNumber, startedSleeping;

const guardSleepTimes = {};

for (let input of inputArray) {
  const minute = input.match(regexMinute)[0].slice(-2);

  if (input.match(/begins shift/g)) {
    guardNumber = input.match(regexGuardNumber)[0].slice(1);
    if (!guardSleepTimes[guardNumber]) guardSleepTimes[guardNumber] = {};
  } else if (input.match(/falls asleep/g)) {
    startedSleeping = minute;
  } else if (input.match(/wakes up/g)) {
    for (i = startedSleeping; i < minute; i++) {
      if (!guardSleepTimes[guardNumber][i]) guardSleepTimes[guardNumber][i] = 0;
      guardSleepTimes[guardNumber][i] += 1;
    }
  }
}

// Part 1

const minutesSleptByGuard = Object.keys(guardSleepTimes).reduce((totalByGuard, number) => {
  totalByGuard[number] = Object.values(guardSleepTimes[number]).reduce((total, value) => total + value, 0);
  return totalByGuard;
}, {});

const maxSlept = Math.max(...Object.values(minutesSleptByGuard));

const sleepiestGuard = Object.keys(minutesSleptByGuard).find(number => {
  return minutesSleptByGuard[number] === maxSlept
});

const recordForGuard = guardSleepTimes[sleepiestGuard];

const sleepiestMinute = Object.keys(recordForGuard).reduce((max, minute) => {
  return recordForGuard[minute] > recordForGuard[max] ? minute : max;
})

console.log(sleepiestGuard * sleepiestMinute);
