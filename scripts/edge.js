
function EdgeSet(){
    this.edges = [];
    this.editing = false;;
    this.selected = [];

    this.update = function(){
        /* checks that every vertex being used still exists, and
           removes the edges associated with said vertex if not */
        for(var i = this.edges.length - 1; i >= 0; i--){
            var v1 = this.edges[i].v1;
            var v2 = this.edges[i].v2;

            if(vertex_set.findVertex(v1) == -1 || vertex_set.findVertex(v2) == -1){
                this.edges.splice(i, 1);
            }
        }
    }

    this.editSelected = function(action){
        if(this.selected.length == 1) this.selected.push(this.selected[0]);

        if(!this.selected) return -1;

        for(var i = 1; i < this.selected.length; i++){
            this.selected[i].highlight();

            if(action == "ADD") this.addEdge(this.selected[i - 1], this.selected[i]);
            else this.removeEdge(this.selected[i - 1], this.selected[i]);
        }

        this.selected[0].highlight();

        this.selected = [];
    }

    this.addEdge = function(v1, v2){
        var index = this.findEdge(v1, v2);

        if(index != -1){
            var e = this.edges[i];
            e.times += e.times < 3 ? 1 : 0;
        } else{
            this.edges.push(new Edge(v1, v2));
        }
    }

    this.removeEdge = function(v1, v2){
        //BUG: not working!!!!!
        var index = this.findEdge(v1, v2);

        if(index == -1) return -1;

        times = this.edges[i].times;

        if(times > 1){
            this.edges[i].times -= 1;
        } else{
            this.edges.splice(i, 1);e_remove
        }
    }

    this.findEdge = function(v1, v2){
        for(i = this.edges.length - 1; i >= 0; i--){
            if(this.edges[i].v1 == v1 && this.edges[i].v2 == v2) return i;
        }

        return -1;
    }
}

function Edge(v1, v2){
    //should be references of vertext pos so if vertext moves this moves
    this.v1 = v1;
    this.v2 = v2;
    this.pos1 = v1.pos;
    this.pos2 = v2.pos;

    //number of edges connecting the same two vertices
    this.times = 1;

    this.is_loop = this.pos1.equals(this.pos2) ? true : false

    this.show = function(){
        noFill()
        stroke(0);
        strokeWeight(4);

        if(this.is_loop){
            this.draw_loop();
        }
        else{
            this.draw_edge();
        }
    }

    this.draw_loop = function(){
        var r = this.v1.radius * 3;
        ellipse(this.pos1.x - r / 3, this.pos1.y - r / 3, r);

        if(this.times > 1){
            textSize(15);
            fill(255);
            stroke(0);
            text("x" + this.times, this.pos1.x - r / 2.5, this.pos1.y - r / 2.5);
        }
    }

    this.draw_edge = function(){
        mid = createVector((this.pos1.x + this.pos2.x) / 2, (this.pos1.y + this.pos2.y) / 2);

        line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);

        if(this.times > 1){
            textSize(15);
            fill(255);
            stroke(0);
            text("x" + this.times, mid.x, mid.y);
        }
    }
}
