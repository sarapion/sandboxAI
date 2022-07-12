let neurons = [];
let index = null;
let dampening = 1.03 ;

function setup(){
  createCanvas(windowWidth,windowHeight);
}

function draw(){
  background(255,255,255);
  for (let i = 0; i < neurons.length; i++) {
    neurons[i].display();
    neurons[i].move();
  }
}

function mousePressed(){
  for (let i = 0; i < neurons.length; i++) {
    if(dist(neurons[i].x, neurons[i].y, mouseX, mouseY) < neurons[i].diameter/2){
      neurons[i].hook = true;
      index = i;
      break;
    }
  }
}

function mouseReleased(){
  for (let i = 0; i < neurons.length; i++) {
    neurons[i].hook = false;
    index = null;
  }
}

function keyPressed(){
  let n = new neuron();
  neurons.push(n);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

