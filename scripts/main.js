/** @type {HTMLCanvasElement} */   // Enable canvas auto complete

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

// Grab the button
const startButton = document.getElementById('start');


// Creating the player
const player = new Component(10, canvas.height - 256, 256, 256, "Image", ctx);

startButton.onclick = () => {
    const game = new Game(ctx, canvas.width, canvas.height, player);
    game.start();
};

document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case "ArrowUp":
            player.y -= 50;
            break;
        case "ArrowDown":
            player.y += 50;
            break;
        case "ArrowLeft":
            player.x -= 50;
            break;
        case "ArrowRight":
            player.x += 50;
            break;
    }
});

/* document.addEventListener('keyup', (e) => {
    player.speedX = 0;
    player.speedY = 0;
}); */
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
*/