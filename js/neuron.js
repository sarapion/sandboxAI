class neuron{

  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.hook = false;
    this.diameter = 100;
  }

  move() {
   if(this.hook){
     let vX = mouseX - this.x;
     let vY = mouseY - this.y;

     //if(vX > 1)
      // vX = vX * (1 - 1 / vX);
    //  if(vY > 1)
     //  vY = vY * (1 - 1 / vY);

     this.x = this.x + vX/4;
     this.y = this.y + vY/4;
   }
  }

  display() {
    fill(0,0,0);
    ellipse(this.x , this.y, this.diameter, this.diameter);
  }
}
