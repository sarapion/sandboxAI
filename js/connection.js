class connection {

    constructor(context, x, y, neuron) {
      this.ctx = context;
      this.neuron = neuron;
      this.neuron2 = null;
      this.startX = neuron.x;
      this.startY = neuron.y;
      this.arrowScaleLength = 15;
      this.arrowScaleWidth = 0;
      this.endX = x;
      this.endY = y;
      this.nX = 0;
      this.nY = 0;
      this.dist = 0;
      this.setLength = 255;
      this.connecting = false;
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
        this.endX = this.neuron2.x-this.nX*(this.neuron2.radius+this.arrowScaleLength);
        this.endY = this.neuron2.y-this.nY*(this.neuron2.radius+this.arrowScaleLength);
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
      this.ctx.lineCap = "round";
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(this.endX, this.endY);
      this.ctx.lineWidth=Math.min(Math.max(600/this.dist, 5), 15);
      this.ctx.stroke();
      console.log(this.ctx.lineWidth);
      this.arrowScaleWidth = this.ctx.lineWidth+5;
      this.ctx.moveTo(this.endX+this.arrowScaleLength*this.nX, this.endY+this.arrowScaleLength*this.nY);
      this.ctx.lineTo(this.endX+this.arrowScaleWidth*this.nY, this.endY-this.arrowScaleWidth*this.nX);
      this.ctx.lineTo(this.endX-this.arrowScaleWidth*this.nY, this.endY+this.arrowScaleWidth*this.nX);
      this.ctx.lineTo(this.endX+this.arrowScaleLength*this.nX, this.endY+this.arrowScaleLength*this.nY);
      this.ctx.fill();
    }

     
}