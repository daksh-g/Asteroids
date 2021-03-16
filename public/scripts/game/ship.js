class Ship {
    constructor() {
        this.pos=createVector(width/2, height/2);
        this.r=15;
        this.rot=0;
        this.rotChange=0;
        this.dir=createVector(0, 1);
        this.force=0.01;
        this.thrust=0;
    }
    render() {
        this.dir=p5.Vector.fromAngle(this.rot+HALF_PI);
        this.dir.mult(this.force);
        this.pos.add(this.dir);
        this.rot+=this.rotChange;
        this.force+=this.thrust;
        this.force*=0.96;
        push();
        translate(this.pos);
        rotate(this.rot);
        triangle(0, this.r, this.r, -this.r, -this.r, -this.r);
        pop();
        if(this.pos.x>width||this.pos.x<0)
            this.pos.x=constrain(width-this.pos.x, 0, width);
        else if(this.pos.y>height||this.pos.y<0)
            this.pos.y=constrain(height-this.pos.y, 0, height);
    }
}