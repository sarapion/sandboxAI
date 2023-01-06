class menu{

    constructor(ctx){
        this.ctx = ctx;
        this.neuron = new neuron(ctx, ctx.canvas.width*0.95, ctx.canvas.height*0.8);
        this.originalX = ctx.canvas.width*0.95;
        this.originalY = ctx.canvas.height*0.8;

        this.neuron.menuMember = true;
        objects.push(this.neuron);
    }


    refresh(){
        
        //Moving Neuron back to original position
        if(!this.neuron.hook){
            this.neuron.vx =  (this.originalX - this.neuron.x)/5;
            this.neuron.vy =  (this.originalY - this.neuron.y)/5;
        }

        this.neuron.stopMoving();

        //Whenever Neuron gets dragged far enough disconnect it from the menu and create new menu Neuron
        if(this.neuron.hook && (Math.sqrt((this.neuron.x-this.originalX)*(this.neuron.x-this.originalX)+(this.neuron.y-this.originalY)*(this.neuron.y-this.originalY)) > 100)){
            var nX = -(this.neuron.x - this.originalX)/100;
            var nY = -(this.neuron.y - this.originalY)/100;
            var newNeuron = new neuron(this.ctx, this.neuron.x+nX*this.neuron.radius, this.neuron.y+nY*this.neuron.radius);
            this.neuron.menuMember = false;
            this.neuron = newNeuron;
            this.neuron.menuMember = true;
            objects.push(newNeuron);
        }
    }

    resize(){

        //Updating positions on window resize
        this.originalX = ctx.canvas.width*0.95;
        this.originalY = ctx.canvas.height*0.8;
    }
}