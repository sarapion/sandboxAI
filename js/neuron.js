class neuron{

  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.hook = false;
    this.pushed = false;
    this.velocityX = 0.0;
    this.velocityY = 0.0;
    this.diameter = 30;
    this.diffLength = 0;
    this.normVX = 0;
    this.normVY = 0;
    this.diffX = 0;
    this.diffY = 0;
  }

  move() {
    if(this.velocityX === 0  &&  this.velocityY === 0){
      this.pushed = false;
    }

    if(this.hook){
      this.pushed = false;
      let dX = mouseX - this.x;
      let dY = mouseY - this.y;
      this.x = this.x + dX/6;
      this.y = this.y + dY/6;
      this.velocityX = -(pmouseX-mouseX);
      this.velocityY = -(pmouseY-mouseY);
    }

    if(!mouseIsPressed){
      this.x = this.x + (pmouseX-mouseX)/350;
      this.y = this.y + (pmouseY-mouseY)/350;
    }

    if(index !== null && !this.hook){
      if(dist(this.x, this.y, neurons[index].x, neurons[index].y)
            <= (this.diameter+neurons[index].diameter)/2){
        if((neurons[index].velocityX !== 0) || (neurons[index].velocityY !== 0)){
          //this.velocityX = 1.5*neurons[index].velocityX;
          //this.velocityY = 1.5*neurons[index].velocityY;
          this.diffX = neurons[index].x - this.x;
          this.diffY = neurons[index].y - this.y;
          this.diffLength = dist(this.x, this.y, neurons[index].x, neurons[index].y);
          this.normVX = this.diffX / this.diffLength;
          this.normVY = this.diffY / this.diffLength;
          this.diffLength =Math.sqrt(Math.abs(neurons[index].velocityX)^2+Math.abs(neurons[index].velocityY)^2)/5;
          this.velocityX = this.normVX * (this.diffLength);
          this.velocityY = this.normVY * (this.diffLength);
          this.pushed = true;
        }
      }
    }

    if((this.y+this.diameter/2) >= windowHeight){
      if(this.pushed) {
        this.velocityY = Math.abs(this.velocityY);
      }
    }else if((this.y-this.diameter/2) < 0){
      if(this.pushed) {
        this.velocityY =  Math.abs(this.velocityY) * -1;
      }
    }
    if(this.x+this.diameter/2 >= windowWidth) {
      if (this.pushed) {
        this.velocityX =  Math.abs(this.velocityX);
      }
    }else if(this.x-this.diameter/2 < 0) {
      if (this.pushed) {
        this.velocityX = Math.abs(this.velocityX) * -1;
      }
    }

    if(this.pushed){
      //console.log(this.velocityY);
      this.x = this.x - this.velocityX * deltaTime;
      this.y = this.y - this.velocityY * deltaTime;

      this.velocityX = this.velocityX / dampening;
      this.velocityY = this.velocityY / dampening;
    }
  }

  display() {
    noFill();
    strokeWeight(6);
    stroke(51);
    ellipse(this.x , this.y, this.diameter, this.diameter);
  }
}
