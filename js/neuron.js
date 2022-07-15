class neuron{

  constructor(context, x, y) {
    this.x = x;
    this.y = y;
    this.context = context;
    this.hook = false;
    this.pushed = false;
    this.velocityX = 0.0;
    this.velocityY = 0.0;
    this.diameter = 50;
    this.diffLength = 0;
    this.normVX = 0;
    this.normVY = 0;
    this.diffX = 0;
    this.diffY = 0;
  }

  move() {
    
  }

  display() {
    this.context.beginPath();
    this.context.lineWidth = 5;
    this.context.arc(this.x, this.y, this.diameter, 0, Math.PI * 2);
    this.context.stroke();
    this.context.closePath();
  }
}
