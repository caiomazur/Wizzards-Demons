/** @type {HTMLCanvasElement} */   // Enable canvas auto complete

class Game {
    constructor(ctx, width, height, player, background) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.player = player;
        this.background = background;
        this.interval = null;
        this.frames = 0;
        this.enemies = [];
        this.projectiles = [];

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
        this.background.move();
        this.background.draw();
        this.player.newPos();
        this.player.draw();
        this.updateEnemies();
        this.updateProjectiles();
        this.checkGameOver();
        this.score();
        this.checkDeadEnemies();
        
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
        
            this.enemies[i].x -= this.player.x * this.enemies[i].speedX; // move enemy towards the player times speed.
            this.enemies[i].y -= this.player.y * this.enemies[i].speedY;
            this.enemies[i].draw();
        }
        // the if statement is to create the enemies
        // which we only want to do every 120 frames (2 seconds)
        if (this.frames % 60 === 0) {
            // 150 is the maximum square size
            // 20 is the minimum size
        let randomSize = Math.floor(Math.random() * 150 - 20) + 20;
        let randomY = Math.floor(Math.random() * this.height - randomSize) + randomSize;

        this.enemies.push(new Enemy(this.width, randomY, randomSize, randomSize, "green", this.ctx)
            );
        }
    };
    updateProjectiles() {
        for (let i = 0; i < this.projectiles.length; i++) {
             this.projectiles[i].x += 4;
            this.projectiles[i].draw();
        
    /*           if(this.player.direction === 'up') {
                this.projectiles[i].y -= 4;
                this.projectiles[i].draw();
              }
            else if (this.projectiles[i].direction === 'down') {
                this.projectiles[i].y += 4;
                this.projectiles[i].draw();
        }
            else if (this.projectiles[i].direction === 'left') {
                this.projectiles[i].x -= 4;
                this.projectiles[i].draw();
        }
            else if (this.projectiles[i].direction === 'right') {
                this.projectiles[i].x += 4;
                this.projectiles[i].draw();
    }  */ 
    }
         if (this.player.isFire === true) {
        this.projectiles.push(new Projectile("red", 'right', this.ctx)
            );
        } 
    };
    score() {
        const points = Math.floor(this.frames / 30);
        this.ctx.font = '18px serif';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`Score: ${points}`, 1000, 50);
      }

    checkGameOver() {
        const playerCrash = this.enemies.some((enemy) => {
            return this.player.crashWith(enemy);
        });

        if (playerCrash) {
            this.stop();
            alert("Game Over");
        }
    }
    checkDeadEnemies() {
        let enemyCrash = this.enemies.some((enemy) => {
            enemy.isDead = true;
            return this.projectiles.crashWith(enemy);
        });
        if (enemyCrash) {
            for (let i = 0; i < this.enemies.length; i++) {
                if (this.enemies[i].isDead === true) {
                this.enemies[i].clearRect(0, 0, this.enemies[i].width, this.enemies[i].height);
                this.enemies.pop(this.enemies[i]);
                }
            }
        }
    }
}