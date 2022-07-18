class neuron{

  constructor(context, x, y) {
    this.ctx = context;
    this.circle;
    this.x = x;
    this.y = y;
    this.hook = false;
    this.pushed = false;
    this.velocityX = 0.0;
    this.velocityY = 0.0;
    this.radius = 20;
    this.diffLength = 0;
    this.normVX = 0;
    this.normVY = 0;
    this.diffX = 0;
    this.diffY = 0;

  }

  move(x, y, mousedown){
  }

  draw() {
    this.ctx.fillStyle = "blue";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }
}
