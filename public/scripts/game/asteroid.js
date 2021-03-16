class Asteroid {
    constructor(pos, r) {
        this.r=random(25, 75);
        if(r) this.r=r;
        this.pos=(random()<0.5?createVector(random(-50, 50), random(height)):createVector(random(width), random(-50, 50)));
        if(pos) this.pos=pos;
        this.cornerCount=floor(random(5, 15));
        this.rot=0;
        this.rotChange=random(-0.1, 0.1);
        this.dir=p5.Vector.random2D();
        this.dir.mult(random(7));
        this.offsets=[];
        for(let i=0;i<this.cornerCount;i++) this.offsets[i]=random(-15, 15)*this.r/75;
    }
    render() {
        push();
        noFill();
        stroke(255);
        strokeWeight(2);
        translate(this.pos);
        rotate(this.rot);
        this.pos.add(this.dir)
        beginShape();
        for(let i=0;i<this.cornerCount;i++) {
            let theta=map(i, 0, this.cornerCount, 0, TWO_PI);
            vertex((this.r+this.offsets[i])*cos(theta), (this.r+this.offsets[i])*sin(theta));
        }
        endShape(CLOSE);
        pop();
        this.rot+=this.rotChange;
        if(this.pos.x>width||this.pos.x<0)
            this.pos.x=constrain(width-this.pos.x, 0, width);
        else if(this.pos.y>height||this.pos.y<0)
            this.pos.y=constrain(height-this.pos.y, 0, height);
    }
}