var mouseX = 0;
var mouseY = 0;
var mousedown = false;
var hooked = null;
var objects = [];

window.addEventListener("resize", () => {
    if(window.innerHeight >= ctx.canvas.height)
        ctx.canvas.height = window.innerHeight;
    if(window.innerWidth >= ctx.canvas.width)
        ctx.canvas.width = window.innerWidth;
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
    if(hooked !== null)
        objects[hooked].hook = false;
    hooked = null;
});

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

$(document).keydown(function(event) {
    if (event.ctrlKey==true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  ) ) {
            event.preventDefault();
         }
    });

document.getElementById('root').addEventListener('wheel', event => {
    if (event.ctrlKey) {
        event.preventDefault()
    }
    }, true)
    

function update(){
    ctx.clearRect(0, 0, ctx.canvas.height, ctx.canvas.width);
    for (let i = 0; i < objects.length; i++) {
        if(hooked === null) {
            if(objects[i].hooked)
                hooked = i;
        }
        objects[i].draw();
    }
    requestAnimationFrame(update);
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");  
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

update();