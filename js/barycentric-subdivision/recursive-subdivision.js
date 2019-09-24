export let recursiveSubdivision = function({polygons, iterations}) {
    let subdivisions = [];

    polygons.forEach(polygon => {
        subdivisions.push(...polygon.subdivide());
    });

    if(iterations <= 1) {
        return subdivisions;
    } else {
        return recursiveSubdivision({polygons: subdivisions, iterations: iterations - 1});
    }
}