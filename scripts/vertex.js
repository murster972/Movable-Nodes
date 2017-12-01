function VertexSet(){
    this.vertices = [];
    this.adding = false;
    this.new_pos = {start: createVector(1, 1, 1), end: createVector(1)};
    this.min_radius = 15;
    this.new_radius = this.min_radius;

    this.addVertex = function(x, y, r){
        this.vertices.push(new Vertex(x, y, r, this.min_radius));
    }

    this.removeVertex = function(v){
        var index = this.findVertex(v);

        if(index == -1) return -1;

        this.vertices.splice(index, 1);
    }

    this.findVertex = function(v){
        for(var i = this.vertices.length - 1; i >= 0; i--){
            if(this.vertices[i] == v) return i;
        }

        return -1;
    }

    this.addingVertex = function(){
        if(this.adding && this.new_pos.start.z == 0){
            strokeWeight(4);
            stroke(0);

            noFill();

            strokeWeight(10);
            point(this.new_pos.start.x, this.new_pos.start.y);

            strokeWeight(4);
            line(this.new_pos.start.x, this.new_pos.start.y, this.new_pos.end.x, this.new_pos.end.y);
            ellipse(this.new_pos.start.x, this.new_pos.start.y, this.new_radius * 2);
        }
    }
}

function Vertex(x, y, radius, min_r){
    this.pos = createVector(x, y);
    this.bg = {r: 255, g: 255, b: 255, a: 255};
    this.hex = "";
    this.outline = {r: 0, g: 0, b: 0, a: 255};
    this.radius = radius || min_r;
    this.label = "";
    this.highlighted = false;
    this.new = true;

    this.show = function(){
        var d = this.radius * 2;

        stroke(this.outline.r, this.outline.g, this.outline.b, this.outline.a);
        strokeWeight(d);
        point(this.pos.x, this.pos.y);

        //show vertex
        fill(this.bg.r, this.bg.g, this.bg.b, this.bg.a);
        if(this.hex) fill(this.hex);
        strokeWeight(1);
        ellipse(this.pos.x, this.pos.y, d - d / 5);

        //font colour set to opposit of bg to ensure it always show
        var fg = this.hex ? inverseHex(this.hex) : "#000000";
        noStroke();
        fill(fg);

        textSize(this.radius);

        //ensures text more than one char is centered, y doesnt change as height stays
        //the same regardless of length
        var d = this.label ? 3.5 / this.label.length : 1;
        text(this.label, this.pos.x - this.radius / d, this.pos.y + this.radius / 3.5);
    }

    this.clicked = function(x, y){
        //calculate if vertext(radius 5) and mouseClick(radius 1) intersect
        //if so verttext has been clicked
        var d = sqrt(sq(this.pos.x - x) + sq(this.pos.y - y));

        return !(d > this.radius + 1);
    }

    this.highlight = function(){
        if(this.highlighted){
            this.outline = {r: 0, g: 0, b: 0, a: 255};
            this.highlighted = false;
        }
        else{
            this.outline = {r: 255, g: 0, b: 0, a: 255};
            this.highlighted = true;
        }
    }

    this.updatePos = function(x, y){
        if(x < 0 + this.radius) this.pos.x = 0 + this.radius;
        else if(x > width - this.radius) this.pos.x = width - this.radius;
        else this.pos.x = x;

        if(y < 0 + this.radius) this.pos.y = 0 + this.radius;
        else if(y > height - this.radius) this.pos.y = height - this.radius;
        else this.pos.y = y;
    }
}
