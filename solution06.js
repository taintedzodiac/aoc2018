const _ = require('lodash');

let input = require('fs').readFileSync('input06.txt').toString().split('\n');

const points = input.map((line, index) => {
    point = line.split(', ');

    return {
        index,
        x: parseInt(point[0]),
        y: parseInt(point[1]),
        inner: true,
        closest: 0
    }
});

const maxX = Math.max(...points.map(point => point.x));
const minX = Math.min(...points.map(point => point.x));
const maxY = Math.max(...points.map(point => point.y));
const minY = Math.min(...points.map(point => point.y));

for (const point of points) {
    if (_.includes([minX, maxX], point.x) || _.includes([minY, maxY], point.y)) point.inner = false;
}

const calculateDistance = (coords1, coords2) => {
    return Math.abs(coords1[0] - coords2[0]) + Math.abs(coords1[1] - coords2[1]);
};

let assignClosest = (x, y) => {
    const closestPoint = points.reduce((closest, point) => {
        const distance = calculateDistance([point.x, point.y], [x,y]);
        if (closest.distance === distance) {
            return { pointIndex: null, distance: distance }
        } else if (closest.distance > distance) {
            return { pointIndex: point.index, distance: distance };
        } else {
            return closest;
        }
    }, { pointIndex: -1, distance: Infinity });

    if (closestPoint.pointIndex !== null) points[closestPoint.pointIndex].closest++;
};

const calculateRegion = (x, y) => {
    return points.reduce((size, point) => {
        return size + calculateDistance([point.x, point.y], [x, y]);
    }, 0);
};

let totalRegionSize = 0;

for (const x of _.range(minX,maxX)) {
    for (const y of _.range(minY,maxY)) {
        assignClosest(x, y);
        if (calculateRegion(x,y) < 10000) totalRegionSize++;
    }
}

const mostCentralTotal = points.reduce((size, point) => {
    if (!point.inner) return size;
    return Math.max(size, point.closest);
}, 0)

console.log(mostCentralTotal); // Part 1

console.log(totalRegionSize); // Part 2