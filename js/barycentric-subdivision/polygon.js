/**
 * Used to represent an arbitrary convex polygon.
 */
export class Polygon {
    constructor({vertices}) {
        this.vertices = vertices;
    }

    /**
     * https://en.wikipedia.org/wiki/Centroid
     * The centroid of a plane figure is the arithmetic mean position of all the points in the figure.
     */
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

    /**
     * https://en.wikipedia.org/wiki/Edge_(geometry)
     * An edge is a particular type of line segment joining two consecutive vertices in a polygon.
     */
    get edges() {
        let edges = [];

        let length = this.vertices.length;
        for(let index = 0; index < length; index++) {
            edges.push({
                from: this.vertices[index], 
                to: this.vertices[(index + 1) % length],
                get midpoint() {
                    return {
                        x: (this.from.x + this.to.x) / 2,
                        y: (this.from.y + this.to.y) / 2
                    }
                }
            });
        }

        return edges;
    }

    /**
     * https://en.wikipedia.org/wiki/Barycentric_subdivision
     * A polygon with n edges will be subdivided into 2 * n triangles.
     */
    subdivide() {
        let subdivisions = [];
        
        this.edges.forEach(edge => {
            subdivisions.push(new Polygon({vertices: [edge.from, edge.midpoint, this.centroid]}));
            subdivisions.push(new Polygon({vertices: [edge.midpoint, edge.to, this.centroid]}));
        });

        return subdivisions;
    }
}