class Polygon {
    constructor(vertices) {
        this.vertices = vertices;
    }

    get centroid() {
        let centroid = {x: 0, y: 0};

        this.vertices.forEach(vertex => {
            centroid.x += vertex.x;
            centroid.y += vertex.y;
        });
        centroid.x /= this.vertices.length;
        centroid.y /= this.vertices.length;

        return centroid;
    }

    get edges() {
        let edges = [];

        let length = this.vertices.length;
        for(let index = 0; index < length; index++) {
            edges.push({
                from: this.vertices[index], 
                to: this.vertices[(index + 1) % length]
            });
        }

        return edges;
    }

    subdivide() {
        let subdivisions = [];
        
        this.edges.forEach(edge => {
            let midPoint = {x: (edge.from.x + edge.to.x) / 2, y: (edge.from.y + edge.to.y) / 2};
            
            subdivisions.push(new Polygon([edge.from, midPoint, this.centroid]));
            subdivisions.push(new Polygon([midPoint, edge.to, this.centroid]));
        });

        return subdivisions;
    }
}