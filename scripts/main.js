/** @type {HTMLCanvasElement} */ // Enable canvas auto complete

const canvas = document.getElementById("canvas");

const body = document.getElementById("body");

const ctx = canvas.getContext("2d");

/* body.style.width = innerWidth; */

// Get the start button:
const startButton = document.getElementById("start");
const normalMode = document.getElementById("normalMode"); // --------------------------
const arcadeMode = document.getElementById("arcadeMode");
const resetButton = document.getElementById("reset");

// Creating the player
const player = new Player(10, 300, 44, 64, "right", ctx);
// Creating the background:
const background = new Background(ctx);
/* const powerUp = new PowerUp(200, 200, 50, 50); */
const game = new Game(
  ctx,
  canvas.width,
  canvas.height,
  player,
  background /* powerUp */
);

const mainMx = new Audio(
  "./docs/assets/sounds/yt1s.com - FREE Nu Metal Rock Instrumental Music  No Copyright ArkZion.mp3"
);

const audioWin = new Audio("./docs/assets/sounds/dino-win.mp3");

// Starting the game
startButton.onclick = () => {
  /*  document.body.style.backgroundImage = "url('../docs/assets/images/background-finalgif.gif')";
    game.start();
    audioWin.pause();
    mainMx.play();
    mainMx.volume = 0.1;
    audioWin.volume = 0.8;
    startButton.onclick = null; */

  startButton.style.display = "none";
  startButton.onclick = null;
  arcadeMode.style.display = "block";
  normalMode.style.display = "block";
};

normalMode.onclick = () => {
  document.body.style.backgroundImage =
    "url('./docs/assets/images/background-finalgif.gif')";
  game.start();
  audioWin.pause();
  mainMx.play();
  mainMx.volume = 0.2;
  audioWin.volume = 0.8;
  normalMode.onclick = null;
  arcadeMode.style.display = "none";

  game.normalModeState = true;
  game.arcadeModeState = false;
  resetButton.style.display = "block";
};

arcadeMode.onclick = () => {
  document.body.style.backgroundImage =
    "url('./docs/assets/images/background-finalgif.gif')";
  game.start();
  audioWin.pause();
  mainMx.play();
  mainMx.volume = 0.2;
  audioWin.volume = 0.8;
  startButton.onclick = null;
  arcadeMode.onclick = null;
  normalMode.style.display = "none";

  game.arcadeModeState = true;
  game.normalModeState = false;
  resetButton.style.display = "block";
};

resetButton.onclick = () => {
  window.location.reload();
};

// Controls

let eventInput = document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyW":
      player.y -= 50;
      player.direction = "up";
      break;
    case "KeyS":
      player.y += 50;
      player.direction = "down";
      break;
    case "KeyA":
      player.x -= 50;
      player.direction = "left";
      break;
    case "KeyD":
      player.x += 50;
      player.direction = "right";
      break;
  }
});
let fireEvent = document.addEventListener("keypress", (e) => {
  switch (e.code) {
    case "KeyI":
      game.projectiles.push(
        new Projectile(game.player.x + 25, game.player.y + 25, "up", ctx)
      );
      break;
    case "KeyL":
      game.projectiles.push(
        new Projectile(game.player.x + 25, game.player.y + 25, "right", ctx)
      );
      break;
    case "KeyK":
      game.projectiles.push(
        new Projectile(game.player.x + 25, game.player.y + 25, "down", ctx)
      );
      break;
    case "KeyJ":
      game.projectiles.push(
        new Projectile(game.player.x + 25, game.player.y + 25, "left", ctx)
      );
  }
});

document.addEventListener("keyup", (e) => {
  switch (
    e.code
    /*  case "ArrowUp":
            player.direction = 'right';
            break;
        case "ArrowDown":
            player.direction = 'right';
            break;
        case "ArrowLeft":
            player.direction = 'right';
            break; */
  ) {
  }
});
