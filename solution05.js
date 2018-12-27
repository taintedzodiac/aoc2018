let polymer = require('fs').readFileSync('input05.txt').toString();

function reactPolymer(polymer) {
    const newPolymer = [];

    for (const char of polymer.split('')) {
        if (!newPolymer.length || (newPolymer[newPolymer.length-1].charCodeAt() ^ char.charCodeAt()) !== 32) {
            newPolymer.push(char);
        } else {
            newPolymer.pop();
        }
    }

    return newPolymer;
}

// Part 1
console.log(reactPolymer(polymer).length);

// Part 2
const alphabet = ("abcdefghijklmnopqrstuvwxyz").split("");

const counts = alphabet.map(letter => {
    const upper = letter.toUpperCase();
    const regex = new RegExp(`(${letter}|${upper})`, 'g');
    
    const trimmedPolymer = polymer.replace(regex, '');
    return reactPolymer(trimmedPolymer).length;
});

console.log(Math.min(...counts));