const input = require('fs').readFileSync('input.txt').toString().split('\n');

const inputArray = [...input];

const regexOrigin = new RegExp(/(?!\s)\d+,\d+/g);
const regexSize = new RegExp(/(?!\s)\d+x\d+/g);

const coveredSquares = {};

function parseClaim(rawClaim) {
    const parsedClaim = {};

    const origin = rawClaim.match(regexOrigin)[0].split(',');
    parsedClaim.originX = parseInt(origin[0]);
    parsedClaim.originY = parseInt(origin[1]);

    const size = rawClaim.match(regexSize)[0].split('x');
    parsedClaim.sizeX = parseInt(size[0]);
    parsedClaim.sizeY = parseInt(size[1]);

    return parsedClaim;
}

function coverSquares(claim) {
    const claimedX = [...Array(claim.sizeX).keys()].map(i => i + claim.originX);
    const claimedY = [...Array(claim.sizeY).keys()].map(i => i + claim.originY);

    for (const x of claimedX) {
        for (const y of claimedY) {
            const key = `${x},${y}`;
            if (!coveredSquares[key]) coveredSquares[key] = 0;
            coveredSquares[key]++;
        }
    }
}

inputArray.forEach(claim => {
    const parsedClaim = parseClaim(claim);
    coverSquares(parsedClaim);
});

Object.keys(coveredSquares).forEach(key => {
  if (coveredSquares[key] < 2) delete coveredSquares[key];
});

console.log(Object.keys(coveredSquares).length);