class neuron{

  constructor(context, x, y) {
    this.ctx = context;
    this.circle;
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
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

  collision(i){

  }

  move(x, y, dmouseX, dmouseY){

    this.dist = Math.hypot(this.x - x, this.y - y);
    if(mousedown && (this.dist <= this.radius+2) && !this.hook && (hooked === null)) {
      //console.log(hooked);
      this.hook = true;
    }

    this.px = this.x;
    this.py = this.y;
    

    if(this.hook){
      this.diffX = this.x - x;
      this.diffY = this.y - y;
      this.x = this.x - this.diffX/5;
      this.y = this.y - this.diffY/5;
      this.velocityX = this.x - this.px;
      this.velocityY = this.y - this.py;
    } else{
      this.x = this.x + this.velocityX;
      this.y = this.y + this.velocityY;
      
      this.velocityX = this.velocityX/dampening;
      this.velocityY = this.velocityY/dampening;
    }

    if(this.y - this.radius - 2 <= 0) this.velocityY = Math.abs(this.velocityY);
    if(this.y + this.radius + 2 > this.ctx.canvas.height) this.velocityY = Math.abs(this.velocityY) * -1;
    if(this.x - this.radius - 2 <= 0) this.velocityX = Math.abs(this.velocityX);
    if(this.x + this.radius + 2 > this.ctx.canvas.width) this.velocityX = Math.abs(this.velocityX) * -1;

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
