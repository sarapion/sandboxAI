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
   //this.circle.drag();
  }

  move(x, y, mousedown){
    var hover = (Math.sqrt(Math.pow(x - this.circle.getBBox().cx, 2) + Math.pow(y - this.circle.getBBox().cy, 2)) <= this.radius);
    //console.log(hover);
    //var hover = (Math.sqrt(Math.pow(x - this.circle.getBBox().cx, 2) + Math.pow(y - this.circle.getBBox().cy, 2)) <= this.radius);
    //console.log(hover);
    if(mousedown && (hover || this.hook || (this.diffX + this.diffY) !== 0)){
      this.hook = true;
      this.diffX  = (x - this.circle.getBBox().cx) / 5;
      this.diffY = (y - this.circle.getBBox().cy) / 5;
      console.log("test");
      this.circle.attr({cx: this.circle.getBBox().cx + this.diffX, cy: this.circle.getBBox().cy + this.diffY});
    }
  }

  display() {
  }
}
