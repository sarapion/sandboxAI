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
const dampening = 0.95;
var testMenu;

//This is called on tab load once
window.addEventListener("load", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    document.body.style.overflow = 'hidden';

    testMenu = new menu(ctx);
});

//Tracking window size
window.addEventListener("resize", () => {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        testMenu.resize();
});


//Eventlisteners
window.addEventListener('mousemove', setPosition);
window.addEventListener('touchstart', setPosition);
document.addEventListener('touchmove', setPosition);


//Tracking mouse clocks
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


//Saving mouse realeses
window.addEventListener('mouseup', (e) => {
    for (let index = 0; index < objects.length; index++)
        objects[index].hook = false;
        document.body.style.cursor = 'default';
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


function setPosition(e){
    if (e.type == "touchstart" || e.type == "mousedown") {
        mousedown = true;
      }
      if (e.type == "touchstart" || e.type == "touchmove") {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      } else {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }
}

//Preventing Context Menu popup on mouse right click


//Checking if Mouse is Hovering Object or not (for circular Objects only)
function hoveringC(object){
    if(((Math.hypot(object.x - mouseX, object.y - mouseY) <= object.radius+2) || object.hook))
        return true;
    return false
}


//Checking if Object is already hooked to mouse or not 
function canHook(object){
    for (let i = 0; i < objects.length; i++) {
        if((objects[i].hook === true) && (objects[i] !== object)){
            return false;
        }
    }
    return true;
}

//(Temporary) Creating Neuron Object on SPACE Keypress
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

//Search for a connection with one open end
function searchOpenConnection(){
    for (let i = 0; i < lines.length; i++) {
        if(lines[i].connecting)
            return lines[i];
    }
    return null;
}

//Update functions gets called 60 times a second (Only if current tab is open)
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

//Initializing canvas and calling update function
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");  
ctx.translate(0.5, 0.5);
//setInterval(update, 1);

update();