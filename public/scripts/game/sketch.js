{

let ship;
let asteroids;
let lasers;
let particles;
let font;
let score;
let wave;
let lost;
let user;
let lose;

function preload() {
    font=loadFont('../fonts/Roboto-Regular.ttf');
}

window.onload = () => {
  lose=new Audio('../sounds/explosion.mp3');
}

function setup() {
    let canvas=createCanvas(800, 800);
    canvas.parent('game');
    ship=new Ship();
    lasers=[];
    asteroids=[];
    particles=[];
    score=0;
    wave=0;
    lost=false;
    noFill();
    stroke(255);
    strokeWeight(2);
    textSize(50);
    textFont(font);
    textAlign(CENTER, TOP);
    frameRate(60);
}
function draw() {
    if(lost) {
        for(particle of particles) particle.render();
        for(let i=particles.length-1;i>=0;i--)
            if(particles[i].a<0)
                particles.splice(i, 1);
        if(particles.length==0) {
            fill(255);
            text('Press R to restart!', 400, 360);
            noLoop();
            newScore(score);
        }
        return;
    }
    background(0);
    push();
    fill(255);
    text(score, 400, 10);
    pop();
    ship.render();
    for(asteroid of asteroids) {
        asteroid.render();
        if(ship.pos.dist(asteroid.pos)<asteroid.r) {
      particles=[];
      background(0);
            for(let j=0;j<750;j++)
                particles.push(new Particle(ship.pos.copy(), map(j, 0, 100, 0, TWO_PI), 30, 10, 20, color(0, 0, 0), color(166, 242, 255)));
            lost=true;
      lose.play();
            return;
        }
    }
    for(let i=0;i<lasers.length;i++) {
        lasers[i].render();
        let hit=false;
        for(let j=asteroids.length-1;j>=0;j--)
            if(lasers[i].pos.dist(asteroids[j].pos)<asteroids[j].r) {
                if(asteroids[j].r>=30) {
                    asteroids.push(new Asteroid(asteroids[j].pos.copy(), asteroids[j].r/2));
                    asteroids.push(new Asteroid(asteroids[j].pos.copy(), asteroids[j].r/2));
                    score+=100;
                } else score+=50;
                asteroids.splice(j, 1);
                hit=true;
                break;
            }
        if(hit||lasers[i].pos.x<0||lasers[i].pos.x>width||lasers[i].pos.y<0||lasers[i].pos.y>height) {
            lasers.splice(i, 1);
            i--;
        }
    }
    for(particle of particles) particle.render();
    for(let i=particles.length-1;i>=0;i--)
        if(particles[i].a<0)
            particles.splice(i, 1);
    if(ship.force>11)
        particles.push(new Particle(ship.pos.copy(), ship.rot, 1, 10, 3, color(255, 0, 0), color(255, 255, 0)));
    if(asteroids.length==0) {
        for(let i=0;i<=wave;i++) asteroids.push(new Asteroid());
        wave++;
    }
}
function keyReleased() {
    switch(keyCode) {
        case 65:   
        case 37:
        case 68:
        case 39:
            ship.rotChange=0;
            break;
        case 87:
        case 38:
        case 83:
        case 40:
            ship.thrust=0;
    }
}
function keyPressed() {
    switch(keyCode) {
        case 65:
        case 37:
            ship.rotChange=-0.1;
            break;
        case 68:
        case 39:
            ship.rotChange=0.1;
            break;
        case 87:
        case 38:
            ship.thrust+=0.5;
            break;
        case 83:
        case 40:     
            ship.thrust-=0.2;
            break;
        case 88:
        case 32:
            lasers.push(new Laser(ship.pos.copy(), ship.dir.copy()));
            break;
        case 82:
            setup();
            loop();
    }
}
function mousePressed() {
    lasers.push(new Laser(ship.pos.copy(), ship.dir.copy()));
}

}