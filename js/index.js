import { Polygon } from './barycentric-subdivision/polygon.js';
import { recursiveSubdivision } from './barycentric-subdivision/recursive-subdivision.js';
import { regularPolygon } from './utils.js';

const width = window.innerWidth;
const height = window.innerHeight;

let canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;

paper.setup(canvas);

let size = (Math.min(width, height) / 2) * 0.9;

let polygon = new Polygon({
    vertices: regularPolygon({center: paper.project.view.center, radius: size, sides: 3})
});

let subdivisions = recursiveSubdivision({polygons: [polygon], iterations: 3});


subdivisions.forEach((polygon, index) => {
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