/** @type {HTMLCanvasElement} */   // Enable canvas auto complete

const canvas = document.getElementById('canvas');

const body = document.getElementById('body');

const ctx = canvas.getContext('2d');

/* body.style.width = innerWidth; */

// Get the start button:
const startButton = document.getElementById('start');
// Creating the player
const player = new Player(10, 300, 44, 64, 'right', ctx);
// Creating the background:
const background = new Background(ctx);
/* const powerUp = new PowerUp(200, 200, 50, 50); */
const game = new Game(ctx, canvas.width, canvas.height, player, background, /* powerUp */);

const mainMx = new Audio("/docs/assets/sounds/yt1s.com - FREE Nu Metal Rock Instrumental Music  No Copyright ArkZion.mp3")

const audioWin = new Audio("/docs/assets/sounds/dino-win.mp3")

// Starting the game
startButton.onclick = () => {
    game.start();
    audioWin.pause();
    mainMx.play();
    mainMx.volume = 0.1;
    audioWin.volume = 0.9;
    startButton.onclick = null;
};

// Controls

let eventInput = document.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'KeyW':
            player.y -= 50;
            player.direction = 'up';
            break;
        case 'KeyS':
            player.y += 50;
            player.direction = 'down';
            break;
        case 'KeyA':
            player.x -= 50;
            player.direction = 'left';
            break;
        case 'KeyD':
            player.x += 50;
            player.direction = 'right';
            break;       
    }
});
let fireEvent = document.addEventListener('keypress', (e) => {
    switch(e.code) {
        case "KeyO":
            game.projectiles.push(new Projectile(game.player.x + 25, game.player.y + 25, 'up', ctx)
        );
        break;
        case "KeyL":
            game.projectiles.push(new Projectile(game.player.x + 25, game.player.y + 25, 'right' /* game.player.direction */, ctx)
        );
        break;
        case "KeyK":
            game.projectiles.push(new Projectile(game.player.x + 25, game.player.y + 25, 'down', ctx)
        );
    }
}); 

document.addEventListener('keyup', (e) => {
    switch(e.code) {
       /*  case "ArrowUp":
            player.direction = 'right';
            break;
        case "ArrowDown":
            player.direction = 'right';
            break;
        case "ArrowLeft":
            player.direction = 'right';
            break; */
    }
}); 

/* Notes:
// What is your game idea ?
- Medieval theme based on the classic game R-Type (Arcade 1987). 


// What is the game logic?
 
- Create player that can move in the x and y axis. 
- Enemies appears from the right side of the screen. 
- The player shoots projectiles from the center of thr player to the right side.
- Collision player, enemies and projectiles. 
- You win the game by defeating the boss at the end of the level.


// How does the game end?

When an enemy hits the player.
You can win the game by defeating the boss at the end of the level.


// What is your MVP - Minimum Viable Product?
 
 - The player, enemies and projectiles will all be square shapes done in javascript using canvas elements.
 - Collision has to be implemented
 - The game stops when the enemy hits the player
 - The player can shoot projectiles and move using a keyboard key press.


// What do you expect your biggest difficulties will be?
 
The shoot mechanic.


// Bonus
 
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
- Boss Class
- Collision Player
- Player Movement
- Score based on time
- Parallax Background
- Shoot Mechanic (Needs improvement)

To do:
- Score based on enemy defeated
- Fix player collision box size.
- Menus (Start game, Game Over, high scores)
- Boss Collision
- Boss Movement
- Boss crashWith Player
- Health
- Improve shoot mechanic
*/