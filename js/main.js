let neurons = [];

function setup(){
  createCanvas(windowWidth,windowHeight);
}

function draw(){
  background(255,255,255);
  for (let i = 0; i < neurons.length; i++) {
    neurons[i].move();
    neurons[i].display();
  }
}

function mousePressed(){
  for (let i = 0; i < neurons.length; i++) {
    if(dist(neurons[i].x, neurons[i].y, mouseX, mouseY) < neurons[i].diameter){
      neurons[i].hook = true;
      break;
    }
  }
}

function mouseReleased(){
  for (let i = 0; i < neurons.length; i++) {
    neurons[i].hook = false;
  }
}

function keyPressed(){
  let n = new neuron();
  neurons.push(n);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

