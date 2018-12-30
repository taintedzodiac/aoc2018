const _ = require('lodash');

let input = require('fs').readFileSync('input07.txt').toString().split('\n');

const regexStep = new RegExp(/[A-Z](?= can)/g);
const regexPrereq = new RegExp(/[A-Z](?= must)/g);

const steps = {};

for (const line of input) {
    const [step, prereq] = [line.match(regexStep)[0], line.match(regexPrereq)[0]];

    if (!steps[step]) steps[step] = new Set();
    if (!steps[prereq]) steps[prereq] = new Set();

    steps[step].add(prereq);
}

const unblocked = Object.keys(_.pickBy(steps, (prereqs) => prereqs.size === 0));

for (const step of unblocked) delete steps[step];

const order = [];

while (unblocked.length) {      
    const step = unblocked.sort().shift();
    order.push(step);
    
    _.forOwn(steps, (prereqs, stepKey) => {
        prereqs.delete(step);
        if (prereqs.size === 0) {
            unblocked.push(stepKey);
            delete steps[stepKey];
        }
    });
}

console.log(order.join(''));