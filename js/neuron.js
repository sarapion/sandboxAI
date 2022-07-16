class neuron{

  constructor(snap, x, y) {
    this.snap = snap;
    this.circle;
    this.x = 0;
    this.y = 0;
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

    this.circle = this.snap.circle(x, y, this.radius);
  }

  move(x,y){
    var dx = x - this.circle.getBBox().cx;
    var dy = y - this.circle.getBBox().cy;
    
    
    this.circle.attr({cx: this.circle.getBBox().cx - dx/6, cy: this.circle.getBBox().cy - dy/6});
  }

  display() {
  }
}
