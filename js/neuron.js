class neuron{

  constructor(context, x, y) {
    this.ctx = context;
    this.circle;
    this.connection = [];
    this.connecting = false;
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
    this.vx = 0;
    this.vy = 0;
    this.vxConnection = 0;
    this.vyConnection = 0;
    this.ax = 0;
    this.ay = 0;
    this.hook = false;
    this.pushed = false;
    this.radius = 200;
    this.mass = this.radius;
    this.dist = 0;
    this.normVX = 0;
    this.normVY = 0;
    this.diffX = 0;
    this.diffY = 0;
    this.menuMember = false;

  }

  move(j){

    //Remove unfinished connection on right Mouse release
    if(this.connecting && !mousedownRight){
      this.connecting = false;
      lines.pop();
    }

    //Check if mouse is hovering above Object
    if(hoveringC(this) && mousedown && !mousedownRight){

      //Check if Object is already following cursor of not
      if(canHook(this)){
        //Attaching Object to Mouse 
        this.hook = true;
        document.body.style.cursor = 'grabbing';
      } 

      //Checking if hovering above Neuron and right Mouse is pressed
    } else if(hoveringC(this) && !mousedown && mousedownRight){
      var tempLine = searchOpenConnection();

      //No line is currently being connected -> create new line starting at current Neuron
      if(tempLine === null && !this.connecting){
        var line = new connection(this.ctx, this.x, this.y, this);
        line.connecting = true;
        lines.push(line);
        this.connecting = true;
        this.connection.push(line);

      //Line is currently being connected and that lines end is above this Neuron
      }else if(tempLine !== null && !this.connecting){
        if(tempLine.connecting){
          if(!this.alreadyConnected(tempLine.neuron, this)){
            tempLine.connecting = false;
            this.connection.push(tempLine);
            tempLine.neuron2 = this;
            tempLine.endX = this.x;
            tempLine.endY = this.y;
            tempLine.neuron.connecting = false;
            mousedownRight = false;
          }
        }
      }
    }


    //Executing Neuron static collision
    var collisionVector = [];
    for (let i = 0; i < objects.length; i++) {
      if(j === i) continue;
        if(!objects[i].menuMember){
      if(this.doOverlap(this.x, this.y, this.radius, objects[i].x, objects[i].y, objects[i].radius)){

          collisionVector.push([this, objects[i]]);

          let distance = Math.sqrt((this.x-objects[i].x)*(this.x-objects[i].x)+(this.y-objects[i].y)*(this.y-objects[i].y));
          let overlap = 0.5*(distance - this.radius - objects[i].radius);
          
          this.px = this.x;
          this.py = this.y;
          this.x = this.x - overlap*(this.x-objects[i].x)/distance;
          this.y = this.y - overlap*(this.y-objects[i].y)/distance;

          objects[i].x = objects[i].x + overlap*(this.x-objects[i].x)/distance;
          objects[i].y = objects[i].y + overlap*(this.y-objects[i].y)/distance;
        }
      }
    }

    //Calculating and executing Neuron collisions with connection edges (Many Bugs; Alot TODO)
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if(!this.menuMember && line.neuron !== this && line.neuron2 !== this){
        var LineX1 = line.endX - line.startX;
        var LineY1 = line.endY - line.startY;

        var LineX2 = this.x - line.startX;
        var LineY2 = this.y - line.startY;

        var Edgelength = LineX1 * LineX1 + LineY1 * LineY1;
        var t = Math.max(0, Math.min(Edgelength , LineX2 * LineX1 + LineY1 * LineY2))/Edgelength;

        var ClosestPointX = line.startX + t * LineX1;
        var ClosestPointY = line.startY + t * LineY1;

        var distanceLine = Math.sqrt((this.x-ClosestPointX)*(this.x-ClosestPointX)+(this.y-ClosestPointY)*(this.y-ClosestPointY));
        //var distanceLine = Math.sqrt((this.x+this.vx-ClosestPointX)*(this.x+this.vx-ClosestPointX)+(this.y+this.vy-ClosestPointY)*(this.y+this.vy-ClosestPointY));

        var lineLength = Math.sqrt((line.endX-line.startX)*(line.endX-line.startX)+(line.endY-line.startY)*(line.endY-line.startY));
        var distanceClosestToEnd = Math.sqrt((ClosestPointX-line.endX)*(ClosestPointX-line.endX)+(ClosestPointY-line.endY)*(ClosestPointY-line.endY));
        var distanceClosestToStart = Math.sqrt((ClosestPointX-line.startX)*(ClosestPointX-line.startX)+(ClosestPointY-line.startY)*(ClosestPointY-line.startY));

        var neuron2_factor = distanceClosestToStart/lineLength;
        var neuron1_factor = distanceClosestToEnd/lineLength;

        //console.log(distanceClosestToEnd, distanceClosestToStart, Math.sqrt((line.endX-line.startX)*(line.endX-line.startX)+(line.endY-line.startY)*(line.endY-line.startY)))
     

        var nxClose = (ClosestPointX - this.x)/distanceLine;
        var nyClose = (ClosestPointY - this.y)/distanceLine;

        if(distanceLine <= this.radius+5 && line.neuron !== this && line.neuron2 !== this && !line.neuron.connecting && this.hook){

            //this.x = this.x - nxClose*(this.radius-distanceLine);
            //this.y = this.y - nyClose*(this.radius-distanceLine);
            line.neuron.x = line.neuron.x + nxClose*(this.radius-distanceLine+5)*neuron1_factor;
            line.neuron.y = line.neuron.y + nyClose*(this.radius-distanceLine+5)*neuron1_factor;
            //line.neuron.vx = this.vx * -nxClose;
            //line.neuron.vy = this.vy * -nyClose;
            line.neuron2.x = line.neuron2.x + nxClose*(this.radius-distanceLine+5)*neuron2_factor;
            line.neuron2.y = line.neuron2.y + nyClose*(this.radius-distanceLine+5)*neuron2_factor;
            //line.neuron2.vx = this.vx * -nxClose;
            //line.neuron2.vy = this.vy * -nyClose;
            //line.startX = line.startX + nxClose*(this.radius-distanceLine+5);
            //line.startY = line.startY + nyClose*(this.radius-distanceLine+5);
            //ine.endX = line.endX + nxClose*(this.radius-distanceLine+5);
            //line.endY = line.endY + nyClose*(this.radius-distanceLine+5);
          
        }
      }
    }


    //Executing Neuron elastic collistion
    for (let i = 0; i < collisionVector.length; i++) {

      var b1 = collisionVector[i][0];
      var b2 = collisionVector[i][1];

      let distance = Math.sqrt((b1.x-b2.x)*(b1.x-b2.x)+(b1.y-b2.y)*(b1.y-b2.y));

      var nx = (b2.x-b1.x)/distance;
      var ny = (b2.y-b1.y)/distance;

      var tx = -ny;
      var ty = nx;
      
      var dpTan1 = b1.vx * tx + b1.vy * ty;
      var dpTan2 = b2.vx * tx + b2.vy * ty;

      var dpNorm1 = b1.vx * nx + b1.vy * ny;
      var dpNorm2 = b2.vx * nx + b2.vy * ny;

      var m1 = (dpNorm1 * (b1.mass-b2.mass) + 2 * b2.mass * dpNorm2) / (b1.mass + b2.mass);
      var m2 = (dpNorm2 * (b2.mass-b1.mass) + 2 * b1.mass * dpNorm1) / (b1.mass + b2.mass);

      b1.vx = tx * dpTan1 + nx * m1;
      b1.vy = ty * dpTan1 + ny * m1;
      b2.vx = tx * dpTan2 + nx * m2;
      b2.vy = ty * dpTan2 + ny * m2;
    }
    
    
    //Updating Neuron velocity when it's hooked by cursor
    if(this.hook){
      this.diffX = this.x - mouseX;
      this.diffY = this.y - mouseY;
      this.px = this.x;
      this.py = this.y;
      this.x = this.x - this.diffX/15;
      this.y = this.y - this.diffY/15;

      this.vx = this.x - this.px;
      this.vy = this.y - this.py;

      
    } else{    
      //Adding friction
      this.vx = this.vx  * dampening;
      this.vy = this.vy  * dampening;

      //Changing object position depending on its velocity and the push/pull from connections
      this.px = this.x;
      this.py = this.y;
      this.x = this.x + this.vx + this.vxConnection;
      this.y = this.y + this.vy + this.vyConnection;
    }

    this.stopMoving();


    //Making the Objects bounce off window edges and not fly out
    if(!this.hook){
      if(this.x - this.radius < 0){
        if((this.vxConnection >= 0) || (this.vx >= 0)){
          this.vx = Math.abs(this.vx);
          this.x = this.radius;
        }
        else{
          this.vx = 0;
          this.vxConnection = 0;
        }
      } 
      if(this.x + this.radius >= this.ctx.canvas.width){
        if(this.vxConnection <= 0 || this.vx <= 0){
          this.vx = Math.abs(this.vx) * -1;
          this.x = this.ctx.canvas.width-this.radius;
        }
        else{
          this.vx = 0;
          this.vxConnection = 0;
        }
      } 
      if(this.y - this.radius < 0) {
        if(this.vyConnection >= 0 || this.vy >= 0){
          this.vy = Math.abs(this.vy);
          this.y = this.radius;
        }
        else{
          this.vy = 0;
          this.vyConnection = 0;
        }
      }
      if(this.y + this.radius >= this.ctx.canvas.height){
        if(this.vyConnection <= 0 || this.vy <= 0){
          this.vy = Math.abs(this.vy) * -1;
          this.y = this.ctx.canvas.height-this.radius;
        }
        else{
          this.vy = 0;
          this.vyConnection = 0;
        }
      } 
    } else {
      if(this.x - this.radius < 0) {
        this.x = this.radius;
        this.vx = 0;
      }
      if(this.x + this.radius >= this.ctx.canvas.width) {
        this.x = this.ctx.canvas.width-this.radius;
        this.vx = 0;
      }
      if(this.y - this.radius < 0) {
        this.y = this.radius;
        this.vy = 0;
      }
      if(this.y + this.radius >= this.ctx.canvas.height) {
        this.y = this.ctx.canvas.height-this.radius;
        this.vy= 0;
      }
    }

    //Resetting connections force each iteration
    this.vxConnection = 0;
    this.vyConnection = 0;
  }





  collision(distance, ClosestPointX, ClosestPointY){
    return distanceLine <= this.radius+5
  }

  alreadyConnected(neuronA, neuronB){
    if(neuronA !== undefined)
      for (let i = 0; i < neuronA.connection.length; i++)
        if((neuronA.connection[i].neuron2 === neuronB) || (neuronA.connection[i].neuron === neuronB)) return true;
    return false;
  }

  doOverlap(x1, y1, r1, x2, y2, r2){
    return ((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)) <= (r1+r2)*(r1+r2);
  }

  stopMoving(){
    //Hard stop if velocity gets very low
    if(Math.abs(this.vx+this.vy) <= 0.01) {
      this.vx = 0;
      this.vy = 0;
    }

  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius-3, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.lineWidth=10;
    this.ctx.stroke();
    this.ctx.fill();

  }
}
