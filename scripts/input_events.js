var clicked_v = null;

function mousePressed(){
    clicked_v = null;

    if(mouseX < 0) return 0;

    if(vertex_set.adding && isDoubleClick(mouseX, mouseY)){
        vertex_set.new_pos.start = createVector(mouseX, mouseY);
        vertex_set.new_pos.end = createVector(mouseX, mouseY);
    }

    else{
        for(var i = 0; i < vertex_set.vertices.length; i++){
            if(vertex_set.vertices[i].clicked(mouseX, mouseY)){
                clicked_v = vertex_set.vertices[i];
                break;
            }
        }
    }
}

function mouseDragged(){
    if(mouseX < 0) return 0;

    if(clicked_v){
        clicked_v.updatePos(mouseX, mouseY);
    } else if(vertex_set.adding){

        vertex_set.new_pos.end = createVector(mouseX, mouseY);

        var r = sqrt(sq(vertex_set.new_pos.start.x - mouseX) + sq(vertex_set.new_pos.start.y - mouseY));
        vertex_set.new_radius = r > vertex_set.min_radius ? r : vertex_set.min_radius;
    }
}

function mouseReleased(){
    if(mouseX < 0) return 0;

    if(vertex_set.new_pos.start.z == 0){
        vertex_set.addVertex(vertex_set.new_pos.start.x, vertex_set.new_pos.start.y, vertex_set.new_radius);
    }

    vertex_set.new_pos.start = createVector(1, 1, 1);
    vertex_set.new_radius = 10;
}

function mouseClicked(){
    var x = mouseX;
    var y = mouseY;

    var v = clicked_vertex(x, y);

    if(v){
        current_vertex = v;
        changed_current_vertex = 1;
    }

    if(edge_set.editing && isDoubleClick(x, y)){
        c_vertex = clicked_vertex(x, y);

        if(c_vertex){
            if(c_vertex.highlighted){
                c_vertex.highlight();
                var i = edge_set.selected.indexOf(c_vertex);

                edge_set.selected.splice(i, 1);
            } else{
                c_vertex.highlight();
                edge_set.selected.push(c_vertex);
            }
        }
    }
}

function clicked_vertex(x, y){
    for(var i = vertex_set.vertices.length - 1; i >= 0; i--){
        if(vertex_set.vertices[i].clicked(x, y)){
            return vertex_set.vertices[i];
        }
    }
}
