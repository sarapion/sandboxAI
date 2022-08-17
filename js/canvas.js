var mouseX = 0;
var mouseY = 0;
var pmouseX = 0;
var pmouseY = 0;
var dmouseX = 0;
var dmouseY = 0;
var mousedown = false;
var mousedownRight = false;
var hooked = null;
var connecting = null;
var objects = [];
var lines = [];
var refreshIntervalId = null;
const dampening = 0.89;
var testMenu;

window.addEventListener("load", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    document.body.style.overflow = 'hidden';

    testMenu = new menu(ctx);
});

window.addEventListener("resize", () => {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
});

window.addEventListener('mousedown', (e) => {
    switch (e.button) {
        case 0:
            mousedown = true;
            break;
        case 1:
            break;
        case 2:
            mousedownRight = true;
            connecting = lines.length -1;
            break;
        default:
            alert('You have a strange Mouse!');
    }
});

window.addEventListener('mouseup', (e) => {
    for (let index = 0; index < objects.length; index++)
        objects[index].hook = false;
    hooked = null;
    connecting = null;
    switch (e.button) {
        case 0:
            mousedown = false;
            break;
        case 1:
            break;
        case 2:
            mousedownRight = false;
            break;
        default:
            alert('You have a strange Mouse!');
    }
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
    if(((Math.hypot(object.x - mouseX, object.y - mouseY) <= object.radius+2) || object.hook))
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

function searchOpenConnection(){
    for (let i = 0; i < lines.length; i++) {
        if(lines[i].connecting)
            return lines[i];
    }
    return null;
}

function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < objects.length; i++) {
        objects[i].move(i);
    }
    for (let i = 0; i < lines.length; i++) {
        lines[i].move(mouseX, mouseY);
        lines[i].draw();
    }
    for (let i = 0; i < objects.length; i++) {
        if(hooked === null) {
            if(objects[i].hook)
                hooked = i;
        }else if(objects[i].hook && (i !== hooked)){
            objects[i].hook = false;
        }
        
        objects[i].draw();
        testMenu.refresh();
    }
    requestAnimationFrame(update);
}

/*window.addEventListener('visibilitychange', (e) => {
    if(refreshIntervalId === null){
        console.log("setInterval", refreshIntervalId);
        refreshIntervalId = setInterval(update, 250);
    }
    else{
        console.log("clearInterval", refreshIntervalId);
        clearInterval(refreshIntervalId);
        refreshIntervalId = null;
    }
 });*/

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");  
ctx.translate(0.5, 0.5);
//setInterval(update, 16);

update();