class connection {

    constructor(context, x, y, neuron) {
      this.ctx = context;
      this.neuron = neuron;
      this.neuron2 = null;
      this.startX = neuron.x;
      this.startY = neuron.y;
      this.endX = x;
      this.endY = y;
      this.nX = 0;
      this.nY = 0;
      this.dist = 0;
      this.setLength = 255;
      this.connecting = false;
    }

    //Determining where to draw the end of the connection
    newStartEnd(x, y){
    }

    //Updating the start and end positions of the connection
    move(x, y){


      //Calculating distance and force values between first Neuron and Cursor or between both connected Neurons 
      if(this.neuron2 === null){
        this.dist = Math.sqrt((x-this.neuron.x)*(x-this.neuron.x)+(y-this.neuron.y)*(y-this.neuron.y));
        this.nX = -(this.neuron.x - x)/this.dist;
        this.nY = -(this.neuron.y - y)/this.dist;
      }else{
        this.dist = Math.sqrt((this.neuron2.x-this.neuron.x)*(this.neuron2.x-this.neuron.x)+(this.neuron2.y-this.neuron.y)*(this.neuron2.y-this.neuron.y));
        this.nX = -(this.neuron.x - this.neuron2.x)/this.dist;
        this.nY = -(this.neuron.y - this.neuron2.y)/this.dist;
      }

      //Updating starting position based on calculated force vector
      this.startX = this.neuron.x + this.nX*(this.neuron.radius-10);
      this.startY = this.neuron.y + this.nY*(this.neuron.radius-10);

      if(this.neuron2 === null){
        this.endX = x;
        this.endY = y;
      }else{
        this.endX = this.neuron2.x-this.nX*20;
        this.endY = this.neuron2.y-this.nY*20;
      }

      //Transfer calculated force vectors onto connected neurons/objects
      if(!this.connecting){
        this.neuron.vxConnection =  this.neuron.vxConnection + (this.nX*(this.dist - this.setLength)/10);
        this.neuron.vyConnection =  this.neuron.vyConnection + (this.nY*(this.dist - this.setLength)/10);
        
        if(this.neuron2 !== null){
          this.neuron2.vxConnection = this.neuron2.vxConnection - (this.nX*(this.dist - this.setLength)/10);
          this.neuron2.vyConnection = this.neuron2.vyConnection - (this.nY*(this.dist - this.setLength)/10);
        }
      }
    }
    
    draw(){
      //this.newStartEnd(mouseX, mouseY);
      this.ctx.fillStyle = "black";
      //this.ctx.lineCap = "round";
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(this.endX, this.endY);
      this.ctx.lineWidth=Math.min(Math.max(600/this.dist, 1), 20);
      this.ctx.stroke();
      var scale = 30;
      var tempx = this.endX-scale*this.nX;
      var tempy = this.endY-scale*this.nY;
      this.ctx.moveTo(tempx, tempy);
      this.ctx.lineTo(tempx+scale/3*this.nY, tempy-scale/3*this.nX);
      this.ctx.lineTo(this.endX+scale/10*this.nX, this.endY+scale/10*this.nY);
      this.ctx.fill();
    }

}