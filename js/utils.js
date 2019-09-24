export let regularPolygon = function({center, radius, sides}) {
    let vertices = [];
    let angle = 2 * Math.PI / sides;
    
    for (let i = 0; i < sides; i++) {
        vertices.push({
            x: center.x + radius * Math.cos(i * angle), 
            y: center.y + radius * Math.sin(i * angle)
        });
    }

    return vertices;
}