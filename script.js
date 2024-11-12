//Player object has x and y coordinates in px
let lastTime = 0;
let player = {x: 0, y: 100, speed: 100, w: 32, h: 0};
let enemy = {x: 150, y: 50, speed: 50, w: 32, h: 80};
let rotation = 0;
let hasCollided = false;
const boardDimensions = 248;

const controls = {
    left: false,
    right: false,
    up: false,
    down: false
}

document.addEventListener("keydown", keyPressed)
document.addEventListener("keyup", keyLifted)

function displayPlayer() {
    const visualPlayer = document.getElementById("player");
    //console.log("Display player runs")
    visualPlayer.style.translate = `${player.x}px ${player.y}px`;
    
    if(collision()) {
        rotation += 2;
        visualPlayer.style.transform = `rotate(${rotation}deg)`;
        
    }
}

function displayEnemy() {
    const visualPlayer = document.getElementById("enemy");
    //console.log("Display player runs")
    visualPlayer.style.translate = `${enemy.x}px ${enemy.y}px`;
}

function tick(time) {
    const deltaTime = (time - lastTime)/1000;
    lastTime = time;
    requestAnimationFrame(tick);

    if(collision()) document.getElementById("lives").innerHTML = "Don't touch me!"
    else document.getElementById("lives").innerHTML = "Personal space:)";

    movePlayer(deltaTime);
    moveEnemy();

    collision();

    displayPlayer();
    displayEnemy();
}

function movePlayer(DT) {
    const newPos = {x: player.x, y: player.y};
    
    if(controls.up) {
        newPos.y -= player.speed * DT;
    } else if(controls.down) {
        newPos.y += player.speed * DT;
    } else if(controls.right) {
        newPos.x += player.speed * DT;
    } else if(controls.left) {
        newPos.x -= player.speed * DT;
    }

    if(canMove(player, newPos)) {
        player.x = newPos.x;
        player.y = newPos.y;
    }

    /* if (controls.left) { //The old if statements to control player x and y
        player.x -= player.speed * DT;
    } else if (controls.right) {
        player.x += player.speed * DT;
    } else if (controls.down) {
        player.y += player.speed * DT;
    } else if (controls.up) {
        player.y -= player.speed * DT;
    } */
}

let moveRight = true; //Used in moveEnemy
function moveEnemy() {
    if(moveRight) {
        enemy.x += 1;
    } else {
        enemy.x -= 1;
    }
    //console.log(enemy.x)
    if (enemy.x + enemy.w > boardDimensions) {
        moveRight = false;
    } else if (enemy.x < 0) {
        moveRight = true;
    }
    
}

function canMove(player, position) {
    if (position.x < 0 || position.y < 0) {
        return false;                                  //So here the player model is 40?? I think I'm missing something essential about the models height and width
    } else if (position.x + player.w > boardDimensions || position.y + 40 > boardDimensions){
        return false;
    } else {
        return true;
    }
}

function keyPressed(event) {
    if(event.key === "w" || event.key === "ArrowUp") {
        controls.up = true;
    } else if(event.key === "s" || event.key === "ArrowDown") {
        controls.down = true;
    } else if(event.key === "d" || event.key === "ArrowRight") {
        controls.right = true;
    } else if(event.key === "a" || event.key === "ArrowLeft") {
        controls.left = true;
    } 
}

function keyLifted(event) {
    if(event.key === "w" || event.key === "ArrowUp") {
        controls.up = false;
    } else if(event.key === "s" || event.key === "ArrowDown") {
        controls.down = false;
    } else if(event.key === "d" || event.key === "ArrowRight") {
        controls.right = false;
    } else if(event.key === "a" || event.key === "ArrowLeft") {
        controls.left = false;
    } 
}

tick();

function collision() {  //WHY IS ENEMY HEIGH 80????? The collision only visually works correctly if I add 40 to enemy height
    // I don't understand why player height is 0 and enemy height is 80
    if (player.x < enemy.x + enemy.w &&
        player.x + player.w > enemy.x &&
        player.y < enemy.y + enemy.h &&
        player.y + player.h > enemy.y
    ) {
        hasCollided = true;
        return true;
    } else {
        return false;
    }
}

