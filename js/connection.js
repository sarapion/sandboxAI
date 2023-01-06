class connection {

    constructor(context, x, y, neuron) {
      this.ctx = context;
      this.neuron = neuron;
      this.neuron2 = null;
      this.startX = neuron.x + neuron.radius;
      this.startY = neuron.y + neuron.radius;
      this.endX = x;
      this.endY = y;
      this.length = 90;
      this.setLength = this.length/2;
      this.connecting = false;
    }

    //Determining where to draw the end of the connection
    end(x, y){
      if(this.neuron2 === null){
        this.endX = x;
        this.endY = y;
      }else{
        this.endX = this.neuron2.x;
        this.endY = this.neuron2.y;
      }
    }

    //Updating the start and end positions of the connection
    move(x, y){

      //Calculating distance and force values between first Neuron and Cursor or between both connected Neurons 
      if(this.neuron2 === null){
        var dist = Math.sqrt((x-this.neuron.x)*(x-this.neuron.x)+(y-this.neuron.y)*(y-this.neuron.y));
        var nX = -(this.neuron.x - x)/dist;
        var nY = -(this.neuron.y - y)/dist;
      }else{
        var dist = Math.sqrt((this.neuron2.x-this.neuron.x)*(this.neuron2.x-this.neuron.x)+(this.neuron2.y-this.neuron.y)*(this.neuron2.y-this.neuron.y));

        var nX = -(this.neuron.x - this.neuron2.x)/dist;
        var nY = -(this.neuron.y - this.neuron2.y)/dist;
      }

      //Updating starting position based on calculated force vector
      this.startX = this.neuron.x + nX*(this.neuron.radius-10);
      this.startY = this.neuron.y + nY*(this.neuron.radius-10);

      //Transfer calculated force vectors onto connected neurons/objects
      if(!this.connecting){
        this.neuron.vxConnection =  this.neuron.vxConnection + (nX*(this.length - this.setLength)/4);
        this.neuron.vyConnection =  this.neuron.vyConnection + (nY*(this.length - this.setLength)/4);
        
        if(this.neuron2 !== null){
          this.neuron2.vxConnection = this.neuron2.vxConnection - (nX*(this.length - this.setLength)/4);
          this.neuron2.vyConnection = this.neuron2.vyConnection - (nY*(this.length - this.setLength)/4);
        }
      }
    }

    draw(){
      this.length = Math.hypot(this.endX - this.startX, this.endY - this.startY)/5;
      this.ctx.fillStyle = "black";
      //this.ctx.lineCap = "round";
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.end(mouseX, mouseY);
      this.ctx.lineTo(this.endX, this.endY);
      this.ctx.lineWidth=Math.min(Math.max(300/this.length, 1), 20);
      this.ctx.stroke();
    }

}