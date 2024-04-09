let freddyTile;
let aftonTile;
let score = 0;
let gameOver = false;
let seconds = 0;
let time = document.getElementById("time");

window.onload = function () {
    setGame();
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(createFreddy, 1000); // creates a Freddy every second
    setInterval(createAfton, 2000); // creates Afton every 2 seconds 
}

function getRandomTile() {
    //math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function createFreddy() {
    if (gameOver) {
        return;
    }
    if (freddyTile) {
        freddyTile.innerHTML = "";
    }
    let freddy = document.createElement("img");
    freddy.src = "./assets/bad-guy.png";

    let num = getRandomTile();
    if (aftonTile && aftonTile.id == num) {
        return;
    }
    freddyTile = document.getElementById(num);
    freddyTile.appendChild(freddy);
}

function createAfton() {
    if (gameOver) {
        return;
    }
    if (aftonTile) {
        aftonTile.innerHTML = "";
    }
    let afton = document.createElement("img");
    afton.src = "./assets/purp-guy.png";

    let num = getRandomTile();
    if (freddyTile && freddyTile.id == num) {
        return;
    }
    aftonTile = document.getElementById(num);
    aftonTile.appendChild(afton);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == freddyTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString(); //updates the score and changes the html element
    }
    else if (this == aftonTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString(); //triggers game over state and shuts off game 
        gameOver = true;
        let jump = document.createElement("video");
        jump.src = "./assets/jump.mp4";
        jump.autoplay = true;
        document.getElementById("board").appendChild(jump);
        const reloadButton = document.createElement("button");
        reloadButton.textContent = "Play again";

        reloadButton.addEventListener("click", function () {
            location.reload(); // Reload the page
        });

        document.body.appendChild(reloadButton);
    }
}

function getTime() {
    seconds++;
    time.innerText = seconds;
}
setInterval(getTime, 1000);
