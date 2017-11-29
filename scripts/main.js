var bg = {r: 89, g: 81, b: 161};

var edge_set, vertex_set;

function setup(){
    createCanvas(window.innerWidth - 250, window.innerHeight);

    edge_set = new EdgeSet();
    vertex_set = new VertexSet();

    vertex_set.addVertex(random(width), random(height));
    vertex_set.addVertex(random(width), random(height));
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

/* returns the inversed value of hex value */
function inverseHex(h){
    var hex = h.substr(1).toUpperCase();
    var inv_val = "#";

    var h_vals = {"A": 5, "B": 4, "C": 3, "D": 2, "E": 1, "F": 0};
    var inv_h_vals = ["F", "E", "D", "C", "B", "A", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0"];

    for(var i = 0; i < hex.length; i++){
        var h_i = hex.substr(i, 1);
        var ind = "ABCDEF".indexOf(h_i) == -1 ? parseInt(h_i) : h_vals[h_i];

        inv_val += inv_h_vals[ind];
    }

    return inv_val;
}
