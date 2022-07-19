var mouseX = 0;
var mouseY = 0;
var pmouseX = 0;
var pmouseY = 0;
var dmouseX = 0;
var dmouseY = 0;
var mousedown = false;
var hooked = null;
var objects = [];
const dampening = 1;
const elapsedTime = 1000/60;

window.addEventListener("load", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});

window.addEventListener("resize", () => {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
});

window.addEventListener('keydown', (e) => {
    var n = new neuron(ctx, mouseX, mouseY);
    objects.push(n);
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
    

function canHook(neuron){
    for (let i = 0; i < objects.length; i++) {
        if((objects[i].hook === true) && (objects[i] !== neuron)){
            return false;
        }
    }
    return true;
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
    }
    requestAnimationFrame(update);
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");  

update();