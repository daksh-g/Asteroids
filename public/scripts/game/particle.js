class Particle {
    constructor(pos, rot, f, rate, length, start, end) {
        this.pos=pos;
        this.rot=rot;
        this.dir=p5.Vector.fromAngle(this.rot-HALF_PI);
        this.dir.mult(f);
        this.rate=rate;
		this.length=length;
        this.col=color(0, 0, 0);
        this.start=start;
        this.end=end;
        this.a=255;
    }
    render() {
        push();
        strokeWeight(10);
        stroke(this.col);
        translate(this.pos);
        rotate(this.rot);
        rect(-0.5, 0, 1, this.length);
        pop();
        this.pos.add(this.dir);
        this.col=lerpColor(this.start, this.end, this.a/255);
        this.col.setAlpha(this.a);
        this.a-=this.rate;
    }
}