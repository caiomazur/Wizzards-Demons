/** @type {HTMLCanvasElement} */   // Enable canvas auto complete

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

// Get the start button:
const startButton = document.getElementById('start');
// Get the fire button:


// Creating the player
const player = new Player(10, 300, 44, 64, 'right', ctx);
// Creating the background:
const background = new Background(ctx);
const game = new Game(ctx, canvas.width, canvas.height, player, background);

startButton.onclick = () => {
    game.start();
};

let eventInput = document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case "ArrowUp":
            player.y -= 50;
            player.direction = 'up';
            break;
        case "ArrowDown":
            player.y += 50;
            player.direction = 'down';
            break;
        case "ArrowLeft":
            player.x -= 50;
            player.direction = 'left';
            break;
        case "ArrowRight":
            player.x += 50;
            player.direction = 'right';
            break;
        /* case "KeyS":
            player.isFire = true; */
        case "KeyX":
            player.isFire = true;
/*             console.log(player.isFire) */
              /* let isFireTimeId =  */
            /* let intervalId = setInterval(() => {
                player.isFire = false
            }, 100); 
            clearInterval(intervalId) */
             /* clearTimeOut(isFireTimeId); */
/*              console.log(isFireTimeId); 
 */    }
});

/* let fireEvent = document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case "KeyX":
            player.isFire = true;
    }
}); */

document.addEventListener('keyup', (e) => {
    switch(e.code) {
    case "KeyX":
        player.isFire = false;
/*         console.log(player.isFire) */
    case "KeyS":
        player.isFire = false;
    }
}); 

/*  document.addEventListener('keyup', (e) => {
    switch(e.code) {
    case "KeyS":
        player.isFire = false;
    } */
    /* player.speedX = 0;
    player.speedY = 0; */
/* });  */
  // What is your game idea ?
/* 
- Medieval theme based on the classic game R-Type (Arcade 1987). 
*/

// What is the game logic?
/* 
- Create player that can move in the x and y axis. 
- Enemies appears from the right side of the screen. 
- The player shoots projectiles from the center of thr player to the right side.
- Collision player, enemies and projectiles. 
- You win the game by defeating the boss at the end of the level.
*/

// How does the game end?
/* 
When an enemy hits the player.
You can win the game by defeating the boss at the end of the level.
*/

// What is your MVP - Minimum Viable Product?
/* 
 - The player, enemies and projectiles will all be square shapes done in javascript using canvas elements.
 - Collision has to be implemented
 - The game stops when the enemy hits the player
 - The player can shoot projectiles and move using a keyboard key press.
*/

// What do you expect your biggest difficulties will be?
/* 
The shoot mechanic.
*/

// Bonus

/* 
- More than one life
- Power-ups
- Hard mode
- Music
- SFX
- Apply medieval pixel art graphics
- Particle explosion on hit.


What we've done so far:
- Player Class
- Enemy Class
- Collision Player
- Player Movement
- Score based on time

To do:
- Score based on enemy defeated
- Fix player collision box size.
- Menus (Start game, Game Over, Highscores)
- Boss Collision
- Boss Movement
- Health
*/