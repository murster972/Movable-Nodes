/* Custom double click function as doubleClicked from p5.js
   is not registering double clicks */

 var time_frame = 500;

 var first_click = false;
 var timeout = false;
 var cur_pos = null;
 var prev_pos;

//NOTE: if two events are using Double click, it ma not return true
//      untill the third or fourth click, e.g. if edges and vertex adding
//      were on at the same time

function isDoubleClick(x, y){
    if(!first_click){
        first_click = true;
        timeout = false;

        cur_pos = createVector(x, y);

        timer();
    }
    else{
        first_click = false;

        cur_pos = cur_pos || createVector(0, 0, 1);
        prev_pos = cur_pos.copy();
        cur_pos = null;

        if(!timeout && createVector(x, y).equals(prev_pos)){
            return true;
        }
    }
}

function timer(){
    setTimeout(function(){
        timeout = true;
        first_click = false;
    }, time_frame);
}
