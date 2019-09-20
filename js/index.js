const width = window.innerWidth;
const height = window.innerHeight;

let canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;

paper.setup(canvas);

let size = Math.min(width, height);

let polygon = new Polygon([
    {x: 0, y: 0},
    {x: size, y: 0},
    {x: size, y: size},
    {x: 0, y: size}
]);

let iterations = 3;
let current = [polygon];
let next = [];

for(let i = 0; i < iterations; i++) {
    current.forEach(polygon => {
        next = next.concat(polygon.subdivide());
    });
    current = next;
    next = [];
}

current.forEach((polygon, index) => {
    //let color = paper.Color.random();
    let path = new paper.Path(polygon.vertices);
    //path.strokeWidth = 1;
    if(index % 2 == 0) {
        path.fillColor = 'black';
    } else {
        path.fillColor = 'yellow';
    }
    //path.strokeColor = 'black';
    //path.fillColor = color;
    //path.closed = true;
});

paper.view.draw();