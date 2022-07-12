class neuron{

  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.hook = false;
    this.pushed = false;
    this.velocityX = 0;
    this.velocityY = 0;
    this.diameter = 100;
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
      let vX = mouseX - this.x;
      let vY = mouseY - this.y;

     //if(vX > 1)
      // vX = vX * (1 - 1 / vX);
    //  if(vY > 1)
     //  vY = vY * (1 - 1 / vY);

     this.x = this.x + vX/6;
     this.y = this.y + vY/6;
     //this.velocityX = (this.tempVX >= 0) ? Math.max(-(mouseX-pmouseX)/deltaTime, 1) : Math.max(-(mouseX-pmouseX)/deltaTime, -1);
     //this.velocityY = (this.tempVY >= 0) ? Math.max(-(mouseY-pmouseY)/deltaTime, 1) : Math.max(-(mouseY-pmouseY)/deltaTime, -1);
     this.velocityX = -(pmouseX-mouseX);
     this.velocityY = -(pmouseY-mouseY);
    }

    if(index !== null && !this.hook){
      if(dist(this.x, this.y, neurons[index].x, neurons[index].y)
            <= (this.diameter+neurons[index].diameter)/2){
        //this.velocityX = 1.5*neurons[index].velocityX;
        //this.velocityY = 1.5*neurons[index].velocityY;
        this.diffX = neurons[index].x - this.x;
        this.diffY = neurons[index].y - this.y;
        this.diffLength = dist(this.x, this.y, neurons[index].x, neurons[index].y);
        this.normVX = this.diffX / this.diffLength;
        this.normVY = this.diffY / this.diffLength;
        this.diffLength =Math.sqrt(Math.abs(neurons[index].velocityX)^2+Math.abs(neurons[index].velocityY)^2)/5;
        if((neurons[index].velocityX > 0) || (neurons[index].velocityY > 0)){
          this.velocityX = this.normVX * this.diffLength;
          this.velocityY = this.normVY * this.diffLength ;
        }else{
          this.velocityX = 0.5;
          this.velocityY = 0.5;
        }
        this.pushed = true;
      }
    }

    if((this.y+this.diameter/2 >= windowHeight) || (this.y-this.diameter/2 < 0)){
        this.velocityY = this.velocityY * -1.2;
    }
    if((this.x+this.diameter/2 >= windowWidth) || (this.x-this.diameter/2 < 0)){
        this.velocityX = this.velocityX * -1.2;
    }
    if(this.pushed){
      this.x = this.x - this.velocityX * deltaTime;
      this.y = this.y - this.velocityY * deltaTime;

      this.velocityX = this.velocityX / dampening;
      this.velocityY = this.velocityY / dampening;
    }
  }

  display() {
    fill(0,0,0);
    ellipse(this.x , this.y, this.diameter, this.diameter);
  }
}
