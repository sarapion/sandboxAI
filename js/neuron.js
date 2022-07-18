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
    this.dist = 0;
    this.normVX = 0;
    this.normVY = 0;
    this.diffX = 0;
    this.diffY = 0;

  }

  move(x, y, dmouseX, dmouseY){

    if(mousedown && (this.dist <= this.radius+2) && !this.hook && (hooked === null)) {
      this.hook = true;
    }

    if(this.hook){
      this.dist = Math.hypot(this.x - x, this.y - y);
      this.diffX = this.x - x;
      this.diffY = this.y - y;
      this.x = this.x - this.diffX/5;
      this.y = this.y - this.diffY/5;
    } else{
      
    }

  }

  draw() {
    this.ctx.fillStyle = "black";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.lineWidth=5;
    this.ctx.stroke();
  }
}
