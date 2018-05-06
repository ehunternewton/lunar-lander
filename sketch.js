var rock;

function rock(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0,0);
    this.acc = createVector(0,0);
    this.rotationAngle = 0; 
    this.drawThrust = false;
 
    this.show = function() {
        push();
        translate(this.position.x, this.position.y);
        rotate(map(this.rotationAngle, 0,360, 0, TWO_PI));
        fill(100,0,100);
        stroke(color(0, 100, 200));
        strokeWeight(4);
        ellipse(0, 0, 32, 32);
        line(0-16, 0, 
             0, 0 + 6);
        line(0, 0 + 6, 
             0+16, 0);
        line(0 + 13, 0 + 13, 
             0 + 23, 0 + 23);
        line(0 - 13, 0 + 13, 
             0 - 23, 0 + 23);
        line(0, 0 + 6, 
             0+16, 0);
        line(0 + 13, 0 + 13, 
             0 + 23, 0 + 23);
        line(0 - 13, 0 + 13, 
             0 - 23, 0 + 23);
        if(this.drawThrust) {
            stroke(color(255, 50, 00));
            line (3, 19, 0, 26);
            line (-3, 19, 0, 26);
            line(0, 20, 0, 26);
        }
        pop();
    }
    

    this.update = function() {
        this.velocity.add(this.acc);
        this.position.add(this.velocity);
        this.acc.mult(0);

        this.position.x = constrain(this.position.x, -16, width + 16);
        this.position.y = constrain(this.position.y, 0, height);
    }
    
    
    this.fly = function() {
        var power = .25;
        var rotationPower = 3;
        
        if(keyIsDown(UP_ARROW)) {
            this.drawThrust = true;
            this.acc.y -= power*cos(map(this.rotationAngle, 0,360, 0, TWO_PI));
            this.acc.x += power*sin(map(this.rotationAngle, 0,360, 0, TWO_PI));
        }
        if(!keyIsDown(UP_ARROW)) {
            this.drawThrust = false;
        }
        if(keyIsDown(DOWN_ARROW)) {
            //this.ySpeed += power;
        }
        if(keyIsDown(RIGHT_ARROW)) {
            this.rotationAngle += rotationPower;
            //this.xSpeed += power;
        }
        if(keyIsDown(LEFT_ARROW)) {
            this.rotationAngle -= rotationPower;
            //this.xSpeed -= power;
        }
    }

    this.gravity = function() {
        this.acc.y += .1;
    }
    
    this.bounceY = function() {
        this.velocity.y = -this.velocity.y*.75;
        this.position.y = 325 - 26;
    }
    this.bounceX = function() {
        this.velocity.x = -this.velocity.x*.75;
        this.rotationAngle *= -.75;
    }
}

function setup() {
    createCanvas(800,400);
    rock = new rock(250,250);
}

function draw() {
    frameRate(25);
    background(51);
    rock.show();
    rock.gravity();
    rock.fly();
    rock.update();
    stroke(color(0, 100, 200));
    strokeWeight(4);
    line (0,325, width, 325);
    if(rock.position.y + 26 > 325) 
        rock.bounceY();
    if(rock.position.x < 0)
       rock.position.x = width;
    if(rock.position.x > width)
        rock.position.x = 0;
    /*
    
    if(rock.position.y + 26 > 325) 
        rock.bounceY();
    if(rock.position.x < 32 || rock.position.x > width - 32)
       rock.bounceX();
       */
}























