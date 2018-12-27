const input = require('fs').readFileSync('input04.txt').toString().split('\n');

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

const findPartOne = () => {
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
  
  return sleepiestGuard * sleepiestMinute;
}

console.log(findPartOne());

// Part 2

const findPartTwo = () => {
  const sleepiestGuard = Object.keys(guardSleepTimes).reduce((guardToReturn, number) => {
    const recordForGuard = guardSleepTimes[number];
    currentGuard = Object.keys(recordForGuard).reduce((max, minute) => {
      if (recordForGuard[minute] > max.totalSlept) {
        max = { guard: number, minute: minute, totalSlept: recordForGuard[minute] };
      }

      return max;
    }, { guard: number, minute: null, totalSlept: 0 });
    
    if (currentGuard.totalSlept > guardToReturn.totalSlept) {
      guardToReturn = currentGuard;
    }

    return guardToReturn;
  }, { guard: null, minute: null, totalSlept: 0 });
  
  return sleepiestGuard.guard * sleepiestGuard.minute;
}

console.log(findPartTwo());