
var bcenterX;
var bcenterY;
var bdiam;
var fuseEndX;
var fuseEndY;
var gameState;
var newState;
var secretKey;
var countDown;
var hotKey;
function setup() {
    createCanvas(512, 512);
    textSize(32);
    strokeWeight(5);

    //initialise variables
    bdiam = 250;
    bcenterX = width / 2;
    bcenterY = height / 2;
    fuseEndX = bcenterX + 20;
    fuseEndY = bcenterY - bdiam / 2 - 30;
    gameState = 0;
    secretKey = 'F';
    hotKey = 'G'
}


function draw() {
    ////////////// UPDATE CODE///////////////

    //reset variables after random amounts were added
    bcenterX = width / 2;
    bcenterY = height / 2;

    //wobble the bomb
    if (gameState == 1) {
        bcenterX += random(-10, 10);
        bcenterY += random(-10, 10);
        countDown = countDown - 1;

        if (countDown == 0) {
            gameState = 2;
        }
    }


    fuseEndX = bcenterX + 20;
    fuseEndY = bcenterY - bdiam / 2 - 30;

    ////////////// DRAWING CODE///////////////

    background(100);

    //draw the fuse
    noFill();
    stroke(200, 100, 0);

    line(
        bcenterX,
        bcenterY - bdiam / 2,
        fuseEndX,
        fuseEndY
    );

    //draw the bomb
    noStroke();
    fill(0);
    ellipse(bcenterX, bcenterY, bdiam, bdiam);
    fill(255);
    quad(
        bcenterX + 40, bcenterY - 60,
        bcenterX + 80, bcenterY - 60,
        bcenterX + 70, bcenterY - 30,
        bcenterX + 50, bcenterY - 30
    );

    //draw the flame 
    if (gameState == 1) {
        fill(255, 255, 0);
        noStroke();
        beginShape();
        vertex(fuseEndX, fuseEndY);
        vertex(fuseEndX + 20, fuseEndY - 20);
        vertex(fuseEndX + 20, fuseEndY - 50);
        vertex(fuseEndX - 10, fuseEndY - 30);
        endShape(CLOSE);
    }


    fill(255);

    //Draw game text
    if (gameState == 0) {
        text("Press any key to start", 20, 50);
    }
    if (gameState == 2) {
        text("Game over", 20, height / 2);
    }

    text("You won !", width / 2, height / 2);
    if (gameState == 1) {
        text("Press a key to diffuse the bomb", 20, height - 50);
        text("CountDown: " + countDown, 20, 20)
    }
}

function keyPressed() {
    console.log(key)
    if (gameState == 0) {
        newState = 1;
        countDown = 300;
    }
    if (gameState == 1) {
        if (key == secretKey) {
            newState = 3;
        }
        else if (key == hotKey) {
            countDown += 20;
        }
        else if (random() > 0.5) {
//
        }
        else {
            newState = 2;
        }

    }
    if (gameState == 2) {
        newState = 0;
    }
    if (gameState == 3) {
        newState = 0
    }
    gameState = newState
}






