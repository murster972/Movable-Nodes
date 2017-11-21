var bg = {r: 89, g: 81, b: 161};

var edge_set, vertex_set;

function setup(){
    createCanvas(window.innerWidth - 250, window.innerHeight);

    edge_set = new EdgeSet();
    vertex_set = new VertexSet();

    vertex_set.addVertex(random(width), random(height));
    vertex_set.addVertex(random(width), random(height));

    edge_set.addEdge(vertex_set.vertices[0], vertex_set.vertices[1]);

    vertex_set.removeVertex(vertex_set.vertices[0])
}

function draw(){
    background(bg.r, bg.g, bg.b);
    background("#fff");

    if(changed_current_vertex) setVertexInfo(current_vertex);

    edge_set.update();

    for(var i = edge_set.edges.length - 1; i >= 0; i--){
        e = edge_set.edges[i];
        e.show();
    }

    for(var i = vertex_set.vertices.length - 1; i >= 0; i--){
        v = vertex_set.vertices[i];

        if(v.new){
            v.updatePos(v.pos.x, v.pos.y);
            v.new = false;
        }

        v.show();
    }

    vertex_set.addingVertex();
}
