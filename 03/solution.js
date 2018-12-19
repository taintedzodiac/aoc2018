const input = require('fs').readFileSync('input.txt').toString().split('\n');

const inputArray = [...input];

const regexClaimNumber = new RegExp(/(?!^#)\d+/g);
const regexOrigin = new RegExp(/(?!\s)\d+,\d+/g);
const regexSize = new RegExp(/(?!\s)\d+x\d+/g);

const coveredSquares = {};

function parseClaim(rawClaim) {
    const parsedClaim = {};

    parsedClaim.number = parseInt(rawClaim.match(regexClaimNumber)[0]);

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
            if (!coveredSquares[key]) coveredSquares[key] = [];
            coveredSquares[key].push(claim.number);
        }
    }
}

inputArray.forEach(claim => {
    const parsedClaim = parseClaim(claim);
    coverSquares(parsedClaim);
});

const claimsBySquare = [];

Object.keys(coveredSquares).forEach(key => {
  claimsBySquare.push(coveredSquares[key]);
});

const multipleClaims = claimsBySquare.filter(claim => claim.length > 1);

// Part 1

console.log(multipleClaims.length);

// Part 2

let claimsWithoutOverlap = inputArray.map((claim, i) => i + 1);

for (const claims of multipleClaims) {
    claimsWithoutOverlap = claimsWithoutOverlap.filter(claim => !claims.includes(claim));
}

console.log(...claimsWithoutOverlap);

