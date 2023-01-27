/** @type {HTMLCanvasElement} */   // Enable canvas auto complete

class Game {
    constructor(ctx, width, height, player) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.player = player;
        this.interval = null;
        this.frames = 0;
        this.enemies = [];
        this.projectiles = [];
       /*  this.background = new Image(); */

    }
    start() {
        this.intervalId = setInterval(this.update, 1000 / 60) 
    }
    // Update needs to be an arrow function because "this" needs to refer to 
    // the class and not the update method
    update = () => {
        // Game logic here
        this.frames++;
        this.clear();
        this.player.newPos();
        this.player.draw();
        this.updateEnemies();
        this.checkGameOver();
    }
    stop() {
        clearInterval(this.intervalId);
    }
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    // When the enemies appear
    updateEnemies() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].x -= 1;
            this.enemies[i].draw();
        }
        // the if statement is to create the enemies
        // which we only want to do every 120 frames (2 seconds)
        if (this.frames % 60 === 0) {
            // 150 is the maximum square size
            // 10 is the minimum size
        let randomSize = Math.floor(Math.random() * 150 - 20) + 20;
        let randomY = Math.floor(Math.random() * this.height - randomSize) + randomSize;

        this.enemies.push(new Enemy(this.width, randomY, randomSize, randomSize, "green", this.ctx)
            );
        }
    }
   /*  updateProjectiles() {
        for (let i = 0; i < this.projectiles.length; i++) {
            if(this.projectiles[i].direction === "up") {
                this.projectiles[i].y -= 1;
                this.projectiles[i].draw();
              }
            else if (this.projectiles[i].direction === "down") {
                this.projectiles[i].y += 1;
                this.projectiles[i].draw();
        }
            else if (this.projectiles[i].direction === "left") {
                this.projectiles[i].x -= 1;
                this.projectiles[i].draw();
        }
            else if (this.projectiles[i].direction === "right") {
                this.projectiles[i].x += 1;
                this.projectiles[i].draw();
    }
    }
        //the if statement is to create the enemies
        // which we only want to do every 120 frames (2 seconds)
        if (this.frames % 60 === 0) {
            // 150 is the maximum square size
            // 10 is the minimum size
        let randomSize = Math.floor(Math.random() * 150 - 20) + 20;
        let randomY = Math.floor(Math.random() * this.height - randomSize) + randomSize;

        this.enemies.push(new Enemy(this.width, randomY, randomSize, randomSize, "green", this.ctx)
            );
        }
    } */

    checkGameOver() {
        const crashed = this.enemies.some((enemy) => {
            return this.player.crashWith(enemy);
        });

        if (crashed) {
            this.stop();
            alert("Game Over");
        }
    }
}