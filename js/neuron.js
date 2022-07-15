class neuron{

  constructor(snap, e, x, y) {
    this.x = x;
    this.y = y;
    this.event = e;
    this.snap = snap;
    this.circle;
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

    this.circle = this.snap.circle(this.x, this.y, this.radius);
    this.circle.drag(move);

    var move = function() {
      var dx = this.x - e.clientX;
      var dy = this.y - e.clientY;

      this.x = this.x + dx;
      this.y = this.y + dy;
    }
  }

  

  display() {
  }
}
