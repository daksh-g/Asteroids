class Laser {
    constructor(pos, dir) {
        this.pos=pos;
        this.dir=dir;
        this.dir.normalize();
        this.dir.mult(30);
    }
    render() {
        push();
        strokeWeight(5);
        fill(255);
        this.pos.add(this.dir);
        point(this.pos);
        pop();
    }
}