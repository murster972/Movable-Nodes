var changed_current_vertex = 0;
var current_vertex;

$(document).ready(function(){
    $("#add_v").on("click", function(){
        if(vertex_set.adding){
            vertex_set.adding = false;
            $(this).removeClass("active");
        } else{
            $("#modify_e").removeClass("active");
            edge_set.editing = false;

            vertex_set.adding = true;
            $(this).addClass("active");
        }
    })

    $("#modify_e #title").on("click", function(){
        if($("#modify_e").hasClass("active")){
            $("#modify_e").removeClass("active");
            edge_set.editing = false;
        } else{
            vertex_set.adding = false;
            $("#add_v").removeClass("active");

            $("#modify_e").addClass("active");
            edge_set.editing = true;
        }
    })

    $("#e_add").on("click", function(){
        edge_set.editSelected("ADD");
    })

    $("#e_remove").on("click", function(){
        edge_set.editSelected("REMOVE");
    })

    $("#c_picker").on("input", function(){
        var v = $("#c_picker").val();
        $("#c_picker_label").val(v);
        $("#c_square").css("background-color", v);

        current_vertex.hex = v;
    })

    $("#v_radius").on("change", function(){
        var v = document.getElementById("v_radius");
        if(v.checkValidity()) current_vertex.radius = v.value;
    })

    $("#remove_vertex").on("click", function(){
        vertex_set.removeVertex(current_vertex);
    })
})

function setVertexInfo(v){
    changed_current_vertex = 0;

    if(!v) return -1;

    $("#v_pos").text("x: " + v.pos.x.toFixed(3) + ", y: " + v.pos.y.toFixed(3));

    $("#v_label").val(v.text);

    $("#v_radius").val(v.radius);

    var hex_c = rgbaToHex(v.bg.r, v.bg.g, v.bg.b);

    if(current_vertex.hex) hex_c = current_vertex.hex;

    $("#c_picker").val(hex_c);
    $("#c_square").css("background", hex_c);

    $("#c_picker_label").val(hex_c);
}

function rgbaToHex(r, g, b){
    var bin = "";

    bin += padd(r.toString(2), 8);
    bin += padd(g.toString(2), 8);
    bin += padd(b.toString(2), 8);

    var h = "";
    var h_chars = ["a", "b", "c", "d", "e", "f"];

    for(var i = 0; i <= bin.length - 4; i += 4){
        var tmp = parseInt(bin.substr(i, 4), 2);
        h += tmp < 10 ? tmp.toString() : h_chars[tmp % 10];
    }

    return "#" + h;
}

function padd(b, l){
    var new_b = "";

    for(var i = 0; i < l - b.length; i++) new_b += "0";

    return new_b + b;
}
