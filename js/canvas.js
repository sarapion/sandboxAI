var mouseX = 0;
var mouseY = 0;
var pmouseX = 0;
var pmouseY = 0;
var dmouseX = 0;
var dmouseY = 0;
var mousedown = false;
var hooked = null;
var objects = [];
var lines = [];
const dampening = 0.99;
var testMenu;

window.addEventListener("load", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    testMenu = new menu(ctx);
});

window.addEventListener("resize", () => {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
});

window.addEventListener('mousedown', (e) => {
    mousedown = true;
});

window.addEventListener('mouseup', (e) => {
    mousedown = false;
    for (let index = 0; index < objects.length; index++)
        objects[index].hook = false;
    hooked = null;
});

window.addEventListener('mousemove', (e) => {
    pmouseX = mouseX;
    pmouseY = mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
});

window.addEventListener("contextmenu", e => e.preventDefault());

$(document).keydown(function(event) {
    if (event.ctrlKey==true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  ) ) {
            event.preventDefault();
         }
    });

document.getElementById('canvas').addEventListener('wheel', event => {
    if (event.ctrlKey) {
        event.preventDefault()
    }
    }, true)
    
function hoveringC(object){
    if(mousedown && ((Math.hypot(object.x - mouseX, object.y - mouseY) <= object.radius+2) || object.hook))
        return true;
    return false
}

function canHook(neuron){
    for (let i = 0; i < objects.length; i++) {
        if((objects[i].hook === true) && (objects[i] !== neuron)){
            return false;
        }
    }
    return true;
}

document.body.onkeydown = function(e){
    if(e.keyCode == 32){
        for (let i = 0; i < objects.length; i++) {
            if(hoveringC(objects[i])){
                var n = new neuron(ctx, mouseX+objects[i].radius, mouseY+objects[i].radius);
                objects.push(n);
                return;
            }
        }
        var n = new neuron(ctx, mouseX, mouseY);
        objects.push(n);
    }
}

function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < objects.length; i++) {
        if(hooked === null) {
            if(objects[i].hook)
                hooked = i;
        }else if(objects[i].hook && (i !== hooked)){
            objects[i].hook = false;
        }
        objects[i].move(i);
        objects[i].draw();
        testMenu.refresh();
    }
    //console.log(hooked);
    requestAnimationFrame(update);
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");  

update();